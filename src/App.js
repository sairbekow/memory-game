import './App.css';

import StartPage from "./pages/StartPage/StartPage";
import {Route, Routes} from "react-router-dom";
import GameField from "./pages/GameField/GameField";
import GameOver from "./pages/GameOver/GameOver";
import Leaderboard from "./pages/Leaderboard/Leaderboard";

function App() {

  return (
    <div className="app">
      <div className="content">
        <Routes>
          <Route path="/" element={<StartPage/>}/>
          <Route path="/game" element={<GameField/>}/>
          <Route path="/game-over" element={<GameOver/>}/>
          <Route path="/leaderboard" element={<Leaderboard/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
