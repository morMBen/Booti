import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import UserRating from 'components/raiting/raiting';
import Circle from '../circle/circle';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import QuizIcon from '@mui/icons-material/Quiz';
import Tooltip from '@mui/material/Tooltip';
import DoneIcon from '@mui/icons-material/Done';
import GppGoodIcon from '@mui/icons-material/GppGood';
export default function Student(props) {
  return (
    <div className='m-1 student-content'>
      <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
      <div className='item' style={{ paddingRight: '1rem' }}>
        {props.slack_display_name}
      </div>
      <div>
        <Tooltip title='שאלות' arrow>
          <div>
            <Circle color='secondary' value={props.questions} />
            <QuizIcon color='secondary' className='m-2' />
          </div>
        </Tooltip>
      </div>
      <div>
        <Tooltip title='לייקים' arrow>
          <div>
            <Circle color='primary' value={props.reactions} />
            <ThumbUpIcon color='primary' className='m-2' />
          </div>
        </Tooltip>
      </div>
      <div>
        <Tooltip title='תשובות שסומנו כנכונות' arrow>
          <div>
            <Circle color='success' value={props.right_answers} />
            <DoneIcon color='success' className='m-2' />
          </div>
        </Tooltip>
      </div>
      <div>
        <Tooltip title='תשובות' arrow>
          <div>
            <Circle color='secondary' value={props.right_answers} />
            <QuestionAnswerIcon color='secondary' className='m-2' />
          </div>
        </Tooltip>
      </div>
      <UserRating value={props.rating} />
    </div>
  );
}
