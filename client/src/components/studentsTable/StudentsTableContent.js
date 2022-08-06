import React, { useState } from 'react';
import { TableContainer, Table, TableBody } from '@mui/material';
import TableHeading from './StudentsTableHead';
import StudentRow from './StudentRow';
import { getComparator, sortedRowInformation } from 'utils/sortTable';

function StudentsTableContent({ data }) {
  const [orderDirection, setOrderDirection] = useState('desc');
  const [valueToOrderBy, setValueToOrderBy] = useState('rating');
  //   const [page, setPage] = useState(0);
  //   const [rowsPerPage, setRowsPerPage] = useState(1);

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === 'asc';

    setValueToOrderBy(property);
    setOrderDirection(isAscending ? 'desc' : 'asc');
  };

  return (
    <TableContainer sx={{ padding: '0 0.5rem' }}>
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
                <StudentRow
                  key={person.slack_user_id}
                  questions={person.questions}
                  answers={person.answers}
                  reactions={person.reactions}
                  right_answers={person.right_answers}
                  rating={person.rating}
                  slack_display_name={person.slack_display_name}
                  any_reactions={person.any_reactions}
                  image={person.image}
                />
              );
            }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StudentsTableContent;
