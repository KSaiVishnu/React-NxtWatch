import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {BiLike, BiDislike} from 'react-icons/bi'
import {BsDot} from 'react-icons/bs'
import {MdPlaylistAdd} from 'react-icons/md'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import Header from '../Header'
import Sidebar from '../Sidebar'
import WatchContext from '../../context/WatchContext'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class VideoItemDetails extends Component {
  state = {
    apiStatus: 'initial',
    videoDetails: {},
    like: false,
    disLike: false,
    isVideoSaved: false,
  }

  componentDidMount() {
    this.renderVideoItemDetails()
  }

  renderVideoItemDetails = async () => {
    this.setState({apiStatus: 'loading'})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const videodetails = data.video_details
      const formattedData = {
        id: videodetails.id,
        title: videodetails.title,
        thumbnailUrl: videodetails.thumbnail_url,
        videoUrl: videodetails.video_url,
        channel: {
          name: videodetails.channel.name,
          profileImageUrl: videodetails.profile_image_url,
          subscriberCount: videodetails.subscriber_count,
        },
        description: videodetails.description,
        viewCount: videodetails.view_count,
        publishedAt: videodetails.published_at,
      }
      this.setState({videoDetails: formattedData, apiStatus: 'success'})
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  onClickLikeButton = () => {
    this.setState(prevState => ({like: !prevState.like, disLike: false}))
  }

  onClickDislikeButton = () => {
    this.setState(prevState => ({disLike: !prevState.disLike, like: false}))
  }

  renderSuccess = () => (
    <WatchContext.Consumer>
      {value => {
        const {isDark, addItem, removeItem, savedVideos} = value
        const {videoDetails, like, disLike, isVideoSaved} = this.state
        const likeClassName = like ? 'colour' : ''
        const dislikeClassName = disLike ? 'colour' : ''
        const {
          id,
          title,
          thumbnailUrl,
          videoUrl,
          channel,
          description,
          viewCount,
          publishedAt,
        } = videoDetails
        const {name, profileImageUrl, subscriberCount} = channel
        let years = formatDistanceToNow(new Date(publishedAt))
        years = years.split(' ')
        years.shift()
        years = years.join(' ')

        const isVideoPresent = savedVideos.find(eachItem => eachItem.id === id)
        console.log(isVideoPresent)
        const saveClassName = isVideoPresent !== undefined ? 'colour' : ''
        const saveText = isVideoPresent !== undefined ? 'Saved' : 'Save'

        const addOrRemoveItem = () => {
          if (isVideoPresent === undefined) {
            addItem(videoDetails)
          } else {
            removeItem(id)
          }
        }

        const onClickSaveButton = () => {
          addOrRemoveItem()
        }

        return (
          <div>
            <ReactPlayer url={videoUrl} />
            <h1 className="heading">{title}</h1>
            <div className="like-container">
              <p>{viewCount}views</p>
              <BsDot className="dot-icon" />
              <p>{years} ago</p>
              <div className="likes-container">
                <button
                  className={`like-btn ${likeClassName}`}
                  onClick={this.onClickLikeButton}
                >
                  <BiLike />
                  Like
                </button>
                <button
                  className={`like-btn ${dislikeClassName}`}
                  onClick={this.onClickDislikeButton}
                >
                  <BiDislike />
                  Dislike
                </button>
                <button
                  className={`like-btn ${saveClassName}`}
                  onClick={onClickSaveButton}
                >
                  <MdPlaylistAdd />
                  {saveText}
                </button>
              </div>
            </div>
            <hr />
            <img src={profileImageUrl} />
            <p>{name}</p>
            <p>{subscriberCount} subscribers</p>
            <p>{description}</p>
          </div>
        )
      }}
    </WatchContext.Consumer>
  )

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
            <button onClick={this.renderVideoItemDetails()}>Retry</button>
          </div>
        )
      }}
    </WatchContext.Consumer>
  )

  renderVideoItem = () => {
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
                  <div>{this.renderVideoItem()}</div>
                </div>
              </div>
            </div>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}

export default VideoItemDetails
