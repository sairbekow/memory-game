import './GameOver.css'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import Localstorage from "../../utils/LocalStorage";

const GameOver = () => {
  const [score, setScore] = useState(null)
  const [time, setTime] = useState(null)
  const [moves, setMoves] = useState(null)

  useEffect(() => {
    const obj = Localstorage.getCurrentGameData()
    setScore(obj.score)
    setTime(obj.time)
    setMoves(obj.moves)

    Localstorage.setData(obj)
  }, [])

  return (
    <div className="game-over">
      <h2 className="game-over__title">
        Game Over
      </h2>
      <p className="game-over__score-title">
        Score: <span>{score}</span>
      </p>
      <p className="game-over__score-title">
        Time: <span>{time}</span>
      </p>
      <p className="game-over__score-title">
        Moves: <span>{moves}</span>
      </p>
      <div className="game-over__links">
        <Link to="/game" className="game-over__play-again game-over__link">
          Play again
        </Link>
        <Link to="/leaderboard" className="game-over__play-again game-over__link">
          Leaderboard
        </Link>
        <Link to="/" className="game-over__main-menu game-over__link">
          Main menu
        </Link>
      </div>
    </div>
  );
};

export default GameOver;
