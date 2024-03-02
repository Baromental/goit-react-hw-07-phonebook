// ContactForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, selectContacts } from '../redux/contactsSlice';
import { filterContacts } from '../redux/filterSlice';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    name === 'name' ? setName(value) : setNumber(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const existingContact = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());

    if (existingContact) {
      alert('Contact with this name already exists!');
    } else {
      dispatch(addContact({ name, number }));
      dispatch(filterContacts(''));
      resetForm();
    }
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.input}>
        Name
        <input type="text" name="name" value={name} onChange={handleChange} required />
      </label>

      <label className={styles.input}>
        Number
        <input type="tel" name="number" value={number} onChange={handleChange} required />
      </label>

      <button className={styles.button} type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;
