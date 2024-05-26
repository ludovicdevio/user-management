import React, {useCallback, useEffect, useState} from 'react';
import DashboardLayout from '../layouts/Dashboard';
import Box from "@mui/material/Box";
import { useParams, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import {User} from '../types/User';
import {usersApi} from '../api/users-api';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import {Error} from '../types/Error';

const UserDetails = (): JSX.Element => {

  let { id } = useParams();
  let navigate = useNavigate();

  const [isEditUser, setIsEditUser] = useState<boolean>(false);
  const [errorObj, setErrorObj] = useState<Error>({
    error: false,
    message: '',
  });
  const [user, setUser] = useState<User>({
    avatar: '',
    email: '',
    id: 0,
    name: '',
    role: ''
  });

  const handleEditUser = async () => {
    setIsEditUser(!isEditUser);

    if (isEditUser && user.id) {
      try {
        const userResponse = await usersApi.updateUser(user.id, user);

        if ('error' in userResponse && userResponse.error) {
          setErrorObj({
            error: userResponse.error,
            message: userResponse.message
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleDeleteUser = async () => {
    if (user.id) {
      await usersApi.deleteUser(user.id);
      navigate('/users');
    }
  };

  const getUser = useCallback(async () => {
    if (id) {
      const userResponse = await usersApi.getUserById(id);
      setUser(userResponse);

    }
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <DashboardLayout>
      <Box
        display="flex"
        justifyContent="center"
      >
        <Stack spacing={2}>
          {
            errorObj.error && (
              <Alert severity="error">{errorObj.message}</Alert>
            )
          }

          <Card
            variant="outlined"
            sx={{
              width: 500,
              borderColor: 'blue',
              textAlign: 'center',
            }}
          >
            <Avatar
              alt={user.name}
              src={user.avatar}
              sx={{
                width: 90,
                height: 90,
                display: 'flex',
                margin: 'auto'
              }}
            />
            {/*
            Comments
            */}
            <Typography variant="h6" gutterBottom>
              <strong>User ID:</strong> {user.id}
            </Typography>

            <Typography variant="h6" gutterBottom>
              <strong>Username:{' '}</strong>
              {
                isEditUser ? (
                  <TextField
                    size="small"
                    variant="outlined"
                    value={user.name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setUser({
                        ...user,
                        name: event.target.value
                      });
                    }}
                  />
                ) : user.name
              }
            </Typography>
            <Typography variant="h6" gutterBottom>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="h6" gutterBottom>
              <strong>Role:</strong> {user.role}
            </Typography>
          </Card>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
          >
            <Button
              variant="contained"
              onClick={handleEditUser}
            >
              {isEditUser ? 'Save' : 'Edit'}
            </Button>
            <Button
              variant="contained"
              onClick={handleDeleteUser}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Box>
    </DashboardLayout>
  );
};

export default UserDetails;
