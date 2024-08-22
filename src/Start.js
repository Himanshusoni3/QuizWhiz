export default function Start({ dispatch, totalQuestion }) {
  return (
    <div className="start">
      <h1>Welcome to The React Quiz!</h1>
      <h3>{totalQuestion} questions to test your React mastery</h3>
      <button className="btn" onClick={() => dispatch({ type: "startQuiz" })}>
        Let's start
      </button>
    </div>
  );
}
