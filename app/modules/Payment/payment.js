initPayment = () => {
  const CardSchema = new SimpleSchema({
    number: {
      type: String, label: 'N° de carte', min: 15, max: 20,
      defaultValue: '',
      view: { name: 'Input', type: 'text', placeholder: 'N° de carte' }
    },
    name: {
      type: String, label: 'Nom complet', min: 3, max: 20,
      defaultValue: '',
      view: { name: 'Input', type: 'text', placeholder: 'Nom complet' }
    },
    expiry: {
      type: String, label: 'Date d\'expiration', min: 7, max: 7,
      defaultValue: '',
      view: { name: 'Input', type: 'text', placeholder: 'Date d\'expiration' }
    },
    cvc: {
      type: String, label: 'Cryptogramme', min: 3, max: 4,
      defaultValue: '',
      view: { name: 'Input', type: 'text', placeholder: 'Cryptogramme' }
    }
  });

  MainApp.Schema.CardSchema = CardSchema;
};
