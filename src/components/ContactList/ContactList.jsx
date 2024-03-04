// ContactList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../articles/operations';
import { selectContacts  } from '../redux/contactsSlice';
import { selectFilter } from '../redux/filterSlice';
import s from './ContactList.module.css';

 const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteContact(id));
    } catch (error) {
      console.error('Error deleting contact:', error.message);
    }
  };

  return (
    <ul className={s.list}>
      {filteredContacts.map(({ id, name, phone }) => (
        <li key={id} className={s.item}>
          {name}: {phone}
          <button className={s.button} type="button" onClick={() => handleDelete(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
