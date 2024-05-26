import React from 'react';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {User} from '../types/User';
import { useNavigate } from 'react-router-dom';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps): JSX.Element => {

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/users/${user.id}`);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: 275,
        borderColor: 'blue',
        cursor: 'pointer'
      }}
      onClick={handleCardClick}
    >
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Avatar
            sx={{ width: 70, height: 70 }}
            src={user.avatar}
          />
          <Stack>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {user.role}
            </Typography>
            <Typography variant="h5" component="div">
              {user.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {user.email}
            </Typography>
          </Stack>
        </Stack>

      </CardContent>
    </Card>
  );
};

export default UserCard;
