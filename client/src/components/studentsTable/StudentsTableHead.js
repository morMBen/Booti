import { TableCell, TableRow, TableHead, TableSortLabel } from '@mui/material';
import React from 'react';

function StudentsTableHead({ valueToOrderBy, orderDirection, handleRequestSort }) {
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
        <TableCell
          key='questions'
          sx={{
            '@media (max-width: 750px)': {
              display: 'none',
            },
          }}
        >
          <TableSortLabel
            active={valueToOrderBy === 'questions'}
            direction={valueToOrderBy === 'questions' ? orderDirection : 'asc'}
            onClick={createSortHandler('questions')}
          >
            שאלות
          </TableSortLabel>
        </TableCell>
        <TableCell
          key='answers'
          sx={{
            '@media (max-width: 630px)': {
              display: 'none',
            },
          }}
        >
          <TableSortLabel
            active={valueToOrderBy === 'answers'}
            direction={valueToOrderBy === 'answers' ? orderDirection : 'asc'}
            onClick={createSortHandler('answers')}
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
            active={valueToOrderBy === 'any_reactions'}
            direction={valueToOrderBy === 'any_reactions' ? orderDirection : 'asc'}
            onClick={createSortHandler('any_reactions')}
          >
            יחס
          </TableSortLabel>
        </TableCell>
        <TableCell key='reactions'>
          <TableSortLabel
            active={valueToOrderBy === 'reactions'}
            direction={valueToOrderBy === 'reactions' ? orderDirection : 'asc'}
            onClick={createSortHandler('reactions')}
          >
            פתרונות
          </TableSortLabel>
        </TableCell>

        <TableCell
          key='right_answers'
          sx={{
            '@media (max-width: 425px)': {
              display: 'none',
            },
          }}
        >
          <TableSortLabel
            active={valueToOrderBy === 'right_answers'}
            direction={valueToOrderBy === 'right_answers' ? orderDirection : 'asc'}
            onClick={createSortHandler('right_answers')}
          >
            פתרונות מאומתים
          </TableSortLabel>
        </TableCell>
        <TableCell key='rating'>
          <TableSortLabel
            active={valueToOrderBy === 'rating'}
            direction={valueToOrderBy === 'rating' ? orderDirection : 'asc'}
            onClick={createSortHandler('rating')}
          >
            רמה
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default StudentsTableHead;
