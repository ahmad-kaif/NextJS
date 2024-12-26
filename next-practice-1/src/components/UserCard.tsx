import React from 'react';



const UserCard = ({ user}) => {
  return (
    <div className="flex flex-col border border-green-950 m-3">
      <p className="font-bold">Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserCard;