import {useEffect, useState, useContext} from 'react'
import Cookies from 'js-cookie'
import LoaderView from '../Loader'
import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import SearchContext from '../../SearchContext'
import Search from '../Search'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

function UserProfile(props) {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [fetchedData, setFetchedData] = useState([])

  const {searchActive} = useContext(SearchContext)

  const {match} = props
  const {params} = match
  const {userId} = params

  const requestUserProfileApi = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/users/${userId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        id: data.user_details.id,
        posts: data.user_details.posts,
        postsCount: data.user_details.posts_count,
        profilePic: data.user_details.profile_pic,
        stories: data.user_details.stories,
        userBio: data.user_details.user_bio,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
      }

      setFetchedData(updatedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }
  useEffect(() => {
    requestUserProfileApi()
  }, [])

  const renderLoadingView = () => (
    <div className="userprofile-loader">
      <LoaderView />
    </div>
  )
  const renderSuccessView = () => <ProfileDetails fetchedData={fetchedData} />

  const renderFailureView = () => (
    <div className="user-profile">
      <img
        src="https://res.cloudinary.com/dwkbmojpv/image/upload/v1668143859/Group_7737failure_kjivj9.png"
        alt="failure"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" className="retry-button">
        Try again
      </button>
    </div>
  )

  const renderApiStatus = () => {
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()

      default:
        return null
    }
  }

  return (
    <div className="container">
      <Header />
      {searchActive ? <Search /> : <div>{renderApiStatus()}</div>}
    </div>
  )
}

export default UserProfile
