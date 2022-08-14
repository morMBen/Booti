import { TableCell, TableRow, TableHead, TableSortLabel } from '@mui/material';
import React from 'react';

function QuestionsTableHead({ valueToOrderBy, orderDirection, handleRequestSort }) {
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow className='m-1 student-content'>
        <TableCell key='slack_display_name' className='rtl'>
          <TableSortLabel
            active={valueToOrderBy === 'slack_display_name'}
            direction={valueToOrderBy === 'slack_display_name' ? orderDirection : 'asc'}
            onClick={createSortHandler('slack_display_name')}
            className='direction-rtl align-right'
          >
            שם
          </TableSortLabel>
        </TableCell>
        <TableCell key='question'>
          <TableSortLabel
            active={valueToOrderBy === 'question'}
            direction={valueToOrderBy === 'question' ? orderDirection : 'asc'}
            onClick={createSortHandler('question')}
          >
            שאלה
          </TableSortLabel>
        </TableCell>
        <TableCell
          key='answers'
          sx={{
            '@media (max-width: 750px)': {
              display: 'none',
            },
          }}
        >
          <TableSortLabel
            active={valueToOrderBy === 'answers_to_question'}
            direction={valueToOrderBy === 'answers_to_question' ? orderDirection : 'asc'}
            onClick={createSortHandler('answers_to_question')}
          >
            תשובות
          </TableSortLabel>
        </TableCell>
        <TableCell
          key='any_reactions'
          sx={{
            '@media (max-width: 900px)': {
              display: 'none',
            },
          }}
        >
          <TableSortLabel
            active={valueToOrderBy === 'thread_any_reactions'}
            direction={valueToOrderBy === 'thread_any_reactions' ? orderDirection : 'asc'}
            onClick={createSortHandler('thread_any_reactions')}
          >
            יחס
          </TableSortLabel>
        </TableCell>
        <TableCell
          key='reactions'
          sx={{
            '@media (max-width: 630px)': {
              display: 'none',
            },
          }}
        >
          <TableSortLabel
            active={valueToOrderBy === 'thread_good_reactions'}
            direction={valueToOrderBy === 'thread_good_reactions' ? orderDirection : 'asc'}
            onClick={createSortHandler('thread_good_reactions')}
          >
            נעזרו
          </TableSortLabel>
        </TableCell>

        <TableCell
          key='right_answer'
          sx={{
            '@media (max-width: 425px)': {
              display: 'none',
            },
          }}
        >
          <TableSortLabel
            active={valueToOrderBy === 'solved_user'}
            direction={valueToOrderBy === 'solved_user' ? orderDirection : 'asc'}
            onClick={createSortHandler('solved_user')}
          >
            יש פתרון
          </TableSortLabel>
        </TableCell>
        <TableCell key='channel'>
          <TableSortLabel
            active={valueToOrderBy === 'channel'}
            direction={valueToOrderBy === 'channel' ? orderDirection : 'asc'}
            onClick={createSortHandler('channel')}
          >
            נושא
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default QuestionsTableHead;
