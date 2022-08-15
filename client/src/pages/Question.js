import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from 'api/Api';
import WaitingScreen from 'components/waitingScreen/WaitingScreen';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DoneIcon from '@mui/icons-material/Done';
import GppGoodIcon from '@mui/icons-material/GppGood';
import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
function Question() {
  const [questionData, setQuestionData] = useState(null);
  const isUserRoute = useParams();
  const insertQuestionRow = (
    avatar,
    name,
    question,
    any_reactions,
    good_reaction,
    solved_user,
    slack_channel_id,
    user_id
  ) => {
    return (
      <>
        <TableRow className='m-1 student-content'>
          <TableCell key='slack_display_name' className='rtl'>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginRight: '3rem',
                '@media (max-width: 1000px)': {
                  marginRight: '0',
                  flexDirection: 'column',
                },
              }}
            >
              <Avatar
                alt='Remy Sharp'
                src={
                  avatar ||
                  'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8='
                }
                className='ml-2'
              />
              {name}
            </Box>
          </TableCell>
          <TableCell key='question' sx={{ width: '50%' }}>
            {question}
          </TableCell>
          <TableCell
            key='any_reactions'
            sx={{
              '@media (max-width: 900px)': {
                display: 'none',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginRight: '3rem',
                '@media (max-width: 1000px)': {
                  marginRight: '0',
                  flexDirection: 'column',
                },
              }}
            >
              <p>{any_reactions}</p>
              <ThumbUpIcon sx={{ color: 'primary.blue' }} className='m-2' />
            </Box>
          </TableCell>
          <TableCell
            key='good_reactions'
            sx={{
              '@media (max-width: 900px)': {
                display: 'none',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginRight: '3rem',
                '@media (max-width: 1000px)': {
                  marginRight: '0',
                  flexDirection: 'column',
                },
              }}
            >
              <p>{good_reaction}</p>
              <DoneIcon color='secondary' className='m-2' />
            </Box>
          </TableCell>
          <TableCell key='solved_user'>
            {solved_user === user_id && good_reaction > 0 && (
              <GppGoodIcon color='secondary' className='m-2' />
            )}
          </TableCell>
          <TableCell key='channel'>{slack_channel_id}</TableCell>
        </TableRow>
      </>
    );
  };
  useEffect(() => {
    API.get(`question-thread/${isUserRoute.id}`)
      .then(({ data }) => {
        setQuestionData(data);
        console.log(data);
      })
      .catch((e) => console.log(e));
  }, [isUserRoute]);
  return (
    <>
      {!questionData ? (
        <WaitingScreen />
      ) : (
        <TableContainer sx={{ padding: '0 0.5rem' }}>
          <Table>
            <TableHead sx={{ background: 'lightgrey' }}>
              {insertQuestionRow(
                questionData.slack_user.image,
                questionData.slack_user.slack_display_name,
                questionData.text,
                questionData.any_reactions,
                questionData.good_reaction,
                questionData.solved_user,
                questionData.slack_channel_id,
                questionData.slack_user._id
              )}
            </TableHead>
            <TableBody>
              {questionData.answers_to_question.map((answer) => {
                return (
                  <React.Fragment key={answer._id}>
                    {insertQuestionRow(
                      answer.slack_user.image,
                      answer.slack_user.slack_display_name,
                      answer.text,
                      answer.any_reactions,
                      answer.good_reaction,
                      questionData.solved_user,
                      answer.slack_channel_id,
                      answer.slack_user._id
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default Question;
