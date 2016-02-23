const { sender, apiKey, secretKey } = Meteor.settings.private.mailjet;

Meteor.startup(() => {
  process.env.MAIL_URL = `smtp://${apiKey}:${secretKey}@in-v3.mailjet.com:587/`;
  console.log('SMTP declared');
});

// // Flatten namespace
// const { settings } = Meteor;
// const { transactionalEmails } = settings;
// const { emailConfirmation, emailBilling } = transactionalEmails;
//
// const themeReplacement = (str) => {
//   const result = s(str)
//     .replaceAll('#abcd01', ColorTheme.invoiceBg)
//     .replaceAll('#abcd02', ColorTheme.invoiceBorder)
//     .replaceAll('#abcd03', ColorTheme.invoiceText)
//     .replaceAll('#abcd04', ColorTheme.textColor)
//     .replaceAll('#abcd05', ColorTheme.primary)
//     .replaceAll('#abcd06', ColorTheme.secondaryColor)
//     .replaceAll('#abcd07', ColorTheme.border)
//     .replaceAll('#abcd08', ColorTheme.primary)
//     .replaceAll('#abcd09', ColorTheme.invertedTextColor)
//     .replaceAll('#abcd10', ColorTheme.invertedTextColor)
//     .replaceAll('#abcd11', ColorTheme.header)
//     .replaceAll('#abcd12', ColorTheme.bg)
//     .replaceAll('#abcd13', ColorTheme.primary)
//     .replaceAll('#abcd14', ColorTheme.bg)
//     .replaceAll('font-family: serif', `font-family:${Fonts.header}`)
//     .replaceAll('font-family: sans-serif', `font-family:${Fonts.body}`)
//     .replaceAll('font-family: monospace', `font-family:${Fonts.invoice}`)
//   .value();
//   return result;
// };
//
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
// actionHtml = Assets.getText('templates/action.html');
// actionHtml = s(globalReplacement(themeReplacement(actionHtml)))
//   // Content
//   .replaceAll('HTML_TEMPLATE_ACTION_TITLE', emailConfirmation.title)
//   .replaceAll('HTML_TEMPLATE_ACTION_MESSAGE', emailConfirmation.message)
//   .replaceAll('HTML_TEMPLATE_ACTION_SUB_MESSAGE', emailConfirmation.subMessage)
//   .replaceAll('HTML_TEMPLATE_ACTION_BUTTON', emailConfirmation.callToAction)
//   .value();
//
// billingHtml = '';
// if (emailBilling) {
//   billingHtml = Assets.getText('templates/billing.html');
//   billingHtml = s(globalReplacement(themeReplacement(billingHtml)))
//   // Content
//     .replaceAll('HTML_TEMPLATE_BILLING_TITLE', emailBilling.title)
//     .replaceAll('HTML_TEMPLATE_BILLING_GREETINGS', emailBilling.greetings)
//     .replaceAll('HTML_TEMPLATE_BILLING_INTRODUCTION', emailBilling.introduction)
//     .replaceAll('HTML_TEMPLATE_BILLING_INVOICE_PREAMBLE', emailBilling.invoicePreamble)
//     .replaceAll('HTML_TEMPLATE_BILLING_SUB_GREETINGS', emailBilling.subGreetings)
//   .value();
// }
//
// // Configure accounts
// Accounts.emailTemplates.from = transactionalEmails.account;
// Accounts.emailTemplates.verifyEmail.subject = () => emailConfirmation.title;
// Accounts.emailTemplates.verifyEmail.html = (user, url) => {
//   return s.replaceAll(
//     actionHtml,
//     'HTML_TEMPLATE_ACTION_VALIDATE_URL',
//     url.replace('/#', ''));
// };
//
// sendConfirmationEmail = (to, idx) => {
//   Email.send({
//     from: transactionalEmails.account,
//     to,
//     subject: emailConfirmation.title,
//     html: s.replaceAll(actionHtml, 'HTML_TEMPLATE_ACTION_VALIDATE_URL', `${settings.public.proxy.url}confirm/${idx}`)
//   });
// };
//
// sendBillingEmail = (to, invoice, salesAgreementTitle, salesAgreementContent) => {
//   Email.send({
//     from: transactionalEmails.account,
//     to,
//     subject: emailBilling.title,
//     html: s(billingHtml)
//       .replaceAll('HTML_TEMPLATE_BILLING_INVOICE_CONTENT', invoice)
//       .replaceAll('HTML_TEMPLATE_TERMS_OF_SALES_TITLE', salesAgreementTitle)
//       .replaceAll(
//         '<HTML_TEMPLATE_TERMS_OF_SALES_CONTENT></HTML_TEMPLATE_TERMS_OF_SALES_CONTENT>'.toLowerCase(),
//         salesAgreementContent)
//       .value()
//   });
// };
