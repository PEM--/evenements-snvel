const { sender, smtp } = Meteor.settings.private.email;

Meteor.startup(() => {
  process.env.MAIL_URL = smtp;
  console.log('SMTP declared', process.env.MAIL_URL);
});

const { facebook, twitter, linkedin } = Meteor.settings.public.socialLinks;
const globalReplacement = (str) => {
  const result = s(str)
    .replaceAll('HTML_TEMPLATE_TWITTER_URL', twitter)
    .replaceAll('HTML_TEMPLATE_FACEBOOK_URL', facebook)
    .replaceAll('HTML_TEMPLATE_LINKEDIN_URL', linkedin)
  .value();
  return result;
};

const confirmationTitle = 'Evènements SNVEL - Confirmez votre email';
const confirmationHtml = s(globalReplacement(Assets.getText('emails/confirmation.html')))
  .replaceAll('HTML_TEMPLATE_ACTION_TITLE', confirmationTitle)
  .value();
const resetPasswordTitle = 'Evènements SNVEL - Mettre votre mot de passe à jour';
const resetPasswordHtml = s(globalReplacement(Assets.getText('emails/resetPassword.html')))
  .replaceAll('HTML_TEMPLATE_RESETPASSWORD_TITLE', resetPasswordTitle)
  .value();
const billingTitle = 'Evènements SNVEL - Votre facture';
const billingHtml = s(globalReplacement(Assets.getText('emails/billing.html')))
  .replaceAll('HTML_TEMPLATE_BILLING_TITLE', billingTitle)
  .value();

// Configure accounts
Accounts.emailTemplates.from = sender;
Accounts.emailTemplates.verifyEmail.subject = () => confirmationTitle;
Accounts.emailTemplates.verifyEmail.html = (user, url) => {
  return s.replaceAll(
    confirmationHtml,
    'HTML_TEMPLATE_ACTION_VALIDATE_URL',
    url.replace('/#', ''));
};
Accounts.emailTemplates.resetPassword.html = (user, url) => {
  return s.replaceAll(
    resetPasswordHtml,
    'HTML_TEMPLATE_ACTION_VALIDATE_URL',
    url.replace('/#', ''));
};

const url = Meteor.settings.proxy.url;
MainApp.Utils.sendConfirmationEmail = (to, idx) => {
  Email.send({
    from: sender,
    to,
    subject: confirmationTitle + '🐴',
    html: s.replaceAll(confirmationHtml, 'HTML_TEMPLATE_ACTION_VALIDATE_URL', `${url}confirm/${idx}`)
  });
};

MainApp.Utils.sendBillingEmail = (to, invoice, salesAgreementTitle, salesAgreementContent) => {
  Email.send({
    from: sender,
    to,
    subject: billingTitle,
    html: s(billingHtml)
      .replaceAll('HTML_TEMPLATE_BILLING_INVOICE_CONTENT', invoice)
      .replaceAll('HTML_TEMPLATE_TERMS_OF_SALES_TITLE', salesAgreementTitle)
      .replaceAll(
        '<HTML_TEMPLATE_TERMS_OF_SALES_CONTENT></HTML_TEMPLATE_TERMS_OF_SALES_CONTENT>'.toLowerCase(),
        salesAgreementContent)
      .value()
  });
};
