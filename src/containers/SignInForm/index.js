import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// Actions
import { signIn, loginReset } from '../../store/actions/authActions';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class SignInForm extends Component  {
  state = {
    email: '',
    password: '',
    showPassword: false,
  }

  handleLogin = () => {
    this.props.signIn({
      email: this.state.email,
      password: this.state.password
    });
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  
  render() {
    const { authError, auth, classes } = this.props;
    if(auth.uid) return <Redirect to='/' />
    
    return (
      <div className='container pt-5'>
        <div className="row d-flex flex-column align-items-center">
          <TextField
            label="Email Address"
            id="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="example@email.com"
            className='col-4 pb-3'
            helperText="Please enter email address"/>
  
          <FormControl className='col-4 pb-3'>
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input
              id="password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }/>
          </FormControl>
  
          <Button 
            variant="contained" 
            color="primary" 
            onClick={this.handleLogin}
            className={classes.button}>
            Login
          </Button>  

          <Snackbar
            className='mb-5'
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open={authError ? true : false}
            onClose={this.props.loginReset}
            autoHideDuration={4000}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={authError}/>
        </div>
      </div>
    );
  };
}

SignInForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
      authError: state.auth.authError,
      auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
      signIn: cred => dispatch(signIn(cred)),
      loginReset: () => dispatch(loginReset()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignInForm));