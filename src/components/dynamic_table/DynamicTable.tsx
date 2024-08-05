import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    IconButton,
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { AllUsersResponse } from '../../types/user';
import { DynamicTableContainer, DynamicTableHead, DynamicTableRow } from './dynamicTableStyle';
import { convertDateTime } from '../../utils/dateConverter';

interface DynamicTableProps {
    users: AllUsersResponse[];
    onViewDetails: (id: number) => void;
}

const DynamicTable: React.FC<DynamicTableProps> = ({ users, onViewDetails }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <DynamicTableContainer >
                <Table>
                    <DynamicTableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Last Login Date</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </DynamicTableHead>
                    <TableBody>
                        {users.map((user) => (
                            <DynamicTableRow key={user.id} onClick={() => onViewDetails(user.id)}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{convertDateTime(user.lastLoginDate)}</TableCell>
                                <TableCell>{user.role.name}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => onViewDetails(user.id)}>
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                            </DynamicTableRow>
                        ))}
                    </TableBody>
                </Table>
            </DynamicTableContainer>
        </div>
    )
};

export default DynamicTable;