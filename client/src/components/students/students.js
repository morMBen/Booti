import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import HoverRating from 'components/raiting/raiting';
import Circle from '../circle/circle';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import QuizIcon from '@mui/icons-material/Quiz';
import { useEffect } from 'react';

export default function Students({ data, ...props }) {
  return (
    <List>
      {data.map((student) => (
        <ListItem key={student.slack_user_id} alignItems='flex-start'>
          <>{props.render(student)}</>
        </ListItem>
      ))}
      <Divider variant='inset' component='li' />
    </List>
  );
}
