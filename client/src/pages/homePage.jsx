import { Box } from '@mui/material';
import React from 'react';
import { Navbar } from './Navbar';
import UserWidget from './widgets/UserWidget';
import FriendWidget from './widgets/FriendWidget';
import PostWidget from './widgets/PostWidget';
import MyPostWidget from './widgets/MyPostWidget';
import { useSelector } from 'react-redux';
import AdWidget from './widgets/AdWidget';

export const HomePage = () => {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      {/* Navbar at the Top */}
      <Navbar />

      <Box display="flex" flex={1} justifyContent="space-between" padding={2}>
        <Box
          display="flex"
          flexDirection="column"
          width="30%"
          marginRight={2}
          position="sticky"
          top={0}
          height="100vh"
        >
          {/* Left Column for User and Friend Widgets */}
          <UserWidget />
          <FriendWidget />
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          width="90%"
          overflowY="auto" // Enable scrolling only in the middle column
          height="calc(100vh - 64px)" // Adjust height for the middle column to fit within viewport
        >
          {/* Middle Column for Post Widget */}
          <MyPostWidget />
          <PostWidget />
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          width="85%"
          marginRight={2}
          position="sticky"
          top={0}
          height="100vh"
        >
          <AdWidget />
        </Box>
      </Box>
    </Box>
  );
};
