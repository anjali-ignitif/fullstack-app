import '../app/globals.css';
import React, { useEffect, useState } from 'react';
import { fetchData } from '@/app/api';


const UserListPage = () => {
  const [users, setUsers] = useState<any[]>([]); // Change 'any' to the type of your user object if possible
  const [privileges, setPrivileges] = useState<any[]>([]); // Change 'any' to the type of your privilege object if possible

  useEffect(() => {
    fetchData('users')
      .then((data) => {
	setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching expense history:', error);
      });

    fetchData('privilages')
      .then((data) => {
	setPrivileges(data);
      })
      .catch((error) => {
        console.error('Error fetching expense history:', error);
      });
  }, [])

  return (
    <div className="h-screen flex flex-col">
      <div className="flex h-1/2">
        <div className="w-1/2 border-r border-gray-300 p-4">
          <h2 className="text-xl font-bold m-4">Users List</h2>
          {users.map((user) => (
            <div key={user.id} className="h-20 flex items-center px-4 card mt-2">
              <div>{user.username}</div>
            </div>
          ))}
        </div>

        <div className="w-1/2 p-4">
          <h2 className="text-xl font-bold m-4"> Designations</h2>
          {users.map((user) => (
            <div key={user.id} className="h-20 flex items-center px-4 card mt-2">
              <div>{user.previlages[0]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-grow bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">Users with Different Designations</h2>
        {users.map((user) => (
          <div
            key={user.id}
            className={`bg-${user.previlages[0]}-500 h-16 rounded-md p-2 mb-2 card mt-2`}
          >
            {user.username}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListPage;
