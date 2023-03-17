import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsExclamationTriangle} from 'react-icons/bs'
import UserInstaPosts from '../UserInstaPosts'
import LoaderView from '../Loader'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserPosts extends Component {
  state = {fetchedData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.postsAPI()
  }

  postsAPI = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.posts.map(eachPost => ({
        postId: eachPost.post_id,
        profilePic: eachPost.profile_pic,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
        createdAt: eachPost.created_at,
        likesCount: eachPost.likes_count,
        postDetails: eachPost.post_details,
        comments: eachPost.comments,
        caption: eachPost.caption,
      }))
      this.setState({
        fetchedData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {fetchedData} = this.state
    return (
      <ul className="userpost">
        {fetchedData.map(eachPost => (
          <UserInstaPosts eachPost={eachPost} key={eachPost.postId} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="userpost-loader">
      <LoaderView />
    </div>
  )

  renderFailureView = () => (
    <div className="userpost-failure">
      <BsExclamationTriangle />
      <p>Something went wrong. Please try again</p>
      <button
        className="retry-button"
        onClick={this.userPostApiRequest}
        type="button"
      >
        Try again
      </button>
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return <>{this.renderApiStatus()}</>
  }
}

export default UserPosts
