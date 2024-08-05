import { styled } from '@mui/system';
import { TableContainer, TableHead, TableRow } from '@mui/material';

export const DynamicTableContainer = styled(TableContainer)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 20px;
    width: 80%;
    background-color: #f5f5f5;
    opacity: 0.8;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

export const DynamicTableHead = styled(TableHead)`
    background-color: #f5f5f5;
    border-radius: 15px;
    th {
        font-weight: bold;
        font-size: 1.1rem;
        text-align: left;
    }
`;

export const DynamicTableRow = styled(TableRow)`
    td {
        font-size: 1rem;
    }
    &:nth-of-type(odd) {
        background-color: #f0f0f0;
    }
    &:hover {
        background-color: #e0e0e0;
    }
`;