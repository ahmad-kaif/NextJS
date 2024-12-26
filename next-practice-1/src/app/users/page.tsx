import React from 'react'
import {users} from "../../../public/constants";
import UserCard from '@/components/UserCard.tsx';


const Users = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='text-4xl font-bold flex items-center justify-center mt-4 underline'>Users</div>

      <div className="container border border-black mt-6 flex items-center justify-start">
            <div className="flex flex-wrap card  border-green-950 m-3">
                {users.map((user)=> (
                    <UserCard key={user.email} user={user} />
                ))}
                {/* {users.map((user) => (
                    <div>
                        {user.name}
                        {user.email}
                    
                    </div>
                    
                ))} */}
            </div>
      </div>
    </div>
  )
}

export default Users;
