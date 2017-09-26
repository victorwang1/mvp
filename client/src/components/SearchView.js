import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('click');
    this.props.filterRestaurants(this.state.searchTerm);
  }

  handleChange(e) {
    this.setState({searchTerm: e.target.value});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input className="search" value={this.state.searchTerm} onChange={this.handleChange}></input>
          <button onClick={this.handleSubmit}>Search</button>
        </form>
      </div>
    )
  }
}

export default Search;
