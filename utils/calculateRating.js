const calculateRating = (scores) => {
  const { questions, answers, right_answers, reactions, any_reactions } = scores;
  let score = 0;
  score += questions * 10;
  score += answers * 7;
  score += (any_reactions - reactions) * 2;
  score += right_answers * 25;
  score += (reactions - right_answers) * 10;

  let rating = 0;
  switch (true) {
    case score >= 4860:
      rating = 5;
      break;
    case score >= 4320:
      rating = 4.5;
      break;
    case score >= 3780:
      rating = 4;
      break;
    case score >= 3240:
      rating = 3.5;
      break;
    case score >= 2700:
      rating = 3;
      break;
    case score >= 2160:
      rating = 2.5;
      break;
    case score >= 1620:
      rating = 2;
      break;
    case score >= 1080:
      rating = 1.5;
      break;
    case score >= 540:
      rating = 1;
      break;
    case score >= 20:
      rating = 0.5;
      break;
  }
  return { rating, score };
};
module.exports = calculateRating;
