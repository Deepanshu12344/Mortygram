import React, { useState } from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import WidgetWrapper from '../../components/WidgetWrapper'; // Adjust the path as necessary
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlined from '@mui/icons-material/ShareOutlined';

const PostWidget = () => {
  // Sample post data (replace with actual data or props)
  const posts = [
    {
      userImage: '/path/to/user1.png', // Replace with actual user image path
      userName: 'John Doe',
      userLocation: 'New York, USA',
      description: 'Had a great day out with friends!',
      postImage: '/path/to/post-image1.png', // Replace with actual post image path
      likes: 120,
      comments: 35,
    },
    {
      userImage: '/path/to/user2.png', // Replace with actual user image path
      userName: 'Jane Smith',
      userLocation: 'Los Angeles, USA',
      description: 'Enjoying the beach vibes!',
      postImage: '/path/to/post-image2.png', // Replace with actual post image path
      likes: 85,
      comments: 20,
    },
    {
        userImage: '/path/to/user2.png', // Replace with actual user image path
        userName: 'Jane Smith',
        userLocation: 'Los Angeles, USA',
        description: 'Enjoying the beach vibes!',
        postImage: '/path/to/post-image2.png', // Replace with actual post image path
        likes: 85,
        comments: 20,
      },
      {
        userImage: '/path/to/user2.png', // Replace with actual user image path
        userName: 'Jane Smith',
        userLocation: 'Los Angeles, USA',
        description: 'Enjoying the beach vibes!',
        postImage: '/path/to/post-image2.png', // Replace with actual post image path
        likes: 85,
        comments: 20,
      },
      {
        userImage: '/path/to/user2.png', // Replace with actual user image path
        userName: 'Jane Smith',
        userLocation: 'Los Angeles, USA',
        description: 'Enjoying the beach vibes!',
        postImage: '/path/to/post-image2.png', // Replace with actual post image path
        likes: 85,
        comments: 20,
      }
    // Add more posts as needed
  ];

  const [friendStatus, setFriendStatus] = useState(
    posts.reduce((acc, post) => {
      acc[post.userName] = true; // Set default friend status
      return acc;
    }, {})
  );

  const handleFriendAction = (userName) => {
    setFriendStatus((prev) => ({
      ...prev,
      [userName]: !prev[userName], // Toggle friend status for the specific user
    }));
  };

  return (
    <Box
      sx={{
        width: { xs: '90%', sm: '600px' },
        maxWidth: '600px',
        marginTop: '1rem',
        marginLeft: '40px',
      }}
    >
      {posts.map((post, index) => (
        <WidgetWrapper key={index} sx={{ marginBottom: '1rem' }}>
          {/* User Info Section */}
          <Box display="flex" alignItems="center" mb="1rem">
            <Avatar
              src={post.userImage}
              alt={post.userName}
              sx={{ width: '40px', height: '40px', marginRight: '0.5rem' }}
            />
            <Box flexGrow={1}>
              <Typography variant="h6" fontWeight="500">
                {post.userName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.userLocation}
              </Typography>
            </Box>
            {/* Add or Remove Friend Icon */}
            <IconButton onClick={() => handleFriendAction(post.userName)}>
              {friendStatus[post.userName] ? (
                <PersonRemoveOutlinedIcon color="primary" />
              ) : (
                <PersonAddOutlinedIcon color="primary" />
              )}
            </IconButton>
          </Box>

          {/* Description Section */}
          <Typography variant="body1" mb="1rem">
            {post.description}
          </Typography>

          {/* Post Image Section */}
          <img
            src={post.postImage}
            alt="Post"
            style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
          />

          {/* Likes and Comments Section */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
              <IconButton>
                <FavoriteBorderOutlined />
              </IconButton>
              <Typography variant="body2">{post.likes}</Typography>
              <IconButton>
                <ChatBubbleOutlineOutlinedIcon />
              </IconButton>
              <Typography variant="body2">{post.comments}</Typography>
            </Box>
            {/* Share Icon */}
            <IconButton>
              <ShareOutlined />
            </IconButton>
          </Box>
        </WidgetWrapper>
      ))}
    </Box>
  );
};

export default PostWidget;
