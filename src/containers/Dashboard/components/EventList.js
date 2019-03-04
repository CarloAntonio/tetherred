import React from 'react';

import EventCard from './EventCard';

const EventList = ({events}) => {
    return (
        <div>
            {events && Object.keys(events).map(eventKey => {
                return (
                    <EventCard 
                        key={eventKey}
                        event={events[eventKey]} 
                        eventKey={eventKey}/>
                )
            })}
        </div>
    )
}

export default EventList;