import React from 'react';
import $ from 'jquery';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: ''
    }
  }

  componentWillMount() {
    this.getInfo();
  }

  getInfo() {
    $.ajax({
      url: '/message',
      dataType: 'json'
    })
     .done(data => this.setState({message: data}))
     .fail(err => console.log(err)) ;
  }

  render() {
    return (
      <div>
        {this.state.message.message}
        {/* <Map /> */}
      </div>
    );
  }
}



export default App;
