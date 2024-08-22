import Loader from "./Loader.js";
import Header from "./header.js";
import Main from "./main.js";
import ErrorMssg from "./Error.js";
import { useEffect, useReducer } from "react";
import Start from "./Start.js";
import Progress from "./progress.js";
import QuestionList from "./QuestionList.js";
import Footer from "./footer.js";
import Finish from "./finish.js";
const initialState = {
  status: "loading",
  questions: [],
  currQuestion: 1,
  totalPoints: 0,
  answer: null,
  points: 0,
  highScore: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "questionFetchEnd":
      return {
        ...state,
        status: "ready",
        questions: action.payload,
        totalPoints: action.payload.reduce((acc, curr) => acc + curr.points, 0),
      };
    case "questionFetchFailed":
      return { ...state, status: "error" };
    case "startQuiz":
      return { ...state, status: "active" };
    case "userClicked":
      const correctAnsClicked =
        action.payload - 1 ===
        state.questions.at(state.currQuestion - 1).correctOption;
      return {
        ...state,
        points: correctAnsClicked
          ? state.points + state.questions.at(state.currQuestion - 1).points
          : state.points,
        answer: action.payload,
      };
    case "nextQuestion":
      return { ...state, currQuestion: state.currQuestion + 1, answer: null };
    case "finishQuiz":
      return {
        ...state,
        status: "finished",
        highScore: Math.max(state.highScore, state.points),
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        currQuestion: 1,
        answer: null,
        points: 0,
      };
    default:
      throw new Error("unknown action");
  }
}
function App() {
  const [
    { status, questions, totalPoints, currQuestion, answer, points, highScore },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const questions = await res.json();
        dispatch({ type: "questionFetchEnd", payload: questions });
      } catch (err) {
        dispatch({ type: "questionFetchFailed" });
      }
    }
    fetchQuestions();
  }, []);

  const totalQuestions = questions.length;

  useEffect(
    function () {
      console.log("hello");
      function callback(e) {
        if (e.key === "Enter") {
          if (currQuestion === totalQuestions) dispatch({ type: "finishQuiz" });
          else dispatch({ type: "nextQuestion" });
        }
      }
      function callback2(e) {
        if (e.key === "Enter") dispatch({ type: "restart" });
      }
      console.log(status, answer);
      if (status === "finished") {
        document.addEventListener("keydown", callback2);
        return function () {
          document.removeEventListener("keydown", callback2);
        };
      }
      if (answer) {
        document.addEventListener("keydown", callback);
        return function () {
          document.removeEventListener("keydown", callback);
        };
      }
    },
    [dispatch, status, currQuestion, totalQuestions, answer]
  );

  return (
    <div className="quiz">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorMssg />}
        {status === "ready" && (
          <Start dispatch={dispatch} totalQuestion={totalQuestions} />
        )}
        {status === "active" && (
          <>
            <Progress
              totalPoints={totalPoints}
              currQuestion={currQuestion}
              totalQuestions={totalQuestions}
              points={points}
            />
            <QuestionList
              question={questions.at(currQuestion - 1)}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer
              dispatch={dispatch}
              answer={answer}
              currQuestion={currQuestion}
              totalQuestion={totalQuestions}
            />
          </>
        )}
        {status === "finished" && (
          <Finish
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
