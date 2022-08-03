class Localstorage {
  static initalize = () => {
    if (!localStorage.getItem("memoryGame")) {
      localStorage.setItem("memoryGame", JSON.stringify([]))
    }
  }

  static getCurrentGameData = () => {
    const res = JSON.parse(localStorage.getItem('currentGame'))
    return res ? res : null
  }

  static setCurrentGameData = (obj = {}) => {
    localStorage.setItem('currentGame', JSON.stringify(obj))
  }

  static getData = () => {
    const res =  JSON.parse(localStorage.getItem('memoryGame'))
    return res ? res : []
  }

  static setData = (newData) => {
    const userData = JSON.parse(localStorage.getItem('memoryGame')) || []

    let isPlayerExist = userData.some(item => item.user === newData.user)

    if (!isPlayerExist) {
      userData.push(newData)

      localStorage.setItem('memoryGame', JSON.stringify(userData))
    } else {
      const currentPlayerStats = userData.find(item => item.user === newData.user)

      if (currentPlayerStats.score > newData.score) {
        const updatedData = userData.map(item => item.user === newData.user ? newData : item)
        localStorage.setItem('memoryGame', JSON.stringify(updatedData))
      }
    }
  }
}

export default Localstorage
