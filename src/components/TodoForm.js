import React from 'react';
import shortid from 'shortid';

export default class TodoForm extends React.Component {
  state = {
    text: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({
      id: shortid.generate(),
      text: this.state.text,
      complete: false,
    });
    this.setState({
      text: '',
    });
  };

  render() {
    return (
      <form className='form' autoComplete='off' onSubmit={this.handleSubmit}>
        <input
          className='form-input'
          name="text"
          value={this.state.text}
          onChange={this.handleChange}
          placeholder="todo..."
        />
        <button className='form-btn' onClick={this.handleSubmit}>+</button>
      </form>
    );
  }
}
