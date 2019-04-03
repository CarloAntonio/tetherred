// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

// Custom Components
import CreateEventDialog from './components/createEventDialog';
import UserAvatar from '../../components/UserAvatar';
import EditProfileModal from '../../modals/editProfileModal';

// Actions
import { signOut } from '../../store/actions/authActions';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  signedOutLinks: {
      color: 'white',
      margin: '0 1rem',
      '&:hover': {
        color: '#5FE05E',
        textDecoration: 'none'
      }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class PrimaryAppBar extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    showCreateEventModal: false,
    showEditProfile: false
  };

  handleSignout = () => {
    this.handleProfileMenuClose();
    this.props.signOut();
  }

  // Profile Menu Controls
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleProfileMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  // Mobile Menu Dialog Controls
  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  // Create Event Dialog Controls
  handleShowCreateEventModal = () => {
    this.setState({
      showCreateEventModal: true
    })
  }

  handleHideCreateEventModal = () => {
    this.setState({
      showCreateEventModal: false
    })
  }

  // Edit Profile Dialog Controls
  handleOpenEditProfile = () => {
    this.handleProfileMenuClose();
    this.setState({
      showEditProfile: true
    })
  }

  handleCloseEditProfile = () => {
    this.setState({
      showEditProfile: false
    })
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes, auth } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const signedOutMenu = (
        <div className={classes.sectionDesktop}>
            <Typography className='d-flex flex-row' variant="h6" color="inherit" noWrap>
                <NavLink className={classes.signedOutLinks} to='/signin'>SignIn</NavLink>
                <NavLink className={classes.signedOutLinks} to='/signup'>Signup</NavLink>
            </Typography>
        </div>
    )

    const signedInMenu = (
        <div className={classes.sectionDesktop}>
            <IconButton color="inherit" onClick={this.handleShowCreateEventModal}>
              <AddIcon/>
            </IconButton>
            <IconButton color="inherit">
                <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit">
                <UserAvatar size={40}/>
            </IconButton>
        </div>
    )

    const signedInMenuPopUp = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleProfileMenuClose}>
        <MenuItem onClick={this.handleOpenEditProfile}>Edit Profile</MenuItem>
        <MenuItem onClick={this.handleSignout}>Sign Out</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleProfileMenuClose}>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit" onClick={this.handleShowCreateEventModal}>
            <AddIcon />
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className='d-flex flex-row' variant="h6" color="inherit" noWrap>
                <NavLink className={classes.signedOutLinks} to='/'>Tetherred</NavLink>
            </Typography>
            <div className={classes.grow} />
            { auth.uid ? signedInMenu : signedOutMenu }
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {signedInMenuPopUp}
        {renderMobileMenu}

        <CreateEventDialog 
          showCreateEventModal={this.state.showCreateEventModal}
          handleHideCreateEventModal={this.handleHideCreateEventModal}/>

        <EditProfileModal
          showModal={this.state.showEditProfile}
          handleClose={this.handleCloseEditProfile}/>
      </div>
    );
  }
}

PrimaryAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PrimaryAppBar));