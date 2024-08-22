export default function Progress({
  totalQuestions,
  currQuestion,
  totalPoints,
  points,
}) {
  return (
    <div className="progress">
      <progress max={totalQuestions} value={currQuestion - 1}></progress>
      <p>
        Question {currQuestion} / {totalQuestions}
      </p>
      <p>
        {points} / {totalPoints}
      </p>
    </div>
  );
}
