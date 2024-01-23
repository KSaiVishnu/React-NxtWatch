import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import WatchContext from './context/WatchContext'

import './App.css'

// Replace your code here
class App extends Component {
  state = {
    isDark: false,
    savedVideos: [],
  }

  changeTheme = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  addItem = videoItem => {
    this.setState(prevState => ({
      savedVideos: [...prevState.savedVideos, videoItem],
    }))
  }

  removeItem = id => {
    const {savedVideos} = this.state
    const filterSavedVideos = savedVideos.filter(eachItem => eachItem.id !== id)
    this.setState({savedVideos: filterSavedVideos})
  }

  render() {
    const {isDark, savedVideos} = this.state
    return (
      <WatchContext.Provider
        value={{
          isDark,
          changeTheme: this.changeTheme,
          savedVideos,
          addItem: this.addItem,
          removeItem: this.removeItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
        </Switch>
      </WatchContext.Provider>
    )
  }
}

export default App
