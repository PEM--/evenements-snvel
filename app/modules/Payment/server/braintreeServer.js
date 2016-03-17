// Global Braintree gateway
const { Utils, Col } = MainApp;
Utils.braintreeGateway = null;

const ERROR_TYPE = 'payment';

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
  clientToken(cb) {
    // Check of client is connected
    if (!this.userId) {
      throw new Meteor.Error(ERROR_TYPE, '403: Non authorized');
    }
    // Check transimtted data consistency
    check(cb, Match.Any);
    console.log('Creating customer on Braintree');
    // Check profile consistency
    const user = Meteor.users.findOne(this.userId);
    if (!user) {
      console.warn('Fraud attempt: not enough user information', user);
      throw new Meteor.Error(ERROR_TYPE, 'Client inconnu pour le paiement', this.userId);
    }
    const email = user.emails[0].address;
    if (!Roles.userIsInRole(this.userId, 'payment_pending')) {
      console.warn('Fraud attempt: wrong role for user', user, 'whit roles', Roles.getRolesForUser(this.userId));
      throw new Meteor.Error(ERROR_TYPE, 'Client inconnu pour le paiement', this.userId);
    }
    // Check if customer already owns a Braintree customer ID
    let braintreeCustomerId;
    if (!user.profile.braintreeCustomerId) {
      // Create a Braintree customer ID
      const result = Utils.braintreeGateway.customer.create({
        firstName: user.profile.firstName,
        lastName: user.profile.name,
        email
      });
      if (!result || !result.success || !result.customer || !result.customer.id) {
        console.warn('Braintree Error for', email, result);
        throw new Meteor.Error(ERROR_TYPE, 'Paiement impossible pour le moment pour', email);
      }
      console.log('Customer ID create for customer', email, result.customer.id);
      braintreeCustomerId = result.customer.id;
      Meteor.users.update({_id: this.userId}, {
        $set: {
          'profile.braintreeCustomerId': result.customer.id,
          modifiedAt: new Date()
        }
      });
    } else {
      braintreeCustomerId = user.profile.braintreeCustomerId;
    }
    // Create token for customer
    const result = Utils.braintreeGateway.clientToken.generate({
      customerId: braintreeCustomerId
    });
    if (!result || !result.clientToken) {
      console.warn('Braintree Error for', email, result);
      throw new Meteor.Error(ERROR_TYPE, 'Paiement impossible pour le moment pour', email);
    }
    console.log('Payment token createad for', email);
    return {
      braintreeCustomerId,
      token: result.clientToken
    };
  },
  // Braintree card payment using nonce
  cardPayment(nonce, invoice, cb) {
    console.log(invoice);
    // Check of client is connected
    if (!this.userId) {
      throw new Meteor.Error('payment', '403: Non authorized');
    }
    // Check transimtted data consistency
    check(nonce, String);
    check(invoice, Structure.InvoiceSchema);
    check(cb, Match.Any);
    const user = Meteor.users.findOne(this.userId);
    const email = user.emails[0].address;
    if (!Roles.userIsInRole(this.userId, 'payment_pending')) {
      console.warn('Fraud attempt: wrong role for user', user, 'whit roles', Roles.getRolesForUser(this.userId));
      throw new Meteor.Error(ERROR_TYPE, 'Client inconnu pour le paiement', this.userId);
    }
    if (!user.profile.braintreeCustomerId) {
      console.warn('Fraud alert: missing braintreeCustomerId', email);
      throw new Meteor.Error(ERROR_TYPE, 'Paiement impossible pour le moment pour', email);
    }
    Meteor.users.update({_id: this.userId}, {
      $set: {
        invoice,
        modifiedAt: new Date()
      }
    });
    // Get amount in UK/EN/US format and switch back current language
    numeral.language('en');
    amount = numeral(invoice.totalTTC).format('00.00');
    numeral.language(getUserLanguage());
    result = Utils.braintreeGateway.transaction.sale({
      amount: amount,
      paymentMethodNonce: nonce,
      options: {submitForSettlement: true}
    });
    if (!result || !result.success) {
      console.warn('Braintree Error for', email, result);
      throw new Meteor.Error(ERROR_TYPE, 'Paiement impossible pour le moment pour', email);
    }
    console.log('Payment for user', email, 'with amount', invoice.totalTTC);
    // Set proper roles for user
    Roles.addUsersToRoles(this.userId, 'subscribed');
    Roles.removeUsersFromRoles(this.userId, 'payment_pending');
    // Send the billing email
    this.unblock();
    // PEM const cgv = SD.Structure.basicPages.collection.findOne({url: 'cgv'});
    // PEM const html = s.replaceAll(marked(cgv.content), '\n', '');
    // PEM const invoiceTxt = SD.Utils.renderInvoice(invoice.prices, invoice.discounts, invoice.totalHT, invoice.totalTTC);
    // PEM sendBillingEmail(email, invoiceTxt, cgv.title, html);
    return true;
  }
});
