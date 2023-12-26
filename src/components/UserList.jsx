import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import './UserList.css';
import UserListHeader from './UserListHeader';

const UserList = ({ users, onUserClick }) => {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [sortOption, setSortOption] = useState('asc');

  const handleFilterChange = (filterValue) => {
    const filtered = users.filter((user) =>
      user.profile.username.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
    const sorted = [...filteredUsers].sort((a, b) => {
      if (sortOption === 'desc') {
        return a.profile.firstName.localeCompare(b.profile.firstName);
      } else {
        return b.profile.firstName.localeCompare(a.profile.firstName);
      }
    });
    setFilteredUsers(sorted);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        height: '100%',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <Grid item xs={12}>
        <UserListHeader
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
      </Grid>

      {filteredUsers.map((user) => (
        <Grid item xs={12} md={4} key={user.id + user.profile.username}>
          <Card onClick={() => onUserClick(user)} className="glass">
            <CardContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%',
              }}
            >
              <Avatar
                src={user.avatar}
                alt={user.profile.username}
                className="avatar"
                imgProps={{
                  loading: 'lazy',
                }}
              />
              <div style={{ textAlign: 'center' }}>
                <Typography variant="h5" className="name">
                  {`${user.profile.firstName} ${user.profile.lastName}`}
                </Typography>
                <Typography variant="body2" className="username">
                  {user.profile.username}
                </Typography>
                <Typography variant="body2" className="jobTitle">
                  {user.jobTitle}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {filteredUsers.length === 0 && (
        <Grid item xs={12}>
          <Typography variant="h5" className="noUsers">
            No users found
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      jobTitle: PropTypes.string.isRequired,
      profile: PropTypes.shape({
        username: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onUserClick: PropTypes.func.isRequired,
};

export default UserList;
