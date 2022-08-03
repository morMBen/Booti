import React, { Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

export default function Students({ data, ...props }) {
  return (
    <List>
      {data.map((student, index) => (
        <Fragment key={student.slack_user_id}>
          <ListItem alignItems='flex-start'>
            <>{props.render(student)}</>
          </ListItem>
          <Divider variant='inset' component='li' />
        </Fragment>
      ))}
    </List>
  );
}
