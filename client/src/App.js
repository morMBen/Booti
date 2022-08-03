import './App.css';
import React from 'react';
import Students from 'components/students/students';
import Header from 'components/header/header';
import { Container } from '@mui/material';
import Student from 'components/students/Student';
import API from 'api/Api';
import MuiResponsiveness from 'MuiResponsiveness/MuiResponsiveness';
import Appi from 'testTable/Appi';

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

function App() {
  const [users, setUsers] = React.useState(null);
  React.useEffect(() => {
    API.get('/users').then((res) => {
      setUsers(res.data);
    });
  }, []);
  return (
    <div className='App'>
      {/* <Appi /> */}
      <Header />
      <Container maxWidth='xl'>
        {users && (
          <Students
            data={users}
            render={(student) => {
              return <Student {...student} />;
            }}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
