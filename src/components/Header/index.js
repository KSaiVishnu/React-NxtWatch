import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {IoReorderThree, IoSunnyOutline} from 'react-icons/io5'
import {IoMdClose, IoIosMoon, IoMdHome, IoMdLogOut} from 'react-icons/io'
import {MdPlaylistAdd} from 'react-icons/md'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import WatchContext from '../../context/WatchContext'
import './index.css'

import 'reactjs-popup/dist/index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    console.log(history)
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <WatchContext.Consumer>
      {value => {
        const {isDark, changeTheme} = value
        const logoUrl = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        const onChangeTheme = () => {
          changeTheme()
        }

        return (
          <div>
            <div className="small">
              <Link to="/">
                <img className="logo" src={logoUrl} />
              </Link>
              <ul className="ul-list">
                <li>
                  <button className="header-button" onClick={onChangeTheme}>
                    {isDark ? <IoSunnyOutline /> : <IoIosMoon />}
                  </button>
                </li>
                <li>
                  <div className="popup-container">
                    <Popup
                      modal
                      trigger={
                        <button>
                          <IoReorderThree />
                          th
                        </button>
                      }
                    >
                      {close => (
                        <>
                          <div>
                            <button
                              type="button"
                              className="trigger-button"
                              onClick={() => close()}
                            >
                              <IoMdClose />
                              cl
                            </button>
                            <ul>
                              <li>
                                <Link to="/">
                                  <button>
                                    <IoMdHome />
                                    Home
                                  </button>
                                </Link>
                              </li>
                              <li>
                                <Link to="/trending">
                                  <button>
                                    <FaFire />
                                    Trending
                                  </button>
                                </Link>
                              </li>
                              <li>
                                <Link to="/gaming">
                                  <button>
                                    <SiYoutubegaming />
                                    Gaming
                                  </button>
                                </Link>
                              </li>
                              <li>
                                <Link to="/saved-videos">
                                  <button>
                                    <MdPlaylistAdd />
                                    Saved videos
                                  </button>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </>
                      )}
                    </Popup>
                  </div>
                </li>
                <li>
                  <div className="popup-container">
                    <Popup
                      modal
                      trigger={
                        <button type="button" className="trigger-button">
                          <IoMdLogOut />
                          lo
                        </button>
                      }
                    >
                      {close => (
                        <>
                          <div>
                            <p>Are you sure,you want to logout?</p>
                            <button
                              type="button"
                              className="trigger-button"
                              onClick={() => close()}
                            >
                              Cancel
                            </button>
                            <button type="button" onClick={onClickLogout}>
                              Confirm
                            </button>
                          </div>
                        </>
                      )}
                    </Popup>
                  </div>
                </li>
              </ul>
            </div>
            <div className="large">
              <Link to="/">
                <img className="logo" src={logoUrl} />
              </Link>
              <ul className="ul-list">
                <li className="li">
                  <button className="header-button" onClick={onChangeTheme}>
                    {isDark ? (
                      <IoSunnyOutline className="header-icon" />
                    ) : (
                      <IoIosMoon className="header-icon" />
                    )}
                  </button>
                </li>
                <li className="li">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="profile-image"
                  />
                </li>
                <li className="li">
                  <div className="popup-container">
                    <Popup
                      modal
                      trigger={
                        <button
                          type="button"
                          className="trigger-button logout-button"
                        >
                          Logout
                        </button>
                      }
                    >
                      {close => (
                        <>
                          <div>
                            <p>Are you sure,you want to logout?</p>
                            <button
                              type="button"
                              className="trigger-button"
                              onClick={() => close()}
                            >
                              Cancel
                            </button>
                            <button type="button" onClick={onClickLogout}>
                              Confirm
                            </button>
                          </div>
                        </>
                      )}
                    </Popup>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )
      }}
    </WatchContext.Consumer>
  )
}

export default withRouter(Header)
