import '../app/globals.css';
import React, { useEffect, useState } from 'react';
import { fetchData } from '@/app/api';

const UserListPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [privileges, setPrivileges] = useState<any[]>([]);

  useEffect(() => {
    fetchData('users')
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });

    fetchData('privilages')
      .then((data) => {
        setPrivileges(data);
      })
      .catch((error) => {
        console.error('Error fetching privileges:', error);
      });
  }, []);

  // ✅ FIXED COLOR MAPPING
  const getColor = (roles: string[]) => {
    if (roles.includes("ADMIN")) return "bg-red-500";
    if (roles.includes("DEVOPS")) return "bg-orange-500";
    if (roles.includes("DEVELOPER")) return "bg-green-500";
    if (roles.includes("MONITOR")) return "bg-cyan-500";
    return "bg-gray-500";
  };

  return (
    <div className="h-screen flex flex-col">

      {/* TOP SECTION */}
      <div className="flex h-1/2">

        {/* USERS LIST */}
        <div className="w-1/2 border-r border-gray-300 p-4">
          <h2 className="text-xl font-bold m-4">Users List</h2>
          {users.map((user) => (
            <div key={user.id} className="h-20 flex items-center px-4 card mt-2">
              <div>{user.username}</div>
            </div>
          ))}
        </div>

        {/* DESIGNATIONS */}
        <div className="w-1/2 p-4">
          <h2 className="text-xl font-bold m-4">Designations</h2>
          {users.map((user) => (
            <div key={user.id} className="h-20 flex items-center px-4 card mt-2">
              <div>{user.previlages.join(", ")}</div>
            </div>
          ))}
        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div className="flex-grow bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">Users with Different Designations</h2>

        {users.map((user) => (
          <div
            key={user.id}
            className={`${getColor(user.previlages)} h-16 rounded-md p-2 mb-2 card mt-2 text-black`}
          >
            {user.username}
          </div>
        ))}

      </div>

    </div>
  );
};

export default UserListPage;
