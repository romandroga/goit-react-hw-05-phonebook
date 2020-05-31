import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import slideTransition from '../../transitions/slide.module.css';
// Components
import Contact from './Contact/Contact';

const ContactList = ({ contacts, onDelete }) => (
  <TransitionGroup component="ul">
    {contacts.map(({ name, id, number }) => (
      <CSSTransition
        key={id}
        timeout={250}
        classNames={slideTransition}
        unmountOnExit
      >
        <Contact
          key={id}
          name={name}
          number={number}
          onDelete={() => onDelete(id)}
        />
      </CSSTransition>
    ))}
  </TransitionGroup>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactList;
