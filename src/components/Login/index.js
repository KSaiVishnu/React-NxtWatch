import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import WatchContext from '../../context/WatchContext'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  login = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      body: JSON.stringify(userDetails),
      method: 'POST',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const {history} = this.props
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {
        expires: 30,
      })
      history.replace('/')
    } else {
      this.setState({showError: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, showPassword, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <WatchContext.Consumer>
        {value => {
          const {isDark} = value
          const logoUrl = isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          return (
            <div>
              <div>
                <img src={logoUrl} />
                <form onSubmit={this.login}>
                  <div>
                    <label htmlFor="username">USERNAME</label>
                    <input
                      value={username}
                      onChange={this.onChangeUsername}
                      type="text"
                      id="username"
                      placeholder="Username"
                    />
                  </div>
                  <div>
                    <label htmlFor="password">PASSWORD</label>
                    <input
                      onChange={this.onChangePassword}
                      value={password}
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <input
                      onChange={this.onChangeCheckbox}
                      id="checkbox"
                      type="checkbox"
                      checked={showPassword}
                    />
                    <label htmlFor="checkbox">Show Password</label>
                  </div>
                  <button type="submit">Login</button>
                  {showError && <p>{errorMsg}</p>}
                </form>
              </div>
            </div>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}

export default Login
