import React, { useState, ChangeEvent } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    Box
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

interface AddUserModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (userData: FormData) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ open, onClose, onSave }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [orders, setOrders] = useState<number | string>('');
    const [imageUrl, setImageUrl] = useState<File | null>(null);
    const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(dayjs(new Date()));

    const [errors, setErrors] = useState<{
        username: string;
        password: string;
        name: string;
        orders: string;
        dateOfBirth: string;
    }>({
        username: '',
        password: '',
        name: '',
        orders: '',
        dateOfBirth: ''
    });

    const handleSave = () => {
        let hasError = false;
        const newErrors: Record<string, string> = {};

        if (!username) {
            newErrors.username = 'Username is required';
            hasError = true;
        }
        if (!password) {
            newErrors.password = 'Password is required';
            hasError = true;
        }
        if (!name) {
            newErrors.name = 'Name is required';
            hasError = true;
        }
        if (orders) {
            if (Number(orders) < 0 || Number(orders) > 10) {
                newErrors.orders = 'Orders should be between 0 and 10';
                hasError = true;
            }
        }
        if (!dateOfBirth) {
            newErrors.dateOfBirth = 'Date of Birth is required';
            hasError = true;
        }

        setErrors({
            ...newErrors,
            username: newErrors.username || '',
            password: newErrors.password || '',
            name: newErrors.name || '',
            orders: newErrors.orders || '',
            dateOfBirth: newErrors.dateOfBirth || ''
        });


        if (hasError) return;

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('name', name);
        formData.append('orders', String(orders));
        if (imageUrl) {
            formData.append('image', imageUrl);
        }
        formData.append('dateOfBirth', dateOfBirth ? dateOfBirth.toISOString() : '');

        onSave(formData);
        setUsername('');
        setPassword('');
        setName('');
        setOrders('');
        setImageUrl(null);
        setDateOfBirth(null);
        onClose();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setImageUrl(event.target.files[0]);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New User</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ display: 'grid', gap: 2 }}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        error={!!errors.username}
                        helperText={errors.username}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        label="Orders"
                        type="number"
                        value={orders}
                        onChange={(e) => setOrders(e.target.value)}
                        fullWidth
                        error={!!errors.orders}
                        helperText={errors.orders}
                    />
                    <Button variant="contained" component="label">
                        Upload Image
                        <input type="file" hidden onChange={handleFileChange} />
                    </Button>
                    {imageUrl && (
                        <Box component="img" src={URL.createObjectURL(imageUrl)} alt="User Image" sx={{ width: 100, height: 100, borderRadius: 1, border: '1px solid #ccc' }} />
                    )}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date of Birth"
                            value={dateOfBirth}
                            onChange={(newValue) => setDateOfBirth(newValue)}
                        />
                    </LocalizationProvider>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddUserModal;
