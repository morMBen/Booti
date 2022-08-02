import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

export default function Students({ data, ...props }) {
  return (
    <List>
      {data.map((student) => (
        <>
          <ListItem key={student.slack_user_id} alignItems='flex-start'>
            <>{props.render(student)}</>
          </ListItem>
          <Divider variant='inset' component='li' />
        </>
      ))}
    </List>
  );
}
