import React, { useEffect, useState } from 'react';
import { AllUsersResponse } from '../../types/user';
import { getAllUsers, getUserById, blockUser, register, logout } from '../../services/user';
import DynamicTable from '../../components/dynamic_table/DynamicTable';
import UserDetailsModal from '../../components/user_details/UserDetailsModal';
import { SingleUserResponse } from '../../types/user';
import { Box, Button, Typography } from '@mui/material';
import AddUserModal from '../../components/add_user/AddUserModal';

export default function HomePage() {
    const [users, setUsers] = useState<AllUsersResponse[]>([]);
    const [selectedUser, setSelectedUser] = useState<SingleUserResponse | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [addUserModalOpen, setAddUserModalOpen] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response: AllUsersResponse[] = await getAllUsers();
                setUsers(response);
            } catch (error) {
                console.error(error);
            }
        };
        getUsers();
    }, []);

    const handleViewUser = async (id: number) => {
        const user = await getUserById(id);
        setSelectedUser(user);
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedUser(null);
    }

    const handleSaveUser = async (user: SingleUserResponse) => {
        try {
            await blockUser(user);
            const updatedUsers: any = users.map(u => {
                if (u.id === user.id) {
                    return user;
                }
                return u;
            });
            setUsers(updatedUsers);
            setModalOpen(false);
            setSelectedUser(null);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddUser = async (userData: FormData) => {
        try {
            await register(
                userData.get('username') as string,
                userData.get('password') as string,
                userData.get('name') as string,
                userData.get('orders') as unknown as number,
                userData.get('image') as File,
                userData.get('dateOfBirth') as string
            );
            const response: AllUsersResponse[] = await getAllUsers();
            setUsers(response);

            setAddUserModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = '/login';
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" color={"beige"}>Medic Lab</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button variant="contained" color="secondary" onClick={() => handleLogout()} sx={{ mr: 2 }}>
                        Logout
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => setAddUserModalOpen(true)}>
                        Add User
                    </Button>
                </Box>
            </Box>
            <DynamicTable users={users} onViewDetails={handleViewUser} />
            <UserDetailsModal user={selectedUser} open={modalOpen} onClose={handleCloseModal} onSave={handleSaveUser} />
            <AddUserModal open={addUserModalOpen} onClose={() => setAddUserModalOpen(false)} onSave={handleAddUser} />
        </Box>
    )
}
