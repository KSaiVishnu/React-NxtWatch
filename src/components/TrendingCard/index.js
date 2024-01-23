import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import './index.css'

const TrendingCard = props => {
  const {details} = props
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = details
  const {name} = channel
  const years = formatDistanceToNow(new Date(publishedAt))

  return (
    <li className="t-li-item">
      <Link to={`/videos/${id}`}>
        <div className="t-card">
          <img src={thumbnailUrl} className="t-image" />
          <div className="t-container">
            <h1 className="title">{title}</h1>
            <p>{name}</p>
            <p>{viewCount} views</p>
            <p>{years} ago</p>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default TrendingCard
