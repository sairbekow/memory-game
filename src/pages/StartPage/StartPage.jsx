import './StartPage.css'

import {Link} from "react-router-dom"
import {useEffect, useState} from "react"
import Localstorage from "../../utils/LocalStorage"

const StartPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [difficulty, setDifficulty] = useState(12)

  const onStartGame = (e) => {
    if (inputValue.trim().length === 0) {
      e.preventDefault()
    } else {
      Localstorage.setCurrentGameData({user: inputValue.toUpperCase(), difficulty})
    }
  }

  useEffect(() => {
    const userData = Localstorage.getCurrentGameData()
    userData && setInputValue(userData.user)
  }, [])

  return (
    <div className="start-page">
      <p className="start-page__title">
        Your nickname
      </p>
      <input type="text"
             className="start-page__input"
             value={inputValue}
             onChange={(e) => setInputValue(e.target.value)}/>
      <div className="difficulty">
        <input id="three"
               className="start-page__radio practice"
               name="game-mode"
               type="radio"
               value="three"
               defaultChecked/>
        <label htmlFor="three" className="start-page__radio-btn practice"
               onClick={() => setDifficulty(12)}>
          <span>3x4</span>
        </label>

        <input id="four" className="start-page__radio time-attack"
               name="game-mode"
               type="radio"
               value="four"/>
        <label htmlFor="four" className="start-page__radio-btn time-attack"
               onClick={() => setDifficulty(16)}>
          <span>4x4</span>
        </label>

        <input id="five"
               className="start-page__radio time-attack"
               name="game-mode"
               type="radio"
               value="five"/>
        <label htmlFor="five" className="start-page__radio-btn time-attack"
               onClick={() => setDifficulty(20)}>
          <span>5x4</span>
        </label>
      </div>
      <Link to='/leaderboard'
            className="start-page__leaderboard-btn start-page__btn">Leaderboard</Link>
      <Link to='/game'
            className="start-page__start-btn start-page__btn"
            onClick={onStartGame}>Start</Link>
    </div>
  )
}

export default StartPage
