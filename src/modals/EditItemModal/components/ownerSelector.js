// Libraries
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    formControl: {
      margin: 0,
      minWidth: 120,
    },
});

class OwnerSelector extends React.Component {
    state = {
      labelWidth: 0,
    };
  
    componentDidMount() {
      this.setState({
        labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
      });
    }
  
    render() {
      const { classes } = this.props;

      const menuItems = [];
      if(!_.isEmpty(this.props.users)) {
          this.props.users.forEach(user => {
            menuItems.push(
                <option value={user.id} key={user.id}>{user.data ? user.data.displayName : "Unknown"}</option>
              )
          })
      }
  
      return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
                ref={ref => {
                this.InputLabelRef = ref;
                }}
                htmlFor="outlined-age-simple">
                Owner
            </InputLabel>

            <Select
                native
                value={this.props.owner}
                onChange={this.props.handleChangeOwner}
                input={
                <OutlinedInput
                    labelWidth={this.state.labelWidth}
                    name="owner"
                    id="outlined-age-simple"/>
                }
                >
                <option value='none'>{this.props.owner !== 'none'? this.props.owner.displayName : 'None'}</option>
                {menuItems}
            </Select>
        </FormControl>
      );
    }
}
  
OwnerSelector.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;

    let eventUserIds = null;
    if(state.firestore.data.eventAuxDetails 
        && state.firestore.data.eventAuxDetails[id] 
        && state.firestore.data.eventAuxDetails[id].members) {
        eventUserIds = state.firestore.data.eventAuxDetails[id].members;
    }

    let users = [];
    if(eventUserIds
        && state.user 
        && state.user.userMinDetails) {
            eventUserIds.forEach(userId => {
                users.push({
                    data: state.user.userMinDetails[userId],
                    id: userId
                })
            })
        }

    return {
        users
    }
}
  
export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps)
)(OwnerSelector);