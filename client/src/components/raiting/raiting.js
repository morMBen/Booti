import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  0.5: 'צעיר מת',
  1: 'צעיר',
  1.5: 'מתחיל להשתפשף',
  2: 'משתפר',
  2.5: 'סביר',
  3: 'סביר +',
  3.5: 'חביב',
  4: 'מתקדם',
  4.5: 'מקצוען',
  5: 'אלוף!!!',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function UserRating(props) {
 
  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        {...props}
        readOnly
        precision={0.5}
        getLabelText={getLabelText}                
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {props.value !== null && (
        <Box sx={{ m: 2 }}>{labels[props.value]}</Box>
      )}
    </Box>
  );
}
