const { Views } = MainApp;
const { Button } = Views;

const PaymentBycheck = ({amount, onValidate}) => (
  <div className='check animated fadeIn'>
    <h2>Paiement par chèque sélectionné</h2>
    <form>
      <h3>Montant : <span className='price'>{
        numeralAmountFormat(amount)
      } TTC</span></h3>
      <p>
        Veuillez adresser votre chèque à l'ordre du <b>SNVEL</b>&nbsp;
        et envoyez le par courrier postal à l'adresse suivante :
      </p>
      <p className='textCenter'>
        <b>SNVEL</b> - 10, Place Léon Blum - 75011 Paris
      </p>
      <p><span className='fa fa-exclamation-circle'></span> Sur réception et encaissement de ce dernier, un email de facture vous sera transmis validant votre inscription.</p>
      <div className='textCenter'>
        <Button primary={true} onClick={onValidate}>
          Je valide ce paiment
        </Button>
      </div>
    </form>
  </div>
);

Views.PaymentBycheck = PaymentBycheck;
