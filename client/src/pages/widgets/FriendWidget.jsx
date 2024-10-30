import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import WidgetWrapper from '../../components/WidgetWrapper'; // Adjust the path as necessary
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from '../../state';

const FriendsList = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const isFriend = friends.find((friend) => friend._id === friendId);

  const handleRemoveFriend = async () => {
    const response = await fetch(`http://localhost:3000/users/${_id}/${friendId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  const handleAddFriend = async () => {
    const response = await fetch(`http://localhost:3000/users/${_id}/${friendId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  const getFriends = async () => {
    const response = await fetch(`http://localhost:3000/users/${_id}/friends`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}` // Corrected "Authentication" to "Authorization"
      }
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <WidgetWrapper
      sx={{
        width: { xs: '90%', sm: '300px' },
        maxWidth: '300px',
        marginTop: '1rem',
        marginLeft: '40px',
      }}
    >
      <Typography variant="h6" fontWeight="500" sx={{ marginBottom: '1rem' }}>
        Friends List
      </Typography>
      {friends.map(friend => (
        <Box key={friend._id} display="flex" alignItems="center" sx={{ marginBottom: '1rem' }}>
          <Avatar src={friend.userPicturePath} alt={friend.name} sx={{ width: '40px', height: '40px', marginRight: '0.5rem' }} />
          <Box flexGrow={1}>
            <Typography variant="body1" fontWeight="500">
              {friend.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {friend.subtitle}
            </Typography>
          </Box>
          <IconButton onClick={() => isFriend ? handleRemoveFriend() : handleAddFriend()} color="primary">
            {isFriend ? <PersonRemoveOutlinedIcon /> : <PersonAddOutlinedIcon />}
          </IconButton>
        </Box>
      ))}
    </WidgetWrapper>
  );
};

export default FriendsList;
