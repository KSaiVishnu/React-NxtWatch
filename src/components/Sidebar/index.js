import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {MdPlaylistAdd} from 'react-icons/md'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import WatchContext from '../../context/WatchContext'

import './index.css'

const Sidebar = () => (
  <WatchContext.Consumer>
    {value => {
      const {isDark} = value
      return (
        <div className="sidebar-container">
          <div className="sidebar">
            <ul className="sidebar-ul">
              <li className="sidebar-li">
                <Link to="/">
                  <button className="sidebar-button">
                    <IoMdHome className="icon" />
                    Home
                  </button>
                </Link>
              </li>
              <li className="sidebar-li">
                <Link to="/trending">
                  <button className="sidebar-button">
                    <FaFire className="icon" />
                    Trending
                  </button>
                </Link>
              </li>
              <li className="sidebar-li">
                <Link to="/gaming">
                  <button className="sidebar-button">
                    <SiYoutubegaming className="icon" />
                    Gaming
                  </button>
                </Link>
              </li>
              <li className="sidebar-li">
                <Link to="/saved-videos">
                  <button className="sidebar-button">
                    <MdPlaylistAdd className="icon" />
                    Saved videos
                  </button>
                </Link>
              </li>
            </ul>
            <div className="media-container">
              <p>CONTACT US</p>
              <div>
                <img
                  className="media-img"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                />
                <img
                  className="media-img"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                />
                <img
                  className="media-img"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                />
              </div>
              <p>Enjoy! Now to see your channels and recommendations!</p>
            </div>
          </div>
        </div>
      )
    }}
  </WatchContext.Consumer>
)

export default Sidebar
