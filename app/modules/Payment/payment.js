initPayment = () => {
  const CardSchema = new SimpleSchema({
    number: {
      type: String, label: 'N° de carte', min: 15, max: 20,
      defaultValue: '4111 1111 1111 1111',
      view: { name: 'Input', type: 'text', placeholder: 'N° de carte' }
    },
    name: {
      type: String, label: 'Nom complet', min: 3, max: 20,
      defaultValue: 'PEM',
      view: { name: 'Input', type: 'text', placeholder: 'Nom complet' }
    },
    expiry: {
      type: String, label: 'Date d\'expiration', min: 7, max: 7,
      defaultValue: '12 / 17',
      view: { name: 'Input', type: 'text', placeholder: 'Date d\'expiration' }
    },
    cvc: {
      type: String, label: 'Cryptogramme', min: 3, max: 4,
      defaultValue: '123',
      view: { name: 'Input', type: 'text', placeholder: 'Cryptogramme' }
    }
  });

  MainApp.Schema.CardSchema = CardSchema;
};
