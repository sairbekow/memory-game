import './Leaderboard.css'
import {useEffect, useState} from "react"
import Localstorage from "../../utils/LocalStorage"
import {Link} from "react-router-dom"

const Leaderboard = () => {
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('score')

  useEffect(() => {
    setUsers(Localstorage.getData())
  }, [])

  const onChangeFilter = (event) => {
    event && setFilter(event.target.value)
  }

  useEffect(() => {
    const arr = users.reduce((acc, item) => {
      return [...acc, {user: item.user, point: item[filter]}]
    }, [])
    arr.sort((a, b) =>a.point - b.point)
    console.log(arr)
    setList(arr)
  }, [filter, users])


  return (
    <div className="leaderboard">
      <Link to="/" className="leaderboard__back">
        Back to main menu
      </Link>
      <div className="leaderboard__game-mode">
        <p>Filter:</p>
        <select id="leaderboard-select" onChange={onChangeFilter}>
          <option className="leaderboard-select__moves-time-option" value="score">Score</option>
          <option className="leaderboard-select__moves-option" value="moves">Moves</option>
          <option className="leaderboard-select__time-option" value="time">Time</option>
        </select>
      </div>
      <h2 className="leaderboard__title">LEADERBOARD</h2>
      <div className="leaderboard__list-block">
        <ul className="leaderboard__list">
          {list && list.map(item => {
            return (
              <li className="leaderboard__item" key={item.user}>
                <p className="leaderboard__name">
                  {item.user}
                </p>
                <div className="leaderboard__line"/>
                <p className="leaderboard__score">
                  {item.point}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Leaderboard
