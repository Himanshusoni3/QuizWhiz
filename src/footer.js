import Timer from "./Timer";

export default function Footer({
  dispatch,
  answer,
  currQuestion,
  totalQuestion,
}) {
  return (
    <footer style={{ display: "flex", justifyContent: "space-between" }}>
      <Timer dispatch={dispatch} />
      {answer && (
        <button
          className="btn"
          onClick={() =>
            currQuestion === totalQuestion
              ? dispatch({ type: "finishQuiz" })
              : dispatch({ type: "nextQuestion" })
          }
        >
          {currQuestion === totalQuestion ? "Finish" : "Next"}
        </button>
      )}
    </footer>
  );
}
