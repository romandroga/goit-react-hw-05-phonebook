import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
// Components
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Notification from './Notification/Notification';
// Utilities
import { filterContacts } from '../utilities';
// Styles
import slideTransition from '../transitions/slide.module.css';
import fadeTransition from '../transitions/fade.module.css';
import notificationTransition from '../transitions/notification-transition.module.css';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    notificationIsOpen: false,
  };

  componentDidMount() {
    const previousContacts = localStorage.getItem('contacts');
    if (previousContacts) {
      this.setState({ contacts: JSON.parse(previousContacts) });
    }
  }

  componentDidUpdate(prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = contact => {
    const { contacts } = this.state;
    if (contacts.some(elem => elem.name === contact.name)) {
      this.toggleNotification();
      setTimeout(this.toggleNotification, 2500);
      return;
    }
    this.setState(state => ({ contacts: [...state.contacts, contact] }));
  };

  deleteContact = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(elem => elem.id !== id),
    }));
  };

  changeFilter = e => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  toggleNotification = () => {
    this.setState(prevState => ({
      notificationIsOpen: !prevState.notificationIsOpen,
    }));
  };

  render() {
    const { contacts, filter, notificationIsOpen } = this.state;
    const filteredContacts = filterContacts(contacts, filter);
    return (
      <>
        <CSSTransition in timeout={500} classNames={slideTransition} appear>
          <h1 className="title">Phonebook</h1>
        </CSSTransition>

        <CSSTransition
          in={notificationIsOpen}
          timeout={250}
          classNames={notificationTransition}
          unmountOnExit
        >
          <Notification />
        </CSSTransition>

        <ContactForm onAddContact={this.addContact} />

        <CSSTransition
          in={contacts.length >= 2}
          timeout={250}
          classNames={fadeTransition}
          unmountOnExit
        >
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        </CSSTransition>

        {!!contacts.length && (
          <ContactList
            contacts={filteredContacts}
            onDelete={this.deleteContact}
          />
        )}
      </>
    );
  }
}
