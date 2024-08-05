import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    Button,
    Typography,
    Box,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import { SingleUserResponse } from '../../types/user';
import { convertDate } from '../../utils/dateConverter';
import { DatePicker } from '@mui/x-date-pickers';
import { SelectChangeEvent } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface UserDetailsModalProps {
    open: boolean;
    onClose: () => void;
    user: SingleUserResponse | null;
    onSave?: (user: SingleUserResponse) => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ open, onClose, user, onSave }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedUser, setEditedUser] = React.useState<SingleUserResponse | null>(null);
    const [errors, setErrors] = React.useState<{
        name: string;
        username: string;
        orders: string;
        dateOfBirth: string;
        status: string;
    }>({
        name: '',
        username: '',
        orders: '',
        dateOfBirth: '',
        status: ''
    });

    if (!user) return null;

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedUser(user);
    }

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedUser(null);
    }

    const handleSaveClick = () => {
        if (!editedUser) return;
        let hasError = false;
        const newErrors: Record<string, string> = {};

        if (!editedUser.name) {
            newErrors.name = 'Name is required';
            hasError = true;
        }
        if (!editedUser.username) {
            newErrors.username = 'Username is required';
            hasError = true;
        }
        if (editedUser.orders) {
            if (Number(editedUser.orders) < 0 || Number(editedUser.orders) > 10) {
                newErrors.orders = 'Orders should be between 0 and 10';
                hasError = true;
            }
        }
        if (!editedUser.dateOfBirth) {
            newErrors.dateOfBirth = 'Date of Birth is required';
            hasError = true;
        }
        if (!editedUser.status) {
            newErrors.status = 'Status is required';
            hasError = true;
        }

        setErrors({
            ...newErrors,
            name: newErrors.name || '',
            username: newErrors.username || '',
            orders: newErrors.orders || '',
            dateOfBirth: newErrors.dateOfBirth || '',
            status: newErrors.status || ''
        });

        if (hasError) return;

        if (onSave) {
            setIsEditing(false);
            onSave(editedUser);
            setEditedUser(null);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (!editedUser) return;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleDateChange = (date: Dayjs | null) => {
        if (!editedUser) return;
        setEditedUser({ ...editedUser, dateOfBirth: date?.toISOString() || '' });
    };

    const handleStatusChange = (e: SelectChangeEvent<string>) => {
        if (!editedUser) return;
        setEditedUser({ ...editedUser, status: e.target.value });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogContent>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '0.5fr, 1fr, 0.5fr',
                        gridTemplateRows: '1fr, repeat(6, 0.4fr)',
                        gridColumnGap: '10px',
                        gridRowGap: '5px',
                        width: '100%'
                    }}
                >
                    {!isEditing && (
                        <Box
                            sx={{
                                gridArea: '1 / 2 / 2 / 3',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Box
                                component="img"
                                src={user.image}
                                alt={user.name}
                                sx={{ width: '100px', height: '100px', borderRadius: 10, border: '1px solid #ccc' }}
                            />
                        </Box>
                    )}


                    {isEditing ? (
                        <Box sx={{ gridArea: '2 / 1 / 3 / 3' }}>
                            <TextField
                                fullWidth
                                name="name"
                                label="Name"
                                value={editedUser?.name || ''}
                                onChange={handleInputChange}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Box>
                    ) : (
                        <Box sx={{ gridArea: '2 / 2 / 3 / 3' }}>
                            <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                <strong>{user.name}</strong>
                            </Typography>
                        </Box>
                    )}



                    {isEditing ? (
                        <Box sx={{ gridArea: '3 / 1 / 4 / 3' }}>
                            <TextField
                                fullWidth
                                name="username"
                                label="Username"
                                value={editedUser?.username || ''}
                                onChange={handleInputChange}
                                error={!!errors.username}
                                helperText={errors.username}
                            />
                        </Box>
                    ) : (
                        <Box sx={{ gridArea: '3 / 2 / 4 / 3' }}>
                            <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                {user.username}
                            </Typography>
                        </Box>
                    )}

                    {!isEditing && (
                        <Box sx={{ gridArea: '4 / 1 / 5 / 2', marginTop: '10px', textAlign: 'right' }}>
                            <Typography variant="body1"><strong>ID:</strong> {user.id}</Typography>
                        </Box>
                    )}



                    {isEditing ? (
                        <Box sx={{ gridArea: '4 / 1 / 5 / 3', marginTop: '10px' }}>
                            <TextField
                                fullWidth
                                name="orders"
                                label="Orders"
                                type="number"
                                value={editedUser?.orders || ''}
                                onChange={handleInputChange}
                                error={!!errors.orders}
                                helperText={errors.orders}
                            />
                        </Box>
                    ) : (
                        <Box sx={{ gridArea: '4 / 3 / 5 / 4', marginTop: '10px' }}>
                            <Typography variant="body1">
                                <strong>Orders:</strong> {user.orders}
                            </Typography>
                        </Box>
                    )}


                    {!isEditing && (
                        <Box sx={{ gridArea: '5 / 1 / 6 / 2', marginTop: '10px', textAlign: 'right' }}>
                            <Typography variant="body1"><strong>Last Login Date:</strong></Typography>
                            <Typography variant="body2">{convertDate(user.lastLoginDate || '')}</Typography>
                        </Box>
                    )}



                    {isEditing ? (
                        <Box sx={{ gridArea: '5 / 1 / 6 / 3', marginTop: '10px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date of Birth"
                                    value={editedUser?.dateOfBirth ? dayjs(editedUser.dateOfBirth) : null}
                                    onChange={handleDateChange}
                                />
                            </LocalizationProvider>
                        </Box>
                    ) : (<>
                        <Box sx={{ gridArea: '5 / 3 / 6 / 4', marginTop: '10px' }}>
                            <Typography variant="body1"><strong>Date of Birth:</strong></Typography>
                            <Typography variant="body2">{convertDate(user.dateOfBirth)}</Typography>
                        </Box>
                    </>
                    )}



                    {isEditing ? (
                        <Box sx={{ gridArea: '6 / 1 / 7 / 2', textAlign: 'center', marginTop: '10px' }}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={editedUser?.status || ''}
                                    onChange={handleStatusChange}
                                    error={!!errors.status}
                                >
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="blocked">Blocked</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    ) : (
                        <Box sx={{ gridArea: '6 / 2 / 7 / 3', textAlign: 'center', marginTop: '10px' }}>
                            <Typography variant="body1"><strong>Status:</strong></Typography>
                            <Typography variant="body2">{user.status}</Typography>
                        </Box>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                {isEditing ? (
                    <>
                        <Button onClick={handleCancelClick} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSaveClick} color="primary">
                            Save
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={handleEditClick} color="primary">
                            Edit
                        </Button>
                        <Button onClick={onClose} color="primary">
                            Close
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog >
    );
};

export default UserDetailsModal;
