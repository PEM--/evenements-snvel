const { Spinner } = MainApp.Views;

const PaymentWaiting = () => (
  <section className='maximized MainContent Payment animated fadeIn'>
    <h1>Paiement en attente</h1>
    <p><span className='fa fa-exclamation-circle'></span> Nous sommes en attente de réception de votre chèque, puis encaissement de ce dernier. Nous vous informerons de la validation de votre inscription via notre email de facturation.</p>
    <div style={{width: '100%', height: '100px'}} >
      <Spinner className='maximized' style={{height: '100px'}} />
    </div>
  </section>
);

MainApp.Views.PaymentWaiting = PaymentWaiting;
