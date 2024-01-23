import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import {BsDot} from 'react-icons/bs'
import './index.css'

const VideoCard = props => {
  const {details} = props
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = details
  const {profileImageUrl, name} = channel
  let years = formatDistanceToNow(new Date(publishedAt))
  years = years.split(' ')
  years.shift()
  years = years.join(' ')

  return (
    <li className="li-item">
      <Link to={`/videos/${id}`}>
        <img src={thumbnailUrl} className="image" />
        <div className="container">
          <img src={profileImageUrl} className="profile-img" />
          <div>
            <p>{title}</p>
            <p>{name}</p>
            <div className="down-container">
              <p>{viewCount}views </p>
              <BsDot className="dot-icon" />
              <p>{years} ago</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default VideoCard
