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
const resetPasswordTitle = 'Evènements SNVEL - Votre mot de passe';
const resetPasswordHtml = s(globalReplacement(Assets.getText('emails/resetPassword.html')))
  .replaceAll('HTML_TEMPLATE_RESETPASSWORD_TITLE', resetPasswordTitle)
  .value();
const billingTitle = 'Evènements SNVEL - Votre facture';
const billingHtml = s(globalReplacement(Assets.getText('emails/billing.html')))
  .replaceAll('HTML_TEMPLATE_BILLING_TITLE', billingTitle)
  .value();

// Configure accounts
Accounts.emailTemplates.from = sender;
Accounts.emailTemplates.verifyEmail.subject = () => confirmationTitle + '👍';
Accounts.emailTemplates.verifyEmail.html = (user, url) => {
  return s.replaceAll(
    confirmationHtml,
    'HTML_TEMPLATE_ACTION_VALIDATE_URL',
    url.replace('/#', ''));
};
Accounts.emailTemplates.resetPassword.subject = () => resetPasswordTitle + '👍';
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
    subject: confirmationTitle + '👍',
    html: s.replaceAll(confirmationHtml, 'HTML_TEMPLATE_ACTION_VALIDATE_URL', `${url}confirm/${idx}`)
  });
};

const addCgvStyles = (cgv) => s(cgv)
  .replaceAll('<h2 ', '<h2 style="color:#8b8b8b;font-family:Impact,sans-serif;font-size:13px;text-align:left;word-break:normal;" ')
  .replaceAll('<h3 ', '<h3 style="color:#8b8b8b;font-family:Impact,sans-serif;font-size:12px;text-align:left;word-break:normal;" ')
  .replaceAll('<h4 ', '<h4 style="color:#8b8b8b;font-family:Impact,sans-serif;font-size:11px;text-align:left;word-break:normal;" ')
  .replaceAll('<p>', '<p style="color:#8b8b8b;font-family:\'San Francisco\',\'Helvetica Neue\',Roboto,Helvetica,Arial,sans-serif;font-size:11px;font-weight:normal;line-height:19px;margin:0;margin-bottom:10px;padding:0;text-align:justify;">')
  .replaceAll('<a ', '<a href="/" style="color:#e8e8e8;font-size:11px;text-align:justify;text-decoration:none;" ')
  .value();

MainApp.Utils.sendBillingEmail = (to, invoice, salesAgreementContent) => {
  const cgv = addCgvStyles(salesAgreementContent);
  Email.send({
    from: sender,
    to,
    subject: billingTitle + '👍',
    html: s(billingHtml)
      .replaceAll('HTML_TEMPLATE_BILLING_INVOICE_CONTENT', invoice)
      .replaceAll(
        '<HTML_TEMPLATE_TERMS_OF_SALES_CONTENT></HTML_TEMPLATE_TERMS_OF_SALES_CONTENT>'.toLowerCase(),
        cgv)
      .value()
  });
};
