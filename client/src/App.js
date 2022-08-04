import './App.css';
import React from 'react';
import Header from 'components/header/header';
import API from 'api/Api';
import TableContent from 'components/studentsTable/TableContent';
import WaitingScreen from 'components/waitingScreen/WaitingScreen';
import { createTheme, ThemeProvider } from '@mui/material';
import { deepOrange, green, lightBlue, teal, lime } from '@mui/material/colors';

const customTheme = createTheme({
  palette: {
    // @ts-ignore
    primary: { main: '#510F93', dark: '#28074A', light: '#D4DEFF', blue: '#007FFF' },
    secondary: teal,
    error: deepOrange,
    warning: lime,
    info: lightBlue,
    success: green,
  },
});

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
      console.log(res);
      setUsers(res.data);
    });
  }, []);
  return (
    <ThemeProvider theme={customTheme}>
      <div className='App'>
        <Header />
        {users && <TableContent data={users} />}
        {!users && <WaitingScreen />}
      </div>
    </ThemeProvider>
  );
}

export default App;
