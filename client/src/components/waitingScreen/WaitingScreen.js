import { Box } from '@mui/material';
import React from 'react';

function WaitingScreen() {
  return (
    <Box
      sx={{
        top: 0,
        position: 'absolute',
        height: '100vh',
        width: '100%',
        bgcolor: 'primary.main',
        opacity: 0.9,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src='https://static.wixstatic.com/media/5bd04f_9fec7b63820f4b5ca236ce4d9e08eb3a~mv2.png/v1/fill/w_164,h_60,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Appleseeds_LOGO_3_Hebrew_4x.png'
        alt='white appleseeds logo'
      />
    </Box>
  );
}

export default WaitingScreen;
