import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {Error} from '../types/Error';
import { useAuth } from '../hooks/use-auth';

const UserDetails = (): JSX.Element => {

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [errorObj, setErrorObj] = useState<Error>({
    error: false,
    message: '',
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required()
    }),
    onSubmit: async (values): Promise<void> => {
      try {
        await login(values.email, values.password);
        navigate('/users');
      } catch (err) {
        setErrorObj({
          error: true,
          message: 'User Login Failed!'
        })
      }
    }
  });

  const { handleSubmit, handleChange } = formik;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/users');
    }
  }, [isAuthenticated]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        marginTop: 30
      }}
    >
      <Card
        sx={{
          textAlign: 'center',
          width: '50%'
        }}
      >
        <CardContent
          sx={{
            padding: 3
          }}
        >
          <Typography
            variant="h4"
            color="textPrimary"
          >
            Login
          </Typography>
          <Box mt={5}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                autoFocus
                label="Email Address"
                margin="normal"
                name="email"
                type="email"
                variant="outlined"
                value={formik.values.email}
                onChange={handleChange}
                error={
                  formik.touched.email && Boolean(formik.errors.email)
                }
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                label="Password"
                margin="normal"
                name="password"
                type="password"
                variant="outlined"
                value={formik.values.password}
                onChange={handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />

              {
                errorObj.error && (
                  <Box mt={2}>
                    <Alert severity="error">{errorObj.message}</Alert>
                  </Box>
                )
              }
              <Box mt={2}>
                <Button
                  color="primary"
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Log In
                </Button>
              </Box>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserDetails;
