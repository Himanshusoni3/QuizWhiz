import { useEffect, useState } from "react";

export default function Timer({ dispatch }) {
  const [secondRemain, setSecondRemain] = useState(20);
  useEffect(function () {
    const id = setInterval(() => {
      setSecondRemain((secondRemain) => secondRemain - 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  if (secondRemain === 0) dispatch({ type: "finishQuiz" });
  const min = Math.floor(secondRemain / 60),
    sec = secondRemain % 60;
  return (
    <p className="timer">
      {min < 10 && "0"}
      {min}:{sec < 10 && "0"}
      {sec}
    </p>
  );
}
