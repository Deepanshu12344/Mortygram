import React, { useEffect } from 'react';
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material';
import { Box, Typography, Divider, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import UserImage from '../../components/UserImage';
import FlexBetween from '../../components/FlexBetween';
import WidgetWrapper from '../../components/WidgetWrapper';
import { useSelector } from 'react-redux';

const UserSection = () => {
  const {user} = useSelector((state)=>state);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally, fetch user data from an API here if needed
  }, []);

  return (
    <WidgetWrapper
      sx={{
        width: { xs: '90%', sm: '300px' },
        maxWidth: '300px',
        marginTop: '1rem',
        marginLeft: '40px',
        marginRight: 'auto',
        // boxShadow: 3,    
      }}
    >
      {/* Top Section */}
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserImage onClick={()=>navigate(`/profile/${user._id}`)} image={user.picturePath} size="60px" />
          <Box>
            <Typography variant="h6" fontWeight="500" color={theme.palette.text.primary}>
              {user.firstname} {user.lastname}
            </Typography>
            <Typography color={theme.palette.text.secondary} fontSize="0.85rem">
              {user.occupation}
            </Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined
          onClick={() => navigate('/settings')}
          style={{ cursor: 'pointer', color: theme.palette.text.secondary }}
        />
      </FlexBetween>

      <Divider sx={{ margin: '1rem 0' }} />

      {/* Middle Section with Location and Work */}
      <Box display="flex" flexDirection="column" gap="0.5rem" mb="1rem">
        <FlexBetween>
          <LocationOnOutlined sx={{ color: theme.palette.primary.main }} />
          <Typography color={theme.palette.text.secondary} fontSize="0.9rem">
            {user.location}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <WorkOutlineOutlined sx={{ color: theme.palette.primary.main }} />
          <Typography color={theme.palette.text.secondary} fontSize="0.9rem">
            {user.occupation}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider sx={{ margin: '1rem 0' }} />

      {/* Bottom Section with Edit Profile */}
      <FlexBetween>
        <Box>
          <Typography color={theme.palette.text.primary} fontWeight="500">
            Edit Profile
          </Typography>
          <Typography color={theme.palette.text.secondary} fontSize="0.8rem">
            Update your personal information
          </Typography>
        </Box>
        <EditOutlined
          onClick={() => navigate('/edit-profile')}
          style={{ cursor: 'pointer', color: theme.palette.primary.main }}
        />
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default UserSection;
