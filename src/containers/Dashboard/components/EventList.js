import React from 'react';

import EventCard from './EventCard';

const EventList = ({events}) => {
    return (
        <div className='row'>
            {events && Object.keys(events).map(eventKey => {
                return (
                    <div className='mx-2' key={eventKey}>
                        <EventCard event={events[eventKey]} eventKey={eventKey}/>
                    </div>
                )
            })}
        </div>
    )
}

export default EventList;