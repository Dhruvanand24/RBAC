"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
};

type Role = {
  id: string;
  name: string;
  permissions: string[];
};

type Permission = string;

type SortField = "name" | "email" | "role" | "status";
type SortOrder = "asc" | "desc";

type AdminContextType = {
  users: User[];
  roles: Role[];
  permissions: Permission[];
  addUser: (user: Omit<User, "id">) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addRole: (role: Omit<Role, "id">) => void;
  updateRole: (id: string, role: Partial<Role>) => void;
  deleteRole: (id: string) => void;
  addPermission: (permission: Permission) => void;
  deletePermission: (permission: Permission) => void;
  searchUsers: (query: string) => User[];
  getUsersPage: (
    page: number,
    pageSize: number,
    sortField: SortField,
    sortOrder: SortOrder
  ) => User[];
  getTotalUsers: () => number;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    // Simulating API calls to fetch initial data
    setUsers([
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "Active",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "User",
        status: "Active",
      },
      {
        id: "3",
        name: "Alice Johnson",
        email: "alice@example.com",
        role: "User",
        status: "Inactive",
      },
      {
        id: "4",
        name: "Bob Williams",
        email: "bob@example.com",
        role: "Manager",
        status: "Active",
      },
      {
        id: "5",
        name: "Charlie Brown",
        email: "charlie@example.com",
        role: "User",
        status: "Active",
      },
      {
        id: "6",
        name: "Diana Prince",
        email: "diana@example.com",
        role: "User",
        status: "Active",
      },
      {
        id: "7",
        name: "Evan Parker",
        email: "evan@example.com",
        role: "Manager",
        status: "Inactive",
      },
      {
        id: "8",
        name: "Fiona Lee",
        email: "fiona@example.com",
        role: "Admin",
        status: "Active",
      },
      {
        id: "9",
        name: "George Chen",
        email: "george@example.com",
        role: "User",
        status: "Inactive",
      },
      {
        id: "10",
        name: "Hannah Kim",
        email: "hannah@example.com",
        role: "User",
        status: "Active",
      },
      {
        id: "11",
        name: "Ian Murphy",
        email: "ian@example.com",
        role: "Manager",
        status: "Inactive",
      },
      {
        id: "12",
        name: "Julia Rodriguez",
        email: "julia@example.com",
        role: "Admin",
        status: "Active",
      },
    ]);
    setRoles([
      { id: "1", name: "Admin", permissions: ["read", "write", "delete"] },
      { id: "2", name: "User", permissions: ["read"] },
      { id: "3", name: "Manager", permissions: ["read", "write"] },
    ]);
    setPermissions(["read", "write", "delete"]);
  }, []);

  const addUser = (user: Omit<User, "id">) => {
    setUsers([...users, { ...user, id: Date.now().toString() }]);
  };

  const updateUser = (id: string, updatedUser: Partial<User>) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
    );
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const addRole = (role: Omit<Role, "id">) => {
    setRoles([...roles, { ...role, id: Date.now().toString() }]);
  };

  const updateRole = (id: string, updatedRole: Partial<Role>) => {
    setRoles(
      roles.map((role) => (role.id === id ? { ...role, ...updatedRole } : role))
    );
  };

  const deleteRole = (id: string) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  const addPermission = (permission: Permission) => {
    setPermissions([...permissions, permission]);
  };

  const deletePermission = (permission: Permission) => {
    setPermissions(permissions.filter((p) => p !== permission));
  };

  const searchUsers = (query: string): User[] => {
    const lowercaseQuery = query.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowercaseQuery) ||
        user.email.toLowerCase().includes(lowercaseQuery) ||
        user.role.toLowerCase().includes(lowercaseQuery)
    );
  };

  const getUsersPage = (
    page: number,
    pageSize: number,
    sortField: SortField,
    sortOrder: SortOrder
  ): User[] => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const sortedUsers = [...users].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return sortedUsers.slice(start, end);
  };

  const getTotalUsers = (): number => {
    return users.length;
  };

  return (
    <AdminContext.Provider
      value={{
        users,
        roles,
        permissions,
        addUser,
        updateUser,
        deleteUser,
        addRole,
        updateRole,
        deleteRole,
        addPermission,
        deletePermission,
        searchUsers,
        getUsersPage,
        getTotalUsers,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
