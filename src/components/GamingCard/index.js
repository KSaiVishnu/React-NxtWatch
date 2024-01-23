import {Link} from 'react-router-dom'
import './index.css'

const GamingCard = props => {
  const {details} = props
  const {id, title, thumbnailUrl, viewCount} = details

  return (
    <li className="g-li-item">
      <Link to={`/videos/${id}`}>
        <img src={thumbnailUrl} className="g-image" />
        <div className="g-container">
          <h1 className="title">{title}</h1>
          <p>{viewCount} Watching Worldwide</p>
        </div>
      </Link>
    </li>
  )
}
export default GamingCard
