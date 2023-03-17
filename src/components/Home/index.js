import {useContext} from 'react'
import Header from '../Header'
import UserStories from '../UserStories'
import UserPosts from '../UserPosts'
import SearchContext from '../../SearchContext'
import Search from '../Search'
import './index.css'

function Home() {
  const {searchActive} = useContext(SearchContext)

  return (
    <>
      <div style={{background: '#FFFFFF'}} className="main-container">
        <div className="container">
          <Header />
        </div>
      </div>
      <div style={{background: '#FAFAFA'}}>
        <div className="container userstories-margin">
          {searchActive ? (
            <Search />
          ) : (
            <>
              <UserStories />
              <UserPosts />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
