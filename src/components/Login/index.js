import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    if (jwtToken !== undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="login-container website login">
        <div className="insta-desktop__image">
          <img
            alt="website login"
            src="https://res.cloudinary.com/dwkbmojpv/image/upload/v1668002772/instashare/instaShare_login_image_rwnvw5.png"
          />
        </div>
        <div className="insta-logo-form">
          <div className="insta center">
            <img
              className="insta-logo"
              alt="insta-logo"
              src="https://res.cloudinary.com/dwkbmojpv/image/upload/v1668003337/instashare/instaShare_logo_xk3qvu.png"
            />
            <h2 className="insta-title">Insta Share</h2>
          </div>
          <form className="insta insta-from" onSubmit={this.onSubmitLogin}>
            <div className="insta">
              <label className="insta-form__label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                onChange={this.onChangeUsername}
                className="insta-form__input"
              />
            </div>
            <div className="insta">
              <label className="insta-form__label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="insta-form__input"
                onChange={this.onChangePassword}
              />
            </div>
            {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
            <button className="insta-form__button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
