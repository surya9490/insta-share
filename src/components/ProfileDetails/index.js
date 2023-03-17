import './index.css'

function ProfileDetails(props) {
  const {fetchedData} = props
  return (
    <>
      <div className="profile-details">
        <p className="profile-details__username">{fetchedData.userName}</p>
        <div className="profile-details-count">
          <img
            src={fetchedData.profilePic}
            alt="user profile"
            className="profile-details__user-image"
          />
          <div>
            <p>{fetchedData.postsCount}</p>
            <p>posts</p>
          </div>
          <div>
            <p>{fetchedData.followersCount}</p>
            <p>followers</p>
          </div>
          <div>
            <p>{fetchedData.followingCount}</p>
            <p>following</p>
          </div>
        </div>
        <p className="profile-details__userId">{fetchedData.userId}</p>
        <p className="profile-details__bio">{fetchedData.userBio}</p>
        <ul className="stories-container">
          {fetchedData.stories.map(each => (
            <li key={each.id}>
              <img src={each.image} alt="my story" className="stories" />
            </li>
          ))}
        </ul>
      </div>
      <div className="profile-details__grid">
        <div className="grid-container">
          <img
            src="https://res.cloudinary.com/dwkbmojpv/image/upload/v1678779774/instashare/Vectorfdgdfg_hzo0ix.png"
            alt="grid"
            className="grid"
          />
          <p>Posts</p>
        </div>
        <ul className="posted-images">
          {fetchedData.posts.map(each => (
            <li key={each.id}>
              <img src={each.image} alt="my post" />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ProfileDetails
