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

function MyProfile() {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [fetchedData, setFetchedData] = useState([])
  const {searchActive} = useContext(SearchContext)

  const requestUserProfileApi = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/my-profile'
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
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        id: data.profile.id,
        posts: data.profile.posts,
        postsCount: data.profile.posts_count,
        profilePic: data.profile.profile_pic,
        stories: data.profile.stories,
        userBio: data.profile.user_bio,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
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

export default MyProfile
