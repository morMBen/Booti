import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from 'api/Api';
function Question() {
  const isUserRoute = useParams();
  const getData = async () => {
    const { data } = await API.get(`question-thread/${isUserRoute.id}`);
    console.log(data);
  };
  useEffect(() => {
    getData();
    // console.log(data);
  }, [isUserRoute]);
  return <div>Question</div>;
}

export default Question;
