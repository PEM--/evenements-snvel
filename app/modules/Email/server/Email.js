const { sender, apiKey, secretKey } = Meteor.settings.private.mailjet;

Meteor.startup(() => {
  process.env.MAIL_URL = `smtp://${apiKey}:${secretKey}@in-v3.mailjet.com:587/`;
  console.log('SMTP declared');
});

// Flatten namespace
// const { settings } = Meteor;
// const { transactionalEmails } = settings;
// const { emailConfirmation, emailBilling } = transactionalEmails;

// const globalReplacement = (str) => {
//   const result = s(str)
//     .replaceAll('HTML_TEMPLATE_COMPANY', transactionalEmails.signature)
//     .replaceAll('HTML_TEMPLATE_TWITTER_URL', transactionalEmails.twitterUrl)
//     .replaceAll('HTML_TEMPLATE_TWITTER_ACCOUNT', transactionalEmails.twitterAccount)
//     .replaceAll('HTML_TEMPLATE_FACEBOOK_URL', transactionalEmails.facebookUrl)
//     .replaceAll('HTML_TEMPLATE_FACEBOOK_ACCOUNT', transactionalEmails.facebookAccount)
//   .value();
//   return result;
// };
//
let actionHtml = Assets.getText('emails/action.html');
// actionHtml = s(globalReplacement(actionHtml))
//   // Content
//   .replaceAll('HTML_TEMPLATE_ACTION_TITLE', emailConfirmation.title)
//   .replaceAll('HTML_TEMPLATE_ACTION_MESSAGE', emailConfirmation.message)
//   .replaceAll('HTML_TEMPLATE_ACTION_SUB_MESSAGE', emailConfirmation.subMessage)
//   .replaceAll('HTML_TEMPLATE_ACTION_BUTTON', emailConfirmation.callToAction)
//   .value();
//
let billingHtml = Assets.getText('emails/billing.html');
//   billingHtml = s(globalReplacement(themeReplacement(billingHtml)))
//   // Content
//     .replaceAll('HTML_TEMPLATE_BILLING_TITLE', emailBilling.title)
//     .replaceAll('HTML_TEMPLATE_BILLING_GREETINGS', emailBilling.greetings)
//     .replaceAll('HTML_TEMPLATE_BILLING_INTRODUCTION', emailBilling.introduction)
//     .replaceAll('HTML_TEMPLATE_BILLING_INVOICE_PREAMBLE', emailBilling.invoicePreamble)
//     .replaceAll('HTML_TEMPLATE_BILLING_SUB_GREETINGS', emailBilling.subGreetings)
//   .value();

// Configure accounts
Accounts.emailTemplates.from = sender;
Accounts.emailTemplates.verifyEmail.subject = () => emailConfirmation.title;
Accounts.emailTemplates.verifyEmail.html = (user, url) => {
  return s.replaceAll(
    actionHtml,
    'HTML_TEMPLATE_ACTION_VALIDATE_URL',
    url.replace('/#', ''));
};

sendConfirmationEmail = (to, idx) => {
  Email.send({
    from: transactionalEmails.account,
    to,
    subject: emailConfirmation.title,
    html: s.replaceAll(actionHtml, 'HTML_TEMPLATE_ACTION_VALIDATE_URL', `${settings.public.proxy.url}confirm/${idx}`)
  });
};

sendBillingEmail = (to, invoice, salesAgreementTitle, salesAgreementContent) => {
  Email.send({
    from: transactionalEmails.account,
    to,
    subject: emailBilling.title,
    html: s(billingHtml)
      .replaceAll('HTML_TEMPLATE_BILLING_INVOICE_CONTENT', invoice)
      .replaceAll('HTML_TEMPLATE_TERMS_OF_SALES_TITLE', salesAgreementTitle)
      .replaceAll(
        '<HTML_TEMPLATE_TERMS_OF_SALES_CONTENT></HTML_TEMPLATE_TERMS_OF_SALES_CONTENT>'.toLowerCase(),
        salesAgreementContent)
      .value()
  });
};
