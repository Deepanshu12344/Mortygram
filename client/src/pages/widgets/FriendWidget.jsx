import React from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import WidgetWrapper from '../../components/WidgetWrapper'; // Adjust the path as necessary
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';

const friends = [
  { id: 1, name: 'Alice Johnson', designation: 'Educator', image: '/path/to/alice.png' },
  { id: 2, name: 'Bob Smith', designation: 'Teacher', image: '/path/to/bob.png' },
  { id: 3, name: 'Charlie Brown', designation: 'Instructor', image: '/path/to/charlie.png' },
  // Add more friends as needed
];

const FriendsList = () => {
  const handleRemoveFriend = (id) => {
    // Logic to remove a friend goes here
    console.log(`Remove friend with id: ${id}`);
  };

  return (
    <WidgetWrapper
      sx={{
        width: { xs: '90%', sm: '300px' },
        maxWidth: '300px',
        marginTop: '1rem',
        marginLeft: '40px',
        // Add any other styles you want
      }}
    >
      <Typography variant="h6" fontWeight="500" sx={{ marginBottom: '1rem' }}>
        Friends List
      </Typography>
      {friends.map(friend => (
        <Box key={friend.id} display="flex" alignItems="center" sx={{ marginBottom: '1rem' }}>
          <Avatar src={friend.image} alt={friend.name} sx={{ width: '40px', height: '40px', marginRight: '0.5rem' }} />
          <Box flexGrow={1}>
            <Typography variant="body1" fontWeight="500">
              {friend.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {friend.designation}
            </Typography>
          </Box>
          <IconButton onClick={() => handleRemoveFriend(friend.id)} color="primary">
            <PersonRemoveOutlinedIcon />
          </IconButton>
        </Box>
      ))}
    </WidgetWrapper>
  );
};

export default FriendsList;
