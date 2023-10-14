import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const User = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);
  console.log(users);

  const handleDelete = id => {
    console.log(id);
    // to delete
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert("Deleted Successfully");
          const remaining = users.filter(user => user._id !== id);
          setUsers(remaining);
        }
      });
  };

  return (
    <div>
      <h2>Users: {users.length}</h2>
      <div>
        {users.map(user => (
          <p key={user._id}>
            {user.name} : {user.email}{" "}
            <Link to={`/update/${user._id}`}>
              <button>Update</button>
            </Link>
            <button onClick={() => handleDelete(user._id)}>X</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default User;
