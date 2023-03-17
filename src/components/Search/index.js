import {useEffect, useState, useContext} from 'react'
import Cookies from 'js-cookie'
import UserInstaPosts from '../UserInstaPosts'
import LoaderView from '../Loader'
import SearchContext from '../../SearchContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  noResult: 'NORESULT',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

function Search() {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [searchData, setSearchData] = useState([])

  const {searchInput} = useContext(SearchContext)

  const fetchSearchData = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
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
      console.log(data.posts.length)
      setSearchData(updatedData)

      if (data.posts.length !== 0) {
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.noResult)
      }
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    fetchSearchData()
  }, [searchInput])

  const renderLoadingView = () => (
    <div className="search-loader">
      <LoaderView />
    </div>
  )

  const renderSuccessView = () => (
    <ul className="userpost">
      {searchData.map(eachPost => (
        <UserInstaPosts eachPost={eachPost} key={eachPost.postId} />
      ))}
    </ul>
  )

  const renderSearchAgain = () => (
    <div className="search-failure">
      <img
        src="https://res.cloudinary.com/dwkbmojpv/image/upload/v1668177850/Groupnotfound_exrvwk.png"
        alt="failure"
      />
      <h2>Search Not Found</h2>
      <p>Try different keyword again</p>
    </div>
  )

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

  const renderApiSearchStatus = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.noResult:
        return renderSearchAgain()

      default:
        return null
    }
  }

  return <>{renderApiSearchStatus()}</>
}

export default Search
