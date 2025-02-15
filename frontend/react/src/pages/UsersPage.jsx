import React, { useState, useEffect } from "react";
import { getUsers } from "../services/api";  // Importar la función getUsers

const UsersPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getUsers();  // Obtener los usuarios
            setUsers(data);  // Actualizar el estado
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Users List</h1>
            {users.length > 0 ? (
                users.map((user) => (
                    <div key={user.id}>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                    </div>
                ))
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default UsersPage;