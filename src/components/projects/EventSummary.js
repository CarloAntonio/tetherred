import React from 'react';
// import moment from 'moment';

const EventSummary = ({event}) => {
    if(!event) return null;
    return (
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{event.title}</span>
                <p>Event Description: {event.description}</p>
                {/* <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p> */}
            </div>
        </div>
    )
}

export default EventSummary;