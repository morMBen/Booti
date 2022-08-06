import * as React from 'react';
import Avatar from '@mui/material/Avatar';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Tooltip from '@mui/material/Tooltip';
import DoneIcon from '@mui/icons-material/Done';
import Circle from 'components/circle/circle';
import { Box, TableCell, TableRow } from '@mui/material';
import GppGoodIcon from '@mui/icons-material/GppGood';
import GppBadIcon from '@mui/icons-material/GppBad';

export default function QuestionRow(props) {
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
              props.slack_user.image ||
              'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8='
            }
            className='ml-2'
          />
          {props.slack_user.slack_display_name}
        </Box>
      </TableCell>
      <Tooltip
        title={props.question}
        arrow
        sx={{
          '@media (max-width: 750px)': {
            display: 'none',
          },
        }}
      >
        <TableCell>
          <>{props.question.length > 15 ? props.question.slice(0, 15) + '...' : props.question}</>
        </TableCell>
      </Tooltip>
      <Tooltip title='תשובות' arrow>
        <TableCell>
          <>
            <Circle
              sx={{ color: 'primary.light' }}
              value={Number(props.answers_to_question.length)}
            />
            <QuestionAnswerIcon sx={{ color: 'primary.light' }} className='m-2' />
          </>
        </TableCell>
      </Tooltip>
      <Tooltip
        title="כל סוגי האימוג'ים לשאלה או לתשובות שלה"
        arrow
        sx={{
          '@media (max-width: 900px)': {
            display: 'none',
          },
        }}
      >
        <TableCell>
          <>
            <Circle sx={{ color: 'primary.blue' }} value={Number(props.thread_any_reactions)} />
            <ThumbUpIcon sx={{ color: 'primary.blue' }} className='m-2' />
          </>
        </TableCell>
      </Tooltip>
      <Tooltip
        title='מספר האנשים שנעזרו בשאלה או באחת התשובות שלה'
        arrow
        sx={{
          '@media (max-width: 630px)': {
            display: 'none',
          },
        }}
      >
        <TableCell>
          <>
            <Circle color='secondary' value={Number(props.thread_good_reactions)} />
            <DoneIcon color='secondary' className='m-2' />
          </>
        </TableCell>
      </Tooltip>
      <Tooltip
        title='הבעיה של שואל השאלה נפתרה על ידי אחת התשובות'
        arrow
        sx={{
          '@media (max-width: 425px)': {
            display: 'none',
          },
        }}
      >
        <TableCell>
          <>
            <p>{props.solved_user}</p>
            {props.solved_user === 'כן' ? (
              <GppGoodIcon color='success' className='m-2' />
            ) : (
              <GppBadIcon color='error' className='m-2' />
            )}
          </>
        </TableCell>
      </Tooltip>
      <TableCell>{props.slack_channel_id}</TableCell>
    </TableRow>
  );
}
