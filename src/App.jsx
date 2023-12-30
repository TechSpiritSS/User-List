import {
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserDetailsPopup from './components/UserDetails';
import UserList from './components/UserList';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://602e7c2c4410730017c50b9d.mockapi.io/users')
      .then((response) => {
        response.data.sort((a, b) =>
          a.profile.firstName.localeCompare(b.profile.firstName)
        );
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseDetailsPopup = () => {
    setSelectedUser(null);
  };

  const theme = createTheme({
    typography: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          overflow: 'hidden',
          marginTop: '25px',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            marginBottom: '25px',
            color: '#000',
            fontWeight: 'bold',
          }}
        >
          Users
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            flex: 1,
            overflow: 'hidden',
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              height: '100%',
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              <UserList users={users} onUserClick={handleUserClick} />
            )}
          </Grid>
        </Grid>
        <UserDetailsPopup
          selectedUser={selectedUser}
          onClose={handleCloseDetailsPopup}
        />
      </Container>{' '}
    </ThemeProvider>
  );
};

export default App;

