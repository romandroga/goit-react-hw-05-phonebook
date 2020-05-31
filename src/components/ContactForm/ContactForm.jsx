import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import styles from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  id: '',
  number: '',
};

export default class ContactForm extends Component {
  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
  };

  state = {
    ...INITIAL_STATE
  };

  nameInputId = uuidv4();
  numberInputId = uuidv4();

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      id: uuidv4(),
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onAddContact({ ...this.state });
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;
    const { contactForm, submitButton, inputForm } = styles;
    return (
      <form
        onSubmit={this.handleSubmit}
        className={contactForm}
      >
        <label htmlFor={this.nameInputId}>Name</label>
        <input
          className={inputForm}
          type="text"
          id={this.nameInputId}
          name="name"
          onChange={this.handleChange}
          value={name}
        />
        <label htmlFor={this.numberInputId}>Number</label>
        <input
          className={inputForm}
          type="tel"
          id={this.numberInputId}
          name="number"
          onChange={this.handleChange}
          value={number}
        />
        <button
          className={submitButton}
          type="submit"
          disabled={!name || !number}
        >
          Add contact
        </button>
      </form>
    );
  }
}

