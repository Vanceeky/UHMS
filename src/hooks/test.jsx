import React, { useState, useEffect, useContext, useMemo, useCallback, createContext, memo } from "react";

// ✅ 1. useContext: Create a simple Theme Context
const ThemeContext = createContext("light");

// ✅ 2. React.memo: Memoized child component
const UserList = memo(({ users, onSelect }) => {
  console.log("UserList re-rendered");
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} onClick={() => onSelect(user)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
});

export default function ExampleComponent() {
  // ✅ 3. useState: Manage local states
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // ✅ 4. useContext: Access theme from context
  const theme = useContext(ThemeContext);

  // ✅ 5. useEffect: Fetch data after component mounts
  useEffect(() => {
    console.log("Fetching users...");
    setUsers([
      { id: 1, name: "Jin Mori" },
      { id: 2, name: "Han Daewi" },
      { id: 3, name: "Yu Mira" },
    ]);
  }, []);

  // ✅ 6. useMemo: Cache filtered results to avoid re-computation
  const filteredUsers = useMemo(() => {
    console.log("Filtering users...");
    return users.filter((u) =>
      u.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [users, filter]);

  // ✅ 7. useCallback: Cache function to avoid re-creating on every render
  const handleSelectUser = useCallback((user) => {
    setSelectedUser(user);
  }, []);

  return (
    <div style={{ padding: "1rem", background: theme === "dark" ? "#222" : "#f9f9f9" }}>
      <h2>User List</h2>

      <input
        placeholder="Search user..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <UserList users={filteredUsers} onSelect={handleSelectUser} />

      {selectedUser && (
        <p>
          Selected: <strong>{selectedUser.name}</strong>
        </p>
      )}
    </div>
  );
}
