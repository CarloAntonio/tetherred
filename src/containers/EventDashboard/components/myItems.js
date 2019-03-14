import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {compose } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Droppable } from 'react-beautiful-dnd'

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Utils
import { getMyItems } from '../../../utils/firestoreAPI';

const styles = theme => ({
    myItemsContainer: {
        backgroundColor: 'white'
    },
    itemsHolder: {
        minHeight: 100
    }
});

class MyItems extends Component {

    state = {
        myItems: null
    }

    componentDidMount(){
        getMyItems(this.props.match.params.id, this.props.auth.uid)
            .then(data => {
                this.setState({
                    myItems: data
                })
            })
    }

    render() {
        const { classes } = this.props;

        console.log(this.state);

        const myItemsComponents = [];
        if(this.state.myItems) this.state.myItems.forEach(item => {
            myItemsComponents.push(<h3 key={item.id}>{item.data.name}</h3>)
        })

        return (
            <div className={classes.myItemsContainer}>
                <p>Stuff I'm Bringing</p>
                <Droppable droppableId={this.props.droppableId}>
                    {(provided) => (
                        <div 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={classes.itemsHolder}
                        >
                            {provided.placeholder}
                            {myItemsComponents}
                        </div>
                    )}
                </Droppable>
            </div>
        )
    }
}

MyItems.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
    }
}

export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps),
)(MyItems);