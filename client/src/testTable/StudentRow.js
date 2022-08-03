import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import UserRating from 'components/raiting/raiting';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import QuizIcon from '@mui/icons-material/Quiz';
import Tooltip from '@mui/material/Tooltip';
import DoneIcon from '@mui/icons-material/Done';
import Circle from 'components/circle/circle';
import { TableCell, TableRow } from '@mui/material';
export default function StudentRow(props) {
  return (
    <TableRow className='d-flex m-1 student-content'>
      <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
      <TableCell className='item' style={{ paddingRight: '1rem' }}>
        {props.slack_display_name}
      </TableCell>

      <TableCell>
        <Tooltip title='שאלות' arrow>
          <div>
            <Circle color='secondary' value={props.questions} />
            <QuizIcon color='secondary' className='m-2' />
          </div>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title='לייקים' arrow>
          <div>
            <Circle color='primary' value={props.reactions} />
            <ThumbUpIcon color='primary' className='m-2' />
          </div>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title='תשובות שסומנו כנכונות' arrow>
          <div>
            <Circle color='success' value={props.right_answers} />
            <DoneIcon color='success' className='m-2' />
          </div>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip title='תשובות' arrow>
          <div>
            <Circle color='secondary' value={props.right_answers} />
            <QuestionAnswerIcon color='secondary' className='m-2' />
          </div>
        </Tooltip>
      </TableCell>
      <UserRating value={props.rating} />
    </TableRow>
  );
}
