import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import _ from 'lodash';

// Material UI
import { withStyles } from '@material-ui/core/styles';

// Custom Components
import EventCard from './eventCard';

const styles = {
    card: {
      minWidth: 160,
      maxWidth: '100%',
      marginBottom: 16,
    //   height: 80,
      padding: '0 8px'
    },
};

class EventItem extends Component {
    render () {
        const { classes } = this.props;

        let cardContent = null;
        if(this.props.itemDetails) {
            if(!_.isEmpty(this.props.itemDetails.data.children) && this.props.itemDetails.rootParentItem) {
                if(this.props.itemDetails.rootParentItem.parent === 'root') {
                    cardContent = (
                        <EventCard 
                            itemName={this.props.itemDetails.data.name}
                            itemDetails={this.props.itemDetails}/>
                    )
                } else {
                    cardContent = (
                        <EventCard 
                            itemName={this.props.itemDetails.data.name}
                            itemDetails={this.props.itemDetails}/>
                    )
                }
            } else if(!_.isEmpty(this.props.itemDetails.data.children) && !this.props.itemDetails.rootParentItem){
                cardContent = (
                        <EventCard 
                            itemName={this.props.itemDetails.data.name}
                            itemDetails={this.props.itemDetails}/>
                )
            } else if(_.isEmpty(this.props.itemDetails.data.children) && this.props.itemDetails.rootParentItem) {
                cardContent = (
                        <EventCard 
                            itemName={this.props.itemDetails.data.name}
                            itemDetails={this.props.itemDetails}/>
                )
            } else {
                cardContent = (
                        <EventCard 
                            itemName={this.props.itemDetails.data.name}
                            itemDetails={this.props.itemDetails}/>
                )
            }
        }
        

        return (
            <div 
                className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                <Draggable draggableId={this.props.draggableId} index={this.props.index}>
                    {provided => (
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >   
                            <div className={classes.card} >
                                {cardContent}
                            </div>
                        </div>
                    )}
                </Draggable>
            </div>
            
        )
    }
}

EventItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withRouter,
    withStyles(styles),
)(EventItem);

// class EventItem extends Component {
//     render () {
//         const { classes } = this.props;

//         let cardContent = null;
//         if(this.props.itemDetails) {
//             if(!_.isEmpty(this.props.itemDetails.data.children) && this.props.itemDetails.rootParentItem) {
//                 if(this.props.itemDetails.rootParentItem.parent === 'root') {
//                     cardContent = (
//                         <CardContent onClick={() => this.props.diveIntoItem(this.props.itemDetails.data)}>
//                             <Typography component="p">
//                                 {this.props.itemDetails.data.name}
//                             </Typography>
//                             <Typography 
//                                 color="textSecondary" 
//                                 onClick={() => this.props.diveIntoItem(null)}>
//                                 {this.props.itemDetails.rootParentItem ? `Root: ${this.props.itemDetails.rootParentItem.name}` : 'Root'}
//                             </Typography>
//                         </CardContent>
//                     )
//                 } else {
//                     cardContent = (
//                         <CardContent onClick={() => this.props.diveIntoItem(this.props.itemDetails.data)}>
//                             <Typography component="p">
//                                 {this.props.itemDetails.data.name}
//                             </Typography>
//                             <Typography 
//                                 color="textSecondary" 
//                                 onClick={() => this.props.diveIntoItem(this.props.itemDetails.rootParentItem)}>
//                                 {this.props.itemDetails.rootParentItem ? `Root: ${this.props.itemDetails.rootParentItem.name}` : 'Root'}
//                             </Typography>
//                         </CardContent>
//                     )
//                 }
//             } else if(!_.isEmpty(this.props.itemDetails.data.children) && !this.props.itemDetails.rootParentItem){
//                 cardContent = (
//                     <Card className={classes.card} >
//                         <CardContent onClick={() => this.props.diveIntoItem(this.props.itemDetails.data)}>
//                             <Typography component="p">
//                                 {this.props.itemDetails.data.name}
//                             </Typography>
//                             <Typography color="textSecondary">
//                                 {this.props.itemDetails.rootParentItem ? `Root: ${this.props.itemDetails.rootParentItem.name}` : 'Root'}
//                             </Typography>
//                         </CardContent>
//                     </Card>
//                 )
//             } else if(_.isEmpty(this.props.itemDetails.data.children) && this.props.itemDetails.rootParentItem) {
//                 cardContent = (
//                     <CardContent>
//                         <Typography component="p">
//                             {this.props.itemDetails.data.name}
//                         </Typography>
//                         <Typography 
//                             color="textSecondary" 
//                             onClick={() => this.props.diveIntoItem(null)}>
//                             {this.props.itemDetails.rootParentItem ? `Root: ${this.props.itemDetails.rootParentItem.name}` : 'Root'}
//                         </Typography>
//                     </CardContent>
//                 )
//             } else {
//                 cardContent = (
//                     <Card className={classes.card} >
//                         <CardContent>
//                             <Typography component="p">
//                                 {this.props.itemDetails.data.name}
//                             </Typography>
//                             <Typography color="textSecondary">
//                                 {this.props.itemDetails.rootParentItem ? `Parent: ${this.props.itemDetails.rootParentItem.name}` : 'Root'}
//                             </Typography>
//                         </CardContent>
//                     </Card>
//                 )
//             }
//         }
        

//         return (
//             <div 
//                 className={this.props.parentContainer === 'pool' ? "col-2" : 'col-12'} 
//                 style={{ margin: 8, padding: 0}}>
//                 <Draggable draggableId={this.props.draggableId} index={this.props.index}>
//                     {provided => (
//                         <div
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             ref={provided.innerRef}
//                         >   
//                             <Card className={classes.card} >
//                                 {cardContent}
//                             </Card>
//                         </div>
//                     )}
//                 </Draggable>
//             </div>
            
//         )
//     }
// }