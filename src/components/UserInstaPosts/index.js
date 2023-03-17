import {useState} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import './index.css'

function UserInstaPosts(props) {
  const [isLiked, setIsLiked] = useState(false)
  const {eachPost} = props
  const {postId} = eachPost

  const toggleButton = async () => {
    const status = !isLiked
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`

    const data = {
      like_status: status,
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(data),
    }

    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      setIsLiked(status)
    }
  }
  return (
    <li className="userpost-listitems">
      <div className="userpost-userDetails">
        <img
          className="userpost-userDetails__image"
          src={eachPost.profilePic}
          alt="post author profile"
        />
        <Link to={`/users/${eachPost.userId}`} className="route ">
          <p className="userpost-userDetails__username">{eachPost.userId}</p>
        </Link>
      </div>
      <img
        src={eachPost.postDetails.image_url}
        alt="post"
        className="userpost-image"
      />
      <div className="icon-comments">
        <div className="like-comment-icon">
          {!isLiked && (
            <button
              type="button"
              className="like-button"
              onClick={toggleButton}
            >
              <BsHeart className="icon" testid="likeIcon" />
            </button>
          )}

          {isLiked && (
            <button
              type="button"
              onClick={toggleButton}
              className="like-button"
            >
              <FcLike className="icon" testid="unLikeIcon" />
            </button>
          )}

          <FaRegComment className="icon" />
          <BiShareAlt className="icon" />
        </div>
        <p className="likes-count margin-bottom">
          {isLiked ? eachPost.likesCount + 1 : eachPost.likesCount} likes
        </p>
        <p className="caption margin-bottom">{eachPost.postDetails.caption}</p>
        <ul className="comments-list">
          {eachPost.comments.map(eachComment => (
            <li key={eachComment.user_id}>
              <p className="comments margin-bottom">
                {eachComment.user_name} {}
              </p>
              <span>{eachComment.comment}</span>
            </li>
          ))}
        </ul>
        <p className="margin-bottom">{eachPost.createdAt}</p>
      </div>
    </li>
  )
}

export default UserInstaPosts
