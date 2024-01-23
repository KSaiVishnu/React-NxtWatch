import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoSearch} from 'react-icons/io5'
import {IoMdClose} from 'react-icons/io'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import VideoCard from '../VideoCard'
import Sidebar from '../Sidebar'
import WatchContext from '../../context/WatchContext'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class Home extends Component {
  state = {
    showPremium: true,
    searchInput: '',
    apiStatus: 'initial',
    videos: [],
    total: 0,
  }

  componentDidMount() {
    this.renderSearchResultsView()
  }

  renderSearchResultsView = async () => {
    this.setState({apiStatus: 'loading'})
    const {searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const {videos, total} = data
      const formattedVideos = videos.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        thumbnailUrl: eachItem.thumbnail_url,
        channel: {
          name: eachItem.channel.name,
          profileImageUrl: eachItem.channel.profile_image_url,
        },
        viewCount: eachItem.view_count,
        publishedAt: eachItem.published_at,
      }))
      this.setState({
        videos: formattedVideos,
        total,
        apiStatus: 'success',
        searchInput: '',
      })
    } else {
      this.setState({apiStatus: 'failure', searchInput: ''})
    }
  }

  closePremium = () => {
    this.setState(prevState => ({showPremium: !prevState.showPremium}))
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onKeydownInput = event => {
    if (event.key === 'Enter') {
      this.renderSearchResultsView()
    }
  }

  onClickSearch = () => {
    this.renderSearchResultsView()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {total, videos} = this.state
    return total > 0 ? (
      <ul className="videos-ul-list">
        {videos.map(eachItem => (
          <VideoCard details={eachItem} key={eachItem.id} />
        ))}
      </ul>
    ) : (
      <div className="novideos-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          className="novideos-img"
        />
        <h1>No Search results found</h1>
        <p>Try different key words or remove search filter</p>
        <button className="retry-btn" onClick={this.onClickSearch}>
          Retry
        </button>
      </div>
    )
  }

  renderFailureView = () => (
    <WatchContext.Consumer>
      {value => {
        const {isDark} = value
        const failureViewImgUrl = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <div className="novideos-container">
            <img className="novideos-img" src={failureViewImgUrl} />
            <h1>Oops! Something Went Wrong</h1>
            <p>We are having some trouble to complete your request.</p>
            <p>Please try again.</p>
            <button className="retry-btn" onClick={this.onClickSearch}>
              Retry
            </button>
          </div>
        )
      }}
    </WatchContext.Consumer>
  )

  renderSearchResults = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'success':
        return this.renderSuccessView()
      case 'loading':
        return this.renderLoadingView()
      case 'failure':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {showPremium, searchInput} = this.state
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <div data-testid="home">
              <Header />
              <div className="container">
                <Sidebar />
                <div className="rightbar">
                  {showPremium && (
                    <div className="premium-container">
                      <div>
                        <img
                          className="premium-img"
                          alt="nxt watch logo"
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                        />
                        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                        <button className="getit-btn">GET IT NOW</button>
                      </div>
                      <button
                        className="close-button"
                        data-testid="close"
                        onClick={this.closePremium}
                      >
                        <IoMdClose />
                        cl
                      </button>
                    </div>
                  )}
                  <div className="search-container">
                    <input
                      className="search-input"
                      onKeyDown={this.onKeydownInput}
                      onChange={this.changeSearchInput}
                      type="search"
                      placeholder="Search"
                      value={searchInput}
                    />
                    <button className="search-btn" onClick={this.onClickSearch}>
                      <IoSearch />
                      se
                    </button>
                  </div>
                  <div>{this.renderSearchResults()}</div>
                </div>
              </div>
            </div>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}

export default Home
