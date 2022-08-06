import API from 'api/Api';
import QuestionsTableContent from 'components/quastionsTable/QuestionsTableContent';
import WaitingScreen from 'components/waitingScreen/WaitingScreen';
import React, { useEffect, useState } from 'react';

function Questions() {
  const [questions, setQuestions] = useState(null);
  useEffect(() => {
    API.get('/questions').then((res) => {
      const data = res.data.map((d) => {
        return {
          message_id: d._id,
          slack_display_name: d.slack_user.slack_display_name,
          slack_user_id: d.slack_user._id,
          image: d.slack_user.image,
          slack_user: d.slack_user,
          question: d.text,
          thread_good_reactions: d.thread_good_reactions,
          thread_any_reactions: d.thread_any_reactions,
          isParent: d.slack_parent ? true : false,
          slack_message_id: d.slack_message_id,
          slack_channel_id: d.slack_channel_id,
          answers_to_question: d.answers_to_question,
          time_stamp: d.slack_message_id,
          solved_user: d.solved_user ? 'כן' : 'לא',
        };
      });
      console.log(data);
      setQuestions(data);
    });
  }, []);
  return (
    <>
      {questions && <QuestionsTableContent data={questions} />}
      {!questions && <WaitingScreen />}
    </>
  );
}

export default Questions;
