import {FaFire} from 'react-icons/fa'
import Header from '../Header'
import Sidebar from '../Sidebar'
import SaveVideoCard from '../SaveVideoCard'
import WatchContext from '../../context/WatchContext'
import './index.css'

const SavedVideos = () => (
  <WatchContext.Consumer>
    {value => {
      const {isDark, savedVideos} = value

      return (
        <div data-testid="savedVideos">
          <Header />
          <div className="container">
            <Sidebar />
            <div className="rightbar">
              {savedVideos.length > 0 ? (
                <div>
                  <div>
                    <FaFire />
                    <h1>Saved Videos</h1>
                  </div>
                  <ul>
                    {savedVideos.map(eachItem => (
                      <SaveVideoCard details={eachItem} key={eachItem.id} />
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                  />
                  <h1>No saved videos found</h1>
                  <p>You can save your videos while watching them</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }}
  </WatchContext.Consumer>
)

export default SavedVideos
