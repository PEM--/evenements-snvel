import React from 'react';

const Events = ({events, code = null}) => {
  let line = 0;
  const eventTags = events.reduce((acc, e) => {
    e.sessions.forEach(s => {
      s.conferences.forEach(c => {
        if (!code || c.code === code) {
          const [date, start] = c.begin.split(' ');
          const end = c.begin.split(' ')[1];
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
              <span className='date'>{date}</span>
              <span className='begin'>{start.substring(0, 5)}</span>
              <span className='end'>{end.substring(0, 5)}</span>
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
      {eventTags.map(e => e)}
    </div>
  );
};

MainApp.Views.Events = Events;
