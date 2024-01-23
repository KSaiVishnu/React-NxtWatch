import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'
import Sidebar from '../Sidebar'
import GamingCard from '../GamingCard'
import WatchContext from '../../context/WatchContext'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class Gaming extends Component {
  state = {
    apiStatus: 'initial',
    total: 0,
    videos: [],
  }

  componentDidMount() {
    this.renderGamingView()
  }

  renderGamingView = async () => {
    this.setState({apiStatus: 'loading'})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const {total, videos} = data
      const formattedVideos = videos.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        thumbnailUrl: eachItem.thumbnail_url,
        viewCount: eachItem.view_count,
      }))
      this.setState({videos: formattedVideos, total, apiStatus: 'success'})
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  renderSuccess = () => {
    const {videos} = this.state
    return (
      <ul className="gaming-ul">
        {videos.map(eachItem => (
          <GamingCard details={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <WatchContext.Consumer>
      {value => {
        const {isDark} = value
        const failureViewImgUrl = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <div>
            <img src={failureViewImgUrl} />
            <h1>Oops! Something Went Wrong</h1>
            <p>We are having some trouble to complete your request.</p>
            <p>Please try again.</p>
            <button onClick={this.renderGaming()}>Retry</button>
          </div>
        )
      }}
    </WatchContext.Consumer>
  )

  renderGaming = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'success':
        return this.renderSuccess()
      case 'loading':
        return this.renderLoading()
      case 'failure':
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDark} = value

          return (
            <div>
              <Header />
              <div className="container">
                <Sidebar />
                <div className="rightbar">
                  <div>
                    <SiYoutubegaming />
                    <h1>Gaming</h1>
                  </div>
                  <div>{this.renderGaming()}</div>
                </div>
              </div>
            </div>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}

export default Gaming
