import './GameField.css'

import Card from "../../components/Card/Card"
import {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import Localstorage from "../../utils/LocalStorage";

const GameField = () => {
  const [playerChoice, setPlayerChoice] = useState([])
  const [cardPlacement, setCardPlacement] = useState([])
  const [cardCount, setCardCount] = useState(0)
  const [checkingPlayerChoice, setCheckingPlayerChoice] = useState(false)
  const [moveAmount, setMoveAmount] = useState(0)
  const [time, setTime] = useState(0)

  const toGameOver = useNavigate()
  let stopwatch = null
  const cardAmount = Localstorage.getCurrentGameData().difficulty

  useEffect(() => {
    if (playerChoice.length === 2) {
      setCheckingPlayerChoice(true)
      if (playerChoice[0]['number'] === playerChoice[1]['number']) {
        setTimeout(() => {
          playerChoice[0].setIsVisible(false)
          playerChoice[1].setIsVisible(false)
          setPlayerChoice([])
          setCardCount(prev => prev + 2)
          setCheckingPlayerChoice(false)
        }, 600)
      } else {
        setTimeout(() => {
          playerChoice[0].setIsOpened(false)
          playerChoice[1].setIsOpened(false)
          setPlayerChoice([])
          setCheckingPlayerChoice(false)
        }, 600)
      }
    }
  }, [playerChoice])

  useEffect(() => {
    if (cardCount === cardAmount) {
      toGameOver('/game-over', {replace: true})
      const obj = Localstorage.getCurrentGameData('user')
      obj.moves = moveAmount
      obj.time = time
      obj.score = time * moveAmount
      Localstorage.setCurrentGameData(obj)
    }
  }, [cardCount])

  useEffect(() => {
    return () => {
      clearInterval(stopwatch)
    }
  }, [])
  

  const setShuffledArray = () => {
    const arr = Array.from({length: cardAmount / 2})
    const filledArr = arr.map((item, index) => index)
    const shuffledArr = [...filledArr, ...filledArr].sort(() => Math.random() - 0.5)
    setCardPlacement(shuffledArr)
  }

  useEffect(setShuffledArray, [])

  const onChooseCard = (props) => {
    if (playerChoice.every((item, i) => playerChoice[i].setIsVisible !== props.setIsVisible)) {
      if(moveAmount === 0) {
        startStopwatch()
      }
      setPlayerChoice(() => [...playerChoice, props])
      setMoveAmount(prev => prev + 1)
    }
  }

  const startStopwatch = () => {
     stopwatch = setInterval(() => {
      setTime(prev => prev + 1)
    }, 1000)
  }

  const renderCard = () => {
    return cardPlacement.map((num, i) => (
      <Card key={i}
            number={num}
            onChooseCard={onChooseCard}
            setCheckingPlayerChoice={setCheckingPlayerChoice}
            checkingPlayerChoice={checkingPlayerChoice}/>))
  }
  return (
    <div className="game-field">
      <div className="game-info">
        <Link to="/" className="leaderboard__back game-field__back-btn">
          back to main
        </Link>
        <div className="game-info__stats">
          <div className="stopwatch game-info__item">
            time
            <div className="stopwatch__content game-info__content">
              {time}
            </div>
          </div>
          <div className="moves game-info__item">
            moves
            <div className="moves__content game-info__content">
              {moveAmount}
            </div>
          </div>
        </div>
      </div>
      <div className="game-field__content">
        {renderCard()}
      </div>
    </div>
  )
}

export default GameField
