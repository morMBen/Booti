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
          <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' className='ml-2' />
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
            <Circle color='secondary' value={props.questions} />
            <QuizIcon color='secondary' className='m-2' />
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
            <Circle color='secondary' value={props.right_answers} />
            <QuestionAnswerIcon color='secondary' className='m-2' />
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
            <Circle color='primary' value={props.any_reactions} />
            <ThumbUpIcon color='primary' className='m-2' />
          </>
        </TableCell>
      </Tooltip>
      <Tooltip title='פתר את הבעיה, אך לא לשואל השאלה.' arrow>
        <TableCell>
          <>
            <Circle color='success' value={props.reactions} />
            <DoneIcon color='success' className='m-2' />
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
