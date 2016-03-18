// Global Braintree gateway
const { Utils, Col } = MainApp;
Utils.braintreeGateway = null;

const ERROR_TYPE = 'payment';

Utils.setPaymentForUser = function(userId, programRef, status) {
  let user = Meteor.users.findOne(userId);
  if (!user) { throw new Meteor.Error(ERROR_TYPE, '403: unauthorized'); }
  let found = user.profile.programs.find(p => p.reference === programRef);
  if (!found) {
    console.warn('No program', programRef, 'found for', user.email());
    throw new Meteor.Error(ERROR_TYPE, '403: unauthorized');
  }
  found.status = status;
  delete user._id;
  Meteor.users.update({_id: this.userId}, user, {bypassCollection2: true});
  console.log('User', user.email(), 'in payment state', found.status, 'for', programRef);
};

// Create Gateway
Meteor.startup(() => {
  const settings = Meteor.settings.private.braintree;
  console.log('Connecting server to Braintree in', settings.accountType, 'mode');
  try {
    const envType = Braintree.Environment[settings.accountType];
    Utils.braintreeGateway = BrainTreeConnect({
      environment: envType,
      merchantId: settings.merchantId,
      publicKey: settings.publicKey,
      privateKey: settings.privateKey
    });
    console.log('Braintree gateway configured.');
  } catch (error) {
    throw new Meteor.Error(ERROR_TYPE, error.message);
  }
  // Create server side only routes
  const bodyParser = Meteor.npmRequire('body-parser');
  Picker.middleware(bodyParser.json());
  Picker.middleware(bodyParser.urlencoded({extended: false}));

  const BRAINTREE_TOKEN_ROUTE = '/client_token';
  Picker.route(BRAINTREE_TOKEN_ROUTE, function(params, req, res, next) {
    // Create a client token
    Utils.braintreeGateway.clientToken.generate({}, (err, response) => {
      if (err) {
        console.warn('Error while creating client token', err);
        res.status(500).end('Internal server error');
        return;
      }
      console.log('Client token generated', JSON.stringify(response));
      // Send the client token
      res.end(response.clientToken);
    });
  });
  console.log(BRAINTREE_TOKEN_ROUTE, 'created');
});

Meteor.methods({
  // Braintree token generation
  clientToken(programRef) {
    // Check of client is connected
    if (!this.userId) {
      throw new Meteor.Error(ERROR_TYPE, '403: Non authorized');
    }
    // Check transimtted data consistency
    check(programRef, String);
    console.log('Creating customer on Braintree');
    // Check profile consistency
    const user = Meteor.users.findOne(this.userId);
    if (!user || !user.profile || !user.profile.programs) {
      console.warn('Fraud attempt: not enough user information', user);
      throw new Meteor.Error(ERROR_TYPE, 'Client inconnu pour le paiement', this.userId);
    }
    const found = user.profile.programs.find(p => p.reference === programRef);
    if (!found) {
      console.warn('Fraud attempt: nothing bought', user.email(), 'with program', programRef);
      throw new Meteor.Error(ERROR_TYPE, 'Client inconnu pour le paiement', user.email());
    }
    // Check if customer already owns a Braintree customer ID
    let braintreeCustomerId;
    if (!user.profile.braintreeCustomerId) {
      // Create a Braintree customer ID
      const result = Utils.braintreeGateway.customer.create({
        firstName: user.profile.firstName,
        lastName: user.profile.name,
        email: user.email()
      });
      if (!result || !result.success || !result.customer || !result.customer.id) {
        console.warn('Braintree Error for', user.email(), result);
        throw new Meteor.Error(ERROR_TYPE, 'Paiement impossible pour le moment pour', user.email());
      }
      console.log('Customer ID create for customer', user.email(), result.customer.id);
      braintreeCustomerId = result.customer.id;
      Meteor.users.update({_id: this.userId}, {
        $set: { 'profile.braintreeCustomerId': result.customer.id }
      });
    } else {
      braintreeCustomerId = user.profile.braintreeCustomerId;
    }
    // Create token for customer
    const result = Utils.braintreeGateway.clientToken.generate({
      customerId: braintreeCustomerId
    });
    if (!result || !result.clientToken) {
      console.warn('Braintree Error for', user.email(), result);
      throw new Meteor.Error(ERROR_TYPE, 'Paiement impossible pour le moment pour', user.email());
    }
    console.log('Payment token createad for', user.email());
    return {
      braintreeCustomerId,
      token: result.clientToken
    };
  },
  // Braintree card payment using nonce
  cardPayment(nonce, programRef) {
    // Check of client is connected
    if (!this.userId) { throw new Meteor.Error('payment', '403: Non authorized'); }
    // Check transimtted data consistency
    check(nonce, String);
    check(programRef, String);
    let user = Meteor.users.findOne(this.userId);
    if (!user) {
      console.warn('Fraud alert: unregistred user', this.userId);
      throw new Meteor.Error(ERROR_TYPE, 'Paiement impossible pour le moment pour', this.userId);
    }
    if (!user.profile.braintreeCustomerId) {
      console.warn('Fraud alert: missing braintreeCustomerId', user.email());
      throw new Meteor.Error(ERROR_TYPE, 'Paiement impossible pour le moment pour', user.email());
    }
    let found = user.profile.programs.find(p => p.reference === programRef);
    if (!found) {
      console.warn('Fraud attempt: nothing bought', user.email(), 'with program', programRef);
      throw new Meteor.Error(ERROR_TYPE, 'Client inconnu pour le paiement', user.email());
    }
    const userType = user.profile.category;
    const boughtDate = moment(found.date, 'DD/MM/YYYY');
    const program = Col.Programs.findOne({reference: programRef});
    let total = Col.Programs.finalPrice(
      program, userType, found.prices, boughtDate, false
    );
    if (found.attendant) {
      total += Col.Programs.finalPrice(
        program, 'Accompagnant', found.attendant.prices, boughtDate, false
      );
    }
    // Get amount in UK/EN/US format and switch back current language
    numeral.language('en');
    amount = numeral(total).format('00.00');
    numeral.language('fr');
    result = Utils.braintreeGateway.transaction.sale({
      amount: amount,
      paymentMethodNonce: nonce,
      options: {submitForSettlement: true}
    });
    if (!result || !result.success) {
      console.warn('Braintree Error for', user.email(), result);
      throw new Meteor.Error(ERROR_TYPE, 'Paiement impossible pour le moment pour', user.email());
    }
    console.log('Payment for user', user.email(), 'with amount', total);
    // Set proper status for user
    Utils.setPaymentForUser(this.userId, programRef, 'Payé');
    // Send the billing email
    this.unblock();
    const cgv = Col.BasicPages.findOne({url: 'cgv'});
    // PEM const html = s.replaceAll(marked(cgv.content), '\n', '');
    // PEM const invoiceTxt = SD.Utils.renderInvoice(invoice.prices, invoice.discounts, invoice.totalHT, invoice.totalTTC);
    // PEM sendBillingEmail(email, invoiceTxt, cgv.title, html);
    return true;
  }
});
