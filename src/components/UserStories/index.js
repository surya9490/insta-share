import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import LoaderView from '../Loader'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 8,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 7,
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 512,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

function UserStories() {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [fetchedData, setFetchedData] = useState([])
  const userStoriesApi = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      setFetchedData(data)

      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }
  useEffect(() => {
    userStoriesApi()
  }, [])

  const renderLoadingView = () => (
    <div className="userStories-loader">
      <LoaderView />
    </div>
  )

  const renderSuccessView = () => (
    <div className="slick-container">
      <Slider {...settings}>
        {fetchedData.users_stories.map(each => (
          <div className="slickItem" key={each.user_id}>
            <img
              className="eachStory__image"
              src={each.story_url}
              alt="user story"
            />
            <p>{each.user_name}</p>
          </div>
        ))}
      </Slider>
    </div>
  )

  const renderFailureView = () => (
    <div className="userstoies-failure">
      <p>Something went wrong. Please try again</p>
      <button className="retry-button" onClick={userStoriesApi} type="button">
        Try again
      </button>
    </div>
  )

  const renderApiStatus = () => {
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

  return <div>{renderApiStatus()}</div>
}

export default UserStories
