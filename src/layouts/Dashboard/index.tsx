import React from 'react';
import Box from '@mui/material/Box';
import TopBar from './TopBar';

interface Props {
  children: React.ReactNode
}
const DashboardLayout = ({ children }: Props): JSX.Element => {

  return (
    <Box>
      <TopBar />

      <Box
        sx={{
          marginTop: 15
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
