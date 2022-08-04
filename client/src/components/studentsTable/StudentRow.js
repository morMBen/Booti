import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import UserRating from 'components/raiting/raiting';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import QuizIcon from '@mui/icons-material/Quiz';
import Tooltip from '@mui/material/Tooltip';
import DoneIcon from '@mui/icons-material/Done';
import Circle from 'components/circle/circle';
import { Box, TableCell, TableRow } from '@mui/material';
import GppGoodIcon from '@mui/icons-material/GppGood';

export default function StudentRow(props) {
  return (
    <TableRow className='m-1 student-content'>
      <TableCell className='item' style={{ paddingRight: '0rem' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginRight: '3rem',
            '@media (max-width: 1000px)': {
              marginRight: '0',
              flexDirection: 'column',
            },
          }}
        >
          <Avatar
            alt='Remy Sharp'
            src={
              props.image ||
              'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8='
            }
            className='ml-2'
          />
          {props.slack_display_name}
        </Box>
      </TableCell>
      <Tooltip
        title='שאלות'
        arrow
        sx={{
          '@media (max-width: 750px)': {
            display: 'none',
          },
        }}
      >
        <TableCell>
          <>
            <Circle sx={{ color: 'primary.dark' }} value={props.questions} />
            <QuizIcon sx={{ color: 'primary.dark' }} className='m-2' />
          </>
        </TableCell>
      </Tooltip>
      <Tooltip
        title='תשובות'
        arrow
        sx={{
          '@media (max-width: 630px)': {
            display: 'none',
          },
        }}
      >
        <TableCell>
          <>
            <Circle sx={{ color: 'primary.light' }} value={props.right_answers} />
            <QuestionAnswerIcon sx={{ color: 'primary.light' }} className='m-2' />
          </>
        </TableCell>
      </Tooltip>
      <Tooltip
        title="כל סוגי האימוג'ים"
        arrow
        sx={{
          '@media (max-width: 900px)': {
            display: 'none',
          },
        }}
      >
        <TableCell>
          <>
            <Circle sx={{ color: 'primary.blue' }} value={props.any_reactions} />
            <ThumbUpIcon sx={{ color: 'primary.blue' }} className='m-2' />
          </>
        </TableCell>
      </Tooltip>
      <Tooltip title='פתר את הבעיה, אך לא לשואל השאלה.' arrow>
        <TableCell>
          <>
            <Circle color='secondary' value={props.reactions} />
            <DoneIcon color='secondary' className='m-2' />
          </>
        </TableCell>
      </Tooltip>
      <Tooltip
        title='פתר את הבעיה לשואל השאלה.'
        arrow
        sx={{
          '@media (max-width: 425px)': {
            display: 'none',
          },
        }}
      >
        <TableCell>
          <>
            <Circle color='success' value={props.right_answers} />
            <GppGoodIcon color='success' className='m-2' />
          </>
        </TableCell>
      </Tooltip>
      <TableCell>
        <UserRating value={props.rating} />
      </TableCell>
    </TableRow>
  );
}
