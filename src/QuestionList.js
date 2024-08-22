//correctOption is 0 based
//take user clicked 1 based
export default function QuestionList({
  question,
  dispatch,
  answer,
  currQuestion,
  totalQuestion,
}) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div>
        <h4 style={{ fontSize: "2rem", marginBottom: "3rem" }}>
          {question.question}
        </h4>
        <div className="options">
          {Array.from({ length: 4 }, (_, i) => i).map((curr) => (
            <button
              className={`btn btn--animation ${
                answer
                  ? question.correctOption === curr
                    ? "correct"
                    : "wrong"
                  : ""
              } ${curr === answer - 1 ? "clicked" : ""}`}
              onClick={() =>
                dispatch({ type: "userClicked", payload: curr + 1 })
              }
              disabled={Boolean(answer)}
            >
              {question.options[curr]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
