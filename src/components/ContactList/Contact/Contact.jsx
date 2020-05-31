import React from 'react';
import PropTypes from 'prop-types';
import { deleteButton, contact } from './Contact.module.css';

const Contact = ({ name, number, onDelete }) => (
  <li className={contact}>
    <span>{name}</span>
    <span>{number}</span>
    <button type="button" onClick={onDelete} className={deleteButton}>
      &#10006;
    </button>
  </li>
);

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Contact;
