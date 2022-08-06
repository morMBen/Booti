import API from 'api/Api';
import TableContent from 'components/studentsTable/StudentsTableContent';
import WaitingScreen from 'components/waitingScreen/WaitingScreen';
import React, { useEffect } from 'react';

function Students() {
  const [users, setUsers] = React.useState(null);
  useEffect(() => {
    API.get('/users').then((res) => {
      console.log(res);
      setUsers(res.data);
    });
  }, []);
  return (
    <>
      {users && <TableContent data={users} />}
      {!users && <WaitingScreen />}
    </>
  );
}

export default Students;
