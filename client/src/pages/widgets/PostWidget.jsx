import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import WidgetWrapper from '../../components/WidgetWrapper'; // Adjust the path as necessary
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlined from '@mui/icons-material/ShareOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../state';

const PostWidget = ({userId,isProfile = false}) => {

  const dispatch = useDispatch();
  const posts = useSelector((state)=>state.posts);
  const token = useSelector((state)=>state.token);

  const getPosts = async () =>{
    const response = await fetch(`http://localhost:3000/posts`,{
      method:"GET",
      headers:{
        Authorization: `Bearer ${token}`
      },
      
    });
    const data = await response.json();
    dispatch(setPosts({posts:data}));
  }

  const getUserPosts = async () =>{
    const response = await fetch(`http://localhost:3000/posts/${userId}/posts`,{
      method:"GET",
      headers:{
        Authorization: `Bearer ${token}`
      }
      });
      const data = await response.json();
      dispatch(setPosts({posts:data}));
  }

  useEffect(() => {
    if(isProfile){
      getUserPosts();       
    }else{
      getPosts();
    }
  }, []);
  
  const [friendStatus, setFriendStatus] = useState(
    posts.reduce((acc, post) => {
      acc[post.userName] = true; // Set default friend status
      return acc;
    }, {})
  );

  const handleFriendAction = (userName) => {
    setFriendStatus((prev) => ({
      ...prev,
      [userName]: !prev[userName], 
    }));
  };

  return (
    <Box
      sx={{
        width: { xs: '90%', sm: '600px' },
        maxWidth: '450px',
        marginTop: '1rem',
        marginLeft: '40px',
      }}
    >
      {posts.map((post) => (
  <WidgetWrapper key={post._id} sx={{ marginBottom: '1rem' }}>
    {/* User Info Section */}
    <Box display="flex" alignItems="center" mb="1rem">
      <Avatar
        src={post.userPicturePath} // Assuming this holds the user's avatar path
        alt={`${post.firstName} ${post.lastName}`}
        sx={{ width: '40px', height: '40px', marginRight: '0.5rem' }}
      />
      <Box flexGrow={1}>
        <Typography variant="h6" fontWeight="500">
          {`${post.firstName} ${post.lastName}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.location}
        </Typography>
      </Box>
      {/* Add or Remove Friend Icon */}
      <IconButton onClick={() => handleFriendAction(post.userId)}>
        {friendStatus[post.userId] ? (
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
      src={`http://localhost:3000/assets/${post.picturePath}`}
      alt="Post"
      style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
    />

    {/* Likes and Comments Section */}
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" alignItems="center">
        <IconButton>
          <FavoriteBorderOutlined />
        </IconButton>
        <Typography variant="body2">{Object.keys(post.likes || {}).length}</Typography>
        <IconButton>
          <ChatBubbleOutlineOutlinedIcon />
        </IconButton>
        <Typography variant="body2">{post.comments.length}</Typography>
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
