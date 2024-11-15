import classes from '@/components/UserCard/UserCard.module.css'

export default function UserCard({ data }) {
  const
    { name, id, email, phone, address: { city } = '', address: { street } = '', address: { suite } = '', company: { name: cname } = '' } = data;

  
  return (
    <div data-id={id} className={classes.userCard}>
      <span>{name} ({id})</span>
      <span>{email}</span>
      <span>{phone}</span>
      <div>
        <span>{city}</span>
        <span>{street} </span>
        <span>{suite}</span>
      </div>
      <div>{cname ? 'Company:' : ''} <span>{cname}</span></div>
      <button data-action={'DEL'}>❌del</button>
    </div>
  )
}