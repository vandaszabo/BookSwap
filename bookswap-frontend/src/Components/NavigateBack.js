import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function NavigateBack({ path }) {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'left' }}>
            <Button
                variant='outlined'
                sx={{ mb: 4 }}
                size="small"
                onClick={() => navigate(path)}>
                <ArrowBackIcon />
            </Button>
        </Box>

    )
}