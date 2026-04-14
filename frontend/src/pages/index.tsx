import '../app/globals.css';
import React, { useEffect, useState } from 'react';
import { fetchData } from '@/app/api';

const getColor = (role: string) => {
  switch (role) {
    case 'ADMIN':
      return 'bg-red-500 text-white';
    case 'DEVOPS':
      return 'bg-yellow-500 text-white';
    case 'DEVELOPER':
      return 'bg-green-500 text-white';
    case 'MONITOR':
      return 'bg-cyan-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const UserListPage = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchData('users')
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setUsers([]);
      });
  }, []);

  return (
    <div className="h-screen flex flex-col">

      {/* TOP SECTION */}
      <div className="flex h-1/2">

        {/* USERS */}
        <div className="w-1/2 border-r border-gray-300 p-4">
          <h2 className="text-xl font-bold m-4">Users List</h2>

          {users.map((user) => (
            <div
              key={user?.id}
              className="h-20 flex items-center px-4 mt-2"
            >
              {user?.username || 'Unknown'}
            </div>
          ))}
        </div>

        {/* DESIGNATIONS */}
        <div className="w-1/2 p-4">
          <h2 className="text-xl font-bold m-4">Designations</h2>

          {users.map((user) => {
            const roles = Array.isArray(user?.previlages)
              ? user.previlages
              : [];

            return (
              <div
                key={user?.id}
                className="h-20 flex items-center px-4 mt-2"
              >
                {roles.length > 0 ? roles.join(', ') : 'No roles'}
              </div>
            );
          })}
        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div className="flex-grow bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">
          Users with Different Designations
        </h2>

        {users.map((user) => {
          const roles = Array.isArray(user?.previlages)
            ? user.previlages
            : [];

          const role = roles[0]; // ✅ safe access

          return (
            <div
              key={user?.id}
              className={`${getColor(role)} h-16 rounded-md p-2 mb-2`}
            >
              {user?.username || 'Unknown'} — {roles.join(', ')}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default UserListPage;
