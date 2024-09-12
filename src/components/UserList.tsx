// src/components/UserList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the interface for a user
interface User {
    id: number;
    name: string;
}

// Define the state types
interface UserListState {
    users: User[];
    error: string | null;
    loading: boolean;
}

const UserList: React.FC = () => {
    const [state, setState] = useState<UserListState>({
        users: [],
        error: null,
        loading: true,
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
                setState({
                    users: response.data,
                    error: null,
                    loading: false,
                });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setState({
                    users: [],
                    error: 'Failed to fetch users',
                    loading: false,
                });
            }
        };

        fetchUsers();
    }, []);

    const { users, error, loading } = state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
};

export default UserList;
