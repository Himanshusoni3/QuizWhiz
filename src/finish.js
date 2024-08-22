export default function Finish({ points, totalPoints, dispatch, highScore }) {
  return (
    <div className="finish">
      <p>
        You Scored {points} out of {totalPoints}
      </p>
      <p>(High Score: {highScore} Points)</p>
      <button onClick={() => dispatch({ type: "restart" })} className="btn">
        Restart Quiz
      </button>
    </div>
  );
}
