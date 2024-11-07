import { useEffect, useState, useCallback } from "react";
import UserCard from "./UserCard/UserCard";
import Form from "./Form/Form";

export default function ListUsers() {
  const
    [users, setUsers] = useState(null),
    [effect,setEffect] = useState(false),

    delUser = async id => {
      await fetch(`http://localhost:3003/users/${id}`, { method: 'DELETE' });
      setEffect(!effect)
    },

    addUser = async formData => {
      await fetch('http://localhost:3003/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      setEffect(!effect)
    };


  useEffect(() => {
    async function fetchUser() {
      try {
        const
          res = await fetch('http://localhost:3003/users');
        if (!res.ok) throw (new Error(res.status));
        const
          u = await res.json();
        setUsers(u);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [effect]);

  return (
    <>
      <Form add={addUser} />
      {users && users.map(user => <UserCard key={user.id} data={user} del={delUser} />)}
    </>
  )
}
