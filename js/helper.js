// splice to add correct answer instead of random number as index
const formatData = (questionData) => {
  const result = questionData.map((item) => {
    const questionObject = { question: item.question };
    const answers = [...item.incorrect_answers];
    const correctAnswers = Math.floor(Math.random() * 4);
    answers.splice(correctAnswers, 0, item.correct_answer);
    questionObject.answer = answers;
    questionObject.correctAnswers = correctAnswers;
    return questionObject;
  });
  return result;
};

export default formatData;
