import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Avatar,
} from '@mui/material';
import PropTypes from 'prop-types';

const UserDetailsPopup = ({ selectedUser, onClose }) => (
  <Dialog
    open={!!selectedUser}
    onClose={onClose}
    maxWidth="sm"
    fullWidth
    sx={{
      '& .MuiDialog-paper': {
        borderRadius: '20px',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.25)',
      },
    }}
  >
    <DialogTitle
      sx={{
        textAlign: 'center',
        marginBottom: '15px',
        color: '#000',
        fontWeight: 'bold',
        fontSize: '1.5rem',
      }}
    >
      {selectedUser &&
        `${selectedUser.profile.firstName} ${selectedUser.profile.lastName}`}{' '}
    </DialogTitle>
    <DialogContent
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <Avatar
        src={selectedUser && selectedUser.avatar}
        sx={{
          width: '100px',
          height: '100px',
          marginBottom: '15px',
        }}
      />
      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
          color: '#000',
          fontWeight: 'bold',
        }}
      >
        {selectedUser && selectedUser.profile.username}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
          color: '#000',
          fontWeight: 'bold',
        }}
      >
        {selectedUser && selectedUser.profile.email && (
          <a href={'mailto:' + selectedUser.profile.email}>
            {selectedUser.profile.email}
          </a>
        )}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
          color: '#000',
          fontWeight: 'bold',
        }}
      >
        {selectedUser && selectedUser.jobTitle}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          textAlign: 'center',
          color: '#000',
          fontWeight: 'bold',
        }}
      >
        {selectedUser && selectedUser.Bio}
      </Typography>
    </DialogContent>
  </Dialog>
);

UserDetailsPopup.propTypes = {
  selectedUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    profile: PropTypes.shape({
      username: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    jobTitle: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default UserDetailsPopup;
