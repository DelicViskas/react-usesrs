import UserCard from "./UserCard/UserCard";
import Form from "./Form/Form";
import useSWR from 'swr';
import toast from 'react-hot-toast';

const
  API_URL = 'http://localhost:3003/users',
  fetcher = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('fetch ' + response.status);
    return await response.json();
  };

export default function ListUsers() {
  const
    { data, mutate } = useSWR(API_URL, fetcher, { revalidateOnFocus: false }),
    onClick = async event => {
      const
        action = event.target.closest('[data-action]')?.dataset?.action,
        id = event.target.closest('[data-id]')?.dataset?.id;
      if (!action) return;
      let optimisticData;
      const getPromise = () => {
        switch (action) {
          case 'DEL':
            optimisticData = data.filter(el => String(el.id) !== id)
            return fetch(`${API_URL}/${id}`, { method: 'DELETE' })
              .then(res => {
                if (!res.ok) throw (new Error(res.status + ' ' + res.statusText));
              });
          case 'ADD':
            const
              form = new FormData(event.target.closest('form')),
              formData = Object.fromEntries(form.entries());
            optimisticData = data.concat(formData);
            return fetch(API_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            }).then(res => {
              if (!res.ok) {
                throw (new Error(res.status + ' ' + res.statusText));
              }
            });
        }
      },
        promise = getPromise();
      if (promise) {
        toast.promise(promise, {
          loading: action.toLowerCase(),
          success: 'ok',
          error: (err) => `${err.toString()}`,
        })
      }

      await mutate(promise.then(() => optimisticData, () => fetcher()), { optimisticData, revalidate: true });
    };

  return (
    <div onClick={onClick}>
      <Form />
      {data && data.map(user => <UserCard key={user.email} data={user} />)}
    </div>
  )
}
