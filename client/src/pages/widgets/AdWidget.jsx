import React from 'react';
import { Box, Typography, Divider, useTheme, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import FlexBetween from '../../components/FlexBetween';
import WidgetWrapper from '../../components/WidgetWrapper';
import adImage1 from '../../assets/1f261140-fef4-4da2-a070-62375835c7c0_1024.jpeg';
import adImage2 from '../../assets/paper-art-renewable-energy-with-green-energy-such-as-wind-turbines-renewable-energy-by-2050-carbon-neutral-energy-energy-consumption-co2-reduce-co2-emission-concept-generate-ai_57.jpg'
import adImage3 from '../../assets/shutterstock_2286807935-scaled.jpg'

const advertise = [
//   {
//     id: 1,
//     companyName: "Tech Innovators Inc.",
//     website: "www.techinnovators.com",
//     description: "Leading the industry with cutting-edge technology solutions that empower businesses worldwide.",
//     imageUrl: adImage3
//   },
  {
    id: 2,
    companyName: "Green Energy Co.",
    website: "www.greenenergyco.com",
    description: "Delivering sustainable and renewable energy solutions to power a greener future.",
    imageUrl: adImage2
  },
  {
    id: 3,
    companyName: "Urban Styles",
    website: "www.urbanstyles.com",
    description: "Fashion-forward clothing for the urban lifestyle, blending comfort and trendsetting designs.",
    imageUrl: adImage1
  }
];

const AdWidget = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      {advertise.map((ad) => (
        <WidgetWrapper
          key={ad.id}
          sx={{
            width: { xs: '90%', sm: '300px', md: '400px' },
            maxWidth: '500px',
            marginTop: '1rem',
            marginLeft: '40px',
            marginRight: 'auto',
          }}
        >
          {/* Top Section: Sponsored and Create Ad */}
          <FlexBetween>
            <Typography fontSize="0.85rem" color={theme.palette.text.secondary}>
              Sponsored
            </Typography>
            <IconButton onClick={() => navigate('/create-ad')} sx={{ color: theme.palette.primary.main }}>
              <Typography ml="0.5rem" fontSize="0.85rem" color={theme.palette.text.secondary}>
                Create Ad
              </Typography>
            </IconButton>
          </FlexBetween>

          <Divider sx={{ margin: '1rem 0' }} />

          {/* Middle Section: Ad Image */}
          <Box
            component="img"
            src={ad.imageUrl}  // Replace with your ad image path
            alt="Advertisement"
            sx={{
              width: '100%',
              height: '150px',
              objectFit: 'cover',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
            }}
          />

          {/* Bottom Section: Ad Details */}
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
              <Typography variant="h6" fontWeight="500" color={theme.palette.text.primary}>
                {ad.companyName}
              </Typography>
              <Typography color={theme.palette.primary.main} fontSize="0.85rem">
                {ad.website}
              </Typography>
            </Box>

            <Typography color={theme.palette.text.secondary} fontSize="0.9rem" mt="0.5rem">
              {ad.description}
            </Typography>
          </Box>
        </WidgetWrapper>
      ))}
    </>
  );
};

export default AdWidget;
