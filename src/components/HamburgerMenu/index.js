import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useState, useContext} from 'react'
import SearchContext from '../../SearchContext'

import './index.css'

function HamburgerMenu(props) {
  const {onClickCancell, handleClickLogout} = props
  const [toggleHamburger, setToggleHamburger] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  const {handleSearchApi, toggleSearchResult} = useContext(SearchContext)

  const handleHideHamburger = () => {
    onClickCancell()
  }

  const onClickLogout = () => {
    handleClickLogout()
  }

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const onClickSearch = () => {
    handleSearchApi(searchInput)
  }

  const hideSearchResults = () => {
    toggleSearchResult()
  }

  const displayHamburgerMenu = () => (
    <div className="menu">
      <Link to="/" className="route" onClick={hideSearchResults}>
        <p className="route">Home</p>
      </Link>
      <p
        className="route searchinput"
        onClick={() => setToggleHamburger(!toggleHamburger)}
      >
        Search
      </p>
      <Link to="/my-profile" className="route" onClick={hideSearchResults}>
        <p className="route">Profile</p>
      </Link>
      <button type="button" onClick={(onClickLogout, hideSearchResults)}>
        Logout
      </button>
      <img
        onClick={handleHideHamburger}
        alt="cancell"
        src="https://res.cloudinary.com/dwkbmojpv/image/upload/v1678275651/instashare/Shapedlkld_yvslzp.png"
      />
    </div>
  )

  const displaySearch = () => (
    <div className="searchbar">
      <input
        className="hamburger__search-input"
        type="search"
        placeholder="Search Caption"
        onChange={onChangeSearchInput}
      />
      <button className="search" type="button" onClick={onClickSearch}>
        <FaSearch className="search-icon" testid="searchIcon" />
      </button>
    </div>
  )

  return (
    <>
      {toggleHamburger ? (
        <div>{displaySearch()}</div>
      ) : (
        <div>{displayHamburgerMenu()}</div>
      )}
    </>
  )
}

export default HamburgerMenu
