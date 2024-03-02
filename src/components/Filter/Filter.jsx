// Filter.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterContacts, selectFilter } from '../redux/filterSlice';
import s from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = (event) => {
    dispatch(filterContacts(event.target.value));
  };

  return (
    <form>
      Find contacts by name
      <input type="text" name="filterInput" value={filter} onChange={handleChange} className={s.input}/>
    </form>
  );
};

export default Filter;
