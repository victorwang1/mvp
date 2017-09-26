import React from 'react';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAccountChange = this.handleAccountChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit() {

  }

  handleAccountChange() {

  }

  handlePasswordChange() {

  }

  render() {
    return (
      <div className="account">
        <form onSubmit={this.handleSubmit}>
          Account:
          <input onChange={this.handleAccountChange}></input>
          Password:
          <input onChange={this.handlePasswordChange}></input>
          <button>Login</button>
        </form>
      </div>
    );
  }
}

export default Account;
