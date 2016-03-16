initPayment = () => {
  const CardSchema = new SimpleSchema({
    number: {
      type: String, label: 'N° de carte', min: 15, max: 16,
      view: { name: 'Input' }
    },
    name: {
      type: String, label: 'Nom complet',
      view: { name: 'Input' }
    }
  });

  MainApp.Schema.CardSchema = CardSchema;
};
