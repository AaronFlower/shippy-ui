import React from 'react'

class Authenticate extends React.Component {
    
    // eslint-disable-next-line
    constructor (props) {
        super(props)
    }

    state = {
        authenticated: false,
        email: '',
        password: '',
        err: '',
        token: ''
    }

    login = () => {
        fetch(`http://localhost:8080/rpc`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                request: {
                    email: this.state.email,
                    password: this.state.password,
                },
                service: 'shippy.auth',
                method: 'Auth.Auth'
            })
        })
        .then(res => res.json())
        .then(res => {
            this.props.onAuth(res.token)
            // this.setState({
            //     token: res.token,
            //     authenticated: true
            // })
        })
        .catch(err => this.setState({err, authenticated: false }))
    }

    signup = () => {
        fetch(`http://localhost:8080/rpc`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                request: {
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name,
                },
                service: 'shippy.auth',
                method: 'Auth.Create'
            })
        })
        .then(res => res.json())
        .then(res => {
            this.props.onAuth(res.token.token)
            // this.setState({
            //     token: res.token.token,
            //     authenticated: true
            // })
        })
        .catch(err => this.setState({ err, authenticated: false }))
    }

    setEmail = e => {
        this.setState({
            email: e.target.value
        })
    }

    setPassword = e => {
        this.setState({
           password: e.target.value
        })
    }

    setName = e => {
        this.setState({
            name: e.target.value
        })
    }

    render () {
        return (
            <div className='Authenticate'>
                <div className='Login'>
                  <div className='form-group'>
                    <input
                      type="email"
                      onChange={this.setEmail}
                      placeholder='E-Mail'
                      className='form-control' />
                  </div>
                  <div className='form-group'>
                    <input
                      type="password"
                      onChange={this.setPassword}
                      placeholder='Password'
                      className='form-control' />
                  </div>
                  <button className='btn btn-primary' onClick={this.login}>Login</button>
                  <br /><br />
                </div>
                <div className='Sign-up'>
                  <div className='form-group'>
                    <input
                      type='input'
                      onChange={this.setName}
                      placeholder='Name'
                      className='form-control' />
                  </div>
                  <div className='form-group'>
                    <input
                      type='email'
                      onChange={this.setEmail}
                      placeholder='E-Mail'
                      className='form-control' />
                  </div>
                  <div className='form-group'>
                    <input
                      type='password'
                      onChange={this.setPassword}
                      placeholder='Password'
                      className='form-control' />
                  </div>
                  <button className='btn btn-primary' onClick={this.signup}>Sign-up</button>
                </div>
          </div>
        )
    }
}

export default Authenticate
