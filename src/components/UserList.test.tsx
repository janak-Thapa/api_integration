
import { render, screen, waitFor } from '@testing-library/react';
import UserList from './UserList';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';

// Create a mock instance
const mock = new MockAdapter(axios);

describe('UserList Component', () => {
    test('renders user names when data is fetched successfully', async () => {
        // Mock API response
        mock.onGet('https://jsonplaceholder.typicode.com/users').reply(200, [
            { id: 1, name: 'Leanne Graham' },
            { id: 2, name: 'Ervin Howell' },
        ]);

        render(<UserList />);

        // Assertions
        expect(screen.getByText('Loading...')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
            expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
        });
    });

    test('shows error message when API request fails', async () => {
        // Mock API failure
        mock.onGet('https://jsonplaceholder.typicode.com/users').reply(500);

        render(<UserList />);

        // Assertions
        await waitFor(() => {
            expect(screen.getByText('Failed to fetch users')).toBeInTheDocument();
        });
    });
});
