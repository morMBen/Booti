import React, { useState } from 'react';
import { TableContainer, Table, TableBody } from '@mui/material';
import { getComparator, sortedRowInformation } from 'utils/sortTable';
import QuestionsTableHead from './QuestionsTableHead';
import QuestionRow from './QuestionRow';

function QuestionsTableContent({ data }) {
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
        <QuestionsTableHead
          orderDirection={orderDirection}
          valueToOrderBy={valueToOrderBy}
          handleRequestSort={handleRequestSort}
        ></QuestionsTableHead>
        <TableBody>
          {sortedRowInformation(data, getComparator(orderDirection, valueToOrderBy)).map(
            (question, index) => {
              return <QuestionRow {...question} key={question.message_id} />;
            }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default QuestionsTableContent;
