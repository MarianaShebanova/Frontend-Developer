import React from 'react';
import axios from 'axios';

const emptyForm = { title: '', artist: '' }

class AddForm extends React.Component {
  state = {
    art: emptyForm
  }

  handleChange = e => {
    this.setState({
      art: {
        ...this.state.art,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    axios.post(``, this.state.art)
      .then(res => {
        this.props.setArt(res.data)
        this.setState({ art: emptyForm })
        this.props.history.push(`/`)
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="addFormStyles">
        <h2>Post Your Art!</h2>
        <form onSubmit={this.handleSubmit}>
          <h4>Title: </h4>
          <input className="titleStyles"
            type="text"
            name="title"
            value={this.state.art.title}
            onChange={this.handleChange}
            required
          />
          <h4>Artist: </h4>          
          <input className="titleStyles"
            type="text"
            name="artist"
            value={this.state.art.artist}
            onChange={this.handleChange}
            required
          /><br />
          <button className="postButton">Post</button>
        </form>
      </div>
    )
  }
}

export default AddForm; 