import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-image"
      alt="not found"
      src="https://res.cloudinary.com/dvhtvbdud/image/upload/v1742315291/Group_7519_nxx4hd.png"
    />
    <h1>Page Not Found</h1>
    <Link to="/">
      <button type="button">Go Home</button>
    </Link>
  </div>
)

export default NotFound
