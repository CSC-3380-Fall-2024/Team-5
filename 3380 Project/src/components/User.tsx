import * as React from "react";
import { useEffect, useState } from "react";
import { database } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import "../CSS Files/App.css";

function Users() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const teamId = "Tl7Ph2s1udw5ceTihmDJ";
  async function getUsers() {
    const querySnapshot = await getDocs(
      collection(database, `teams/${teamId}/members/`)
    );

    const users = querySnapshot.docs.map((doc) => ({
      key: doc.id,
      ...doc.data(),
    }));
    setUsers(users);
  }
  useEffect(() => {
    getUsers();
    setLoading(false);

    // return cleanup function
  }, [loading]); // empty dependencies array => useEffect only called once

  if (loading) {
    return <h1>loading firebase data...</h1>;
  }

  return (
    <div className="container">
      <h1>Users:</h1>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.key}>{user.firstName + " " + user.lastName}</div>
        ))
      ) : (
        <h1>no users :(</h1>
      )}
    </div>
  );
}

export default Users;
