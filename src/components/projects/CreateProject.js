import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { createEvent } from '../../store/actions/eventActions';

class CreateProject extends Component {
    state = {
        title: '',
        description: '',
        location: '',
        type: 'private'
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createEvent(this.state);
        this.props.history.push('/');
    }

    render() {

        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        
        return (
            <div>
                <div className="container">
                    <form onSubmit={this.handleSubmit} className="white">
                        <h5 className="grey-text text-darken-3">Create New Event</h5>
                        <div className="input-field">
                            <label htmlFor="title">Title</label>
                            <input type="text" id='title' onChange={this.handleChange}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" className="materialize-textarea" onChange={this.handleChange}></textarea>
                        </div>
                        <div className="input-field">
                            <label htmlFor="location">Location</label>
                            <textarea id="location" className="materialize-textarea" onChange={this.handleChange}></textarea>
                        </div>
                        <div className="input-field">
                            <button className="btn pink lighten-1 z-depth-0">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createEvent: project => dispatch(createEvent(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);