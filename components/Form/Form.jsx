import classes from '@/components/Form/Form.module.css';
import { useState } from 'react';

export default function Form({ add }) {
  const [valueForm, setValueForm] = useState({ name: '', email: '', phone: '' });
  
  const changeValue = (name, value) => {
    setValueForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form className={classes.form} onSubmit={event => event.preventDefault()}>
      <label>
        <input
          value={valueForm.name}
          onChange={event => changeValue('name', event.target.value)}
          name="name"
        />
        name
      </label>
      <label>
        <input
          value={valueForm.email}
          onChange={event => changeValue('email', event.target.value)}
          name="email"
        />
        email
      </label>
      <label>
        <input
          value={valueForm.phone}
          onChange={event => changeValue('phone', event.target.value)}
          name="phone"
        />
        phone
      </label>
      <button
        onClick={() => { add(valueForm); setValueForm({ name: '', email: '', phone: '' }); }}>
        ➕add</button>
    </form>
  );
}