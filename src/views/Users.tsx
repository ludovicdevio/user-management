import React, { useEffect, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import UserCard from '../components/UserCard';
import {usersApi} from '../api/users-api';
import {User} from '../types/User';
import DashboardLayout from '../layouts/Dashboard';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CreateUserDialog from '../components/CreateUserDialog';

const USERS_PER_PAGE = 5;

const Users = (): JSX.Element => {

  const [users, setUsers] = useState<User[]>([]);
  const [openUserDialog, setOpenUserDialog] = useState<boolean>(false);

  // For pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalUsers, setTotalUsers] = useState(0);

  // For search
  const [searchText, setSearchText] = useState<string>('');

  const handleOpenUserDialog = () => {
    setOpenUserDialog(true);
  };
  const handleCloseUserDialog = (action?: string, user?: User) => {
    if (action === 'created' && user) {
      setUsers([...users, user]);
    }

    setOpenUserDialog(false);
  };


  const getUsers = useCallback(async () => {
    const usersResponse = await usersApi.getUsers();

    setUsers(usersResponse);
    setTotalUsers(usersResponse.length);
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText)
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const paginatedUsers: User[] = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  return (
    <DashboardLayout>
      <Box>
        <Grid container>
          <Grid item md={2} />
          <Grid
            item
            container
            md={8}
            spacing={2}
            display="flex"
            justifyContent="center"
          >
            <Grid
              item
              xs={8}
              md={8}
              display="flex"
              justifyContent="center"
            >
              <TextField
                fullWidth
                label="Search A User by Name"
                variant="outlined"
                value={searchText}
                onChange={handleSearchChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              display="flex"
              justifyContent="center"
            >
              <Button
                variant="contained"
                onClick={handleOpenUserDialog}
              >
                Create User
              </Button>
            </Grid>
            {
              paginatedUsers.map(_user => (
                <Grid item key={_user.id}>
                  <UserCard
                    user={_user}
                  />
                </Grid>
              ))
            }
            <Grid
              item
              xs={12}
              md={12}
              display="flex"
              justifyContent="center"
            >
              <Pagination
                count={Math.ceil(filteredUsers.length / USERS_PER_PAGE)}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
              />
            </Grid>
          </Grid>
          <Grid item md={2} />
        </Grid>
      </Box>

      <CreateUserDialog
        open={openUserDialog}
        onClose={handleCloseUserDialog}
      />
    </DashboardLayout>
  );
};

export default Users;
