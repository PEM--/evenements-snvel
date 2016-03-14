const Events = ({user = null, program}) => {
  let line = 0;
  const userType = user ? user.profile.category : '';
  const events = program.events.reduce((acc, e) => {
    e.sessions.forEach(s => {
      s.conferences.forEach(c => {
        const price = user ? program.priceRights.find(p => p.code === c.code) : null;
        const priceAmount = user ? price.byType.find(t => t.category === userType).amount : 0;
        // const discount = program.discounts.find(d => d.code === c.code);
        // const discountAmount = discount.byType.find(t => t.category === userType).amount;
        if (priceAmount !== -1) {
          acc.push(
            <div className='Event' key={line++}>
              <h2 className='event'>{e.title}<span className='session'>{s.title}</span></h2>
              <p className='conference'>{c.title}</p>
              <p className='description'>{c.description}</p>
              {
                c.moderator ? (<div className='moderator'>
                  <i className='fa fa-user-md'></i>
                  <span>{c.moderator}</span>
                </div>) : ''
              }
              {
                c.speaker ? (<p className='speakers'>
                  <i className='fa fa-users'></i>
                <span>{c.speaker}</span>
                </p>) : ''
              }
              <p className='hours'>
                <i className='fa fa-clock-o'></i>
                <span className='date'>{moment(c.begin).format('DD/MM/YY')}</span>
                <span className='begin'>{moment(c.begin).format('HH:mm')}</span>
                <span className='end'>{moment(c.end).format('HH:mm')}</span>
              </p>
            </div>
          );
        }
      });
    });
    return acc;
  }, []);
  return (
    <div className='Events'>
      {events.map(e => e)}
    </div>
  );
};

MainApp.Views.Events = Events;
