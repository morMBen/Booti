import React, { useState } from 'react';
import {
  TableCell,
  TableRow,
  TableHead,
  TableSortLabel,
  TableContainer,
  Table,
  TableBody,
} from '@mui/material';
import TableHeading from './TableHead';
import StudentRow from './StudentRow';

const data = [
  {
    slack_user_id: 'dffda',
    slack_display_name: 'אליהו רחמים',
    questions: 30,
    answers: 20,
    right_answers: 10,
    reactions: 60,
    rating: 5,
  },
  {
    slack_user_id: 'vg3454rf',
    slack_display_name: 'משה בוזגלו',
    questions: 5,
    answers: 0,
    right_answers: 0,
    reactions: 3,
    rating: 1,
  },
  {
    slack_user_id: 'vg34srR',
    slack_display_name: 'ישראל ישראלי',
    questions: 8,
    answers: 3,
    right_answers: 1,
    reactions: 9,
    rating: 2,
  },
];
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const sortedRowInformation = (rowArr, comparator) => {
  const stabilizedRowArr = rowArr.map((el, index) => [el, index]);
  stabilizedRowArr.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedRowArr.map((el) => el[0]);
};

function TableContent() {
  const [orderDirection, setOrderDirection] = useState('asc');
  const [valueToOrderBy, setValueToOrderBy] = useState('name');
  //   const [page, setPage] = useState(0);
  //   const [rowsPerPage, setRowsPerPage] = useState(1);

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === 'asc';

    setValueToOrderBy(property);
    setOrderDirection(isAscending ? 'desc' : 'asc');
  };

  return (
    <TableContainer>
      <Table>
        <TableHeading
          orderDirection={orderDirection}
          valueToOrderBy={valueToOrderBy}
          handleRequestSort={handleRequestSort}
        ></TableHeading>
        <TableBody>
          {sortedRowInformation(data, getComparator(orderDirection, valueToOrderBy)).map(
            (person, index) => {
              return (
                // <TableRow key={index}>
                //   <TableCell>{person.slack_display_name}</TableCell>
                //   <TableCell>{person.questions}</TableCell>
                //   <TableCell>{person.answers}</TableCell>
                //   <TableCell>{person.reactions}</TableCell>
                //   <TableCell>{person.right_answers}</TableCell>
                //   <TableCell>{person.rating}</TableCell>
                // </TableRow>
                <StudentRow
                  questions={person.questions}
                  answers={person.answers}
                  reactions={person.reactions}
                  right_answers={person.right_answers}
                  rating={person.rating}
                  slack_display_name={person.slack_display_name}
                />
              );
            }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableContent;
