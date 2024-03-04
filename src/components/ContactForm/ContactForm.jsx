import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../articles/operations';
import { selectContacts } from '../redux/contactsSlice';
import s from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const contacts = useSelector(selectContacts);
  const isLoading = useSelector((state) => state.contacts.isLoading);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'phone') {
      setPhone(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddContact(name, phone);
    setName('');
    setPhone('');
  };

  const handleAddContact = (name, phone) => {
    const newContact = {
      name: name.trim(),
      phone: phone.trim(),
    };
    const isContactExist = contacts.some((contact) => contact.name === name);
    if (isContactExist) {
      alert(`${name} is already in contacts`);
      return;
    }
    dispatch(addContact(newContact));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.input}>
        Name
        <input type="text" name="name" value={name} onChange={handleChange} required />
      </label>

      <label className={s.input}>
        Phone
        <input type="tel" name="phone" value={phone} onChange={handleChange} required />
      </label>

      <button className={s.button} type="submit" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add contact'}
      </button>
    </form>
  );
};

export default ContactForm;