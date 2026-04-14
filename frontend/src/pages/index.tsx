import '../app/globals.css';
import React, { useEffect, useState } from 'react';
import { fetchData } from '@/app/api';

const UserListPage = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchData('users')
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error(error);
        setUsers([]);
      });
  }, []);

  const getColor = (roles: any) => {
    if (!Array.isArray(roles)) return "bg-gray-500";

    if (roles.includes("ADMIN")) return "bg-red-500";
    if (roles.includes("DEVOPS")) return "bg-orange-500";
    if (roles.includes("DEVELOPER")) return "bg-green-500";
    if (roles.includes("MONITOR")) return "bg-cyan-500";

    return "bg-gray-500";
  };

  return (
    <div className="h-screen flex flex-col">

      <div className="flex h-1/2">

        {/* USERS */}
        <div className="w-1/2 border-r p-4">
          <h2 className="text-xl font-bold m-4">Users List</h2>

          {users.map((user) => (
            <div key={user?.id} className="h-20 flex items-center px-4 mt-2">
              {user?.username}
            </div>
          ))}
        </div>

        {/* DESIGNATIONS */}
        <div className="w-1/2 p-4">
          <h2 className="text-xl font-bold m-4">Designations</h2>

          {users.map((user) => (
            <div key={user?.id} className="h-20 flex items-center px-4 mt-2">
              {Array.isArray(user?.previlages)
                ? user.previlages.join(", ")
                : "No roles"}
            </div>
          ))}
        </div>

      </div>

      {/* COLORS */}
      <div className="flex-grow bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">Users with Different Designations</h2>

        {users.map((user) => {
          const roles = Array.isArray(user?.previlages) ? user.previlages : [];

          return (
            <div
              key={user?.id}
              className={`${getColor(roles)} h-16 rounded-md p-2 mb-2 text-black`}
            >
              {user?.username}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default UserListPage;
