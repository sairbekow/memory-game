import './Card.css'
import {useEffect, useState} from "react";

const Card = ({number, onChooseCard, checkingPlayerChoice}) => {
  const [isOpened, setIsOpened] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)

  const onClickCard = () => {
    onChooseCard({number, setIsOpened, setIsVisible})
    setIsOpened(true)
  }

  useEffect(() => {
    setIsVisible(true)
    setIsDisabled(false)
    setIsOpened(false)
  }, [])

  useEffect(() => {
    setIsDisabled(checkingPlayerChoice)
  }, [checkingPlayerChoice]);


  return (
    <button type="button"
            className={`card ${isOpened && 'active'} ${!isVisible && 'hidden-card'}`}
            onClick={onClickCard}
            disabled={!isVisible || isDisabled}>
      <div className="front"/>
      <div className="back">{number}</div>
    </button>
  );
};

export default Card;
