import Cookies from 'js-cookie'
import {useState, useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import HamburgerMenu from '../HamburgerMenu'

import SearchContext from '../../SearchContext'
import './index.css'

function Header(props) {
  const [activeHamburger, setActiveHamburger] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  const {handleSearchApi, toggleSearchResult} = useContext(SearchContext)

  const hideSearchResults = () => {
    toggleSearchResult()
  }

  const onClickHamburger = () => {
    setActiveHamburger(!activeHamburger)
  }

  const handleClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const onClickSearchIcon = () => {
    handleSearchApi(searchInput)
  }

  return (
    <div className="header__container ">
      <div className="header desktop-alignment">
        <Link
          to="/"
          className="header__logo-title route"
          onClick={hideSearchResults}
        >
          <img
            className="header__logo"
            alt="website logo"
            src="https://res.cloudinary.com/dwkbmojpv/image/upload/v1668003337/instashare/instaShare_logo_xk3qvu.png"
          />
          <h2 className="header__title">Insta Share</h2>
        </Link>

        <img
          className="header__hamburger d-hide"
          onClick={onClickHamburger}
          alt="hamburger"
          src="https://res.cloudinary.com/dwkbmojpv/image/upload/v1678271357/instashare/menuhamburger_ai13ph.png"
        />
        <div className="header-desktop m-hide">
          <div className="searchbar">
            <input
              className="hamburger__search-input"
              type="search"
              placeholder="Search Caption"
              onChange={onChangeSearchInput}
            />
            <button
              className="search"
              type="button"
              onClick={onClickSearchIcon}
            >
              <FaSearch className="search-icon" testid="searchIcon" />
            </button>
          </div>
          <Link to="/" className="route" onClick={hideSearchResults}>
            <p className="home-link">Home</p>
          </Link>
          <Link to="/my-profile" className="route" onClick={hideSearchResults}>
            <p className="profile-link">Profile</p>
          </Link>
          <button
            className="logout-button"
            type="button"
            onClick={(handleClickLogout, hideSearchResults)}
          >
            Logout
          </button>
        </div>
      </div>
      {activeHamburger && (
        <HamburgerMenu
          onClickCancell={onClickHamburger}
          handleClickLogout={handleClickLogout}
        />
      )}
    </div>
  )
}

export default withRouter(Header)
