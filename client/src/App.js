import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Header from 'components/header/header';
import { createTheme, ThemeProvider } from '@mui/material';
import { deepOrange, green, lightBlue, teal, lime } from '@mui/material/colors';
import Students from 'pages/Students';
import Questions from 'pages/Questions';

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

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <div className='App'>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Students />} />
            <Route path='/questions' element={<Questions />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
