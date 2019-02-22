import React from 'react';
import { Link } from 'react-router-dom';

import EventSummary from './EventSummary';

const EventList = ({events}) => {
    return (
        <div className="project-list section">
            {events && Object.keys(events).map(eventKey => {
                return (
                    <Link to={`/event/${eventKey}`} key={eventKey} >
                        <EventSummary event={events[eventKey]} />
                    </Link>
                )
            })}
        </div>
    )
}

export default EventList;