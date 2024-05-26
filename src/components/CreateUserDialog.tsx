import React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Typography from "@mui/material/Typography";
import { usersApi } from '../api/users-api';
import {User} from '../types/User';

interface Props {
  open: boolean;
  onClose: (action?: string, user?: User) => void;
}
const CreateUserDialog = ({open, onClose}: Props): JSX.Element => {

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      avatar: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().max(20, 'Max 20 chars').required('Required!!!'),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      avatar: Yup.string().required(),
    }),
    onSubmit: async (values): Promise<void> => {
      const createdUser = await usersApi.createUser(values);
      onClose('created', createdUser as User);
    }
  });

  const { handleSubmit, handleChange } = formik;

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      fullWidth={true}
    >
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <form
          id="createUserForm"
          onSubmit={handleSubmit}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <Typography
                variant="subtitle2"
                fontWeight={700}
                sx={{
                  marginBottom: 2
                }}
              >
                Enter your name
              </Typography>
              <TextField
                id="name"
                name="name"
                label="Name"
                fullWidth
                variant="outlined"
                value={formik.values.name}
                onChange={handleChange}
                error={
                  formik.touched.name && Boolean(formik.errors.name)
                }
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography
                variant="subtitle2"
                fontWeight={700}
                sx={{
                  marginBottom: 2
                }}
              >
                Enter your email
              </Typography>
              <TextField
                id="email"
                name="email"
                label="Email"
                fullWidth
                variant="outlined"
                value={formik.values.email}
                onChange={handleChange}
                error={
                  formik.touched.email && Boolean(formik.errors.email)
                }
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography
                variant="subtitle2"
                fontWeight={700}
                sx={{
                  marginBottom: 2
                }}
              >
                Enter your password
              </Typography>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                value={formik.values.password}
                onChange={handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography
                variant="subtitle2"
                fontWeight={700}
                sx={{
                  marginBottom: 2
                }}
              >
                Enter your avatar
              </Typography>
              <TextField
                id="avatar"
                name="avatar"
                label="Avatar"
                fullWidth
                variant="outlined"
                value={formik.values.avatar}
                onChange={handleChange}
                error={
                  formik.touched.avatar && Boolean(formik.errors.avatar)
                }
                helperText={formik.touched.avatar && formik.errors.avatar}
              />
            </Grid>

          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => onClose()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="createUserForm"
          variant="contained"
        >
          Create User
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserDialog;
