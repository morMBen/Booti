import { TableCell, TableRow, TableHead, TableBody, TableSortLabel } from '@mui/material';
import React from 'react';

function TableHeading({ valueToOrderBy, orderDirection, handleRequestSort }) {
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell key='slack_display_name'>
            <TableSortLabel
              active={valueToOrderBy === 'slack_display_name'}
              direction={valueToOrderBy === 'slack_display_name' ? orderDirection : 'asc'}
              onClick={createSortHandler('slack_display_name')}
            >
              Name
            </TableSortLabel>
          </TableCell>
          <TableCell key='questions'>
            <TableSortLabel
              active={valueToOrderBy === 'questions'}
              direction={valueToOrderBy === 'questions' ? orderDirection : 'asc'}
              onClick={createSortHandler('questions')}
            >
              Questions
            </TableSortLabel>
          </TableCell>
          <TableCell key='answers'>
            <TableSortLabel
              active={valueToOrderBy === 'answers'}
              direction={valueToOrderBy === 'answers' ? orderDirection : 'asc'}
              onClick={createSortHandler('answers')}
            >
              Answers
            </TableSortLabel>
          </TableCell>
          <TableCell key='reactions'>
            <TableSortLabel
              active={valueToOrderBy === 'reactions'}
              direction={valueToOrderBy === 'reactions' ? orderDirection : 'asc'}
              onClick={createSortHandler('reactions')}
            >
              Reactions
            </TableSortLabel>
          </TableCell>
          <TableCell key='right_answers'>
            <TableSortLabel
              active={valueToOrderBy === 'right_answers'}
              direction={valueToOrderBy === 'right_answers' ? orderDirection : 'asc'}
              onClick={createSortHandler('right_answers')}
            >
              Right Answers
            </TableSortLabel>
          </TableCell>
          <TableCell key='rating'>
            <TableSortLabel
              active={valueToOrderBy === 'rating'}
              direction={valueToOrderBy === 'rating' ? orderDirection : 'asc'}
              onClick={createSortHandler('rating')}
            >
              Rating
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  );
}

export default TableHeading;
