import React from 'react';
import { useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';

export default function ViewImage({ image, setViewImage }) {
    const [openModal, setOpenModal] = useState(true);

    const handleCloseModal = () => {
        setOpenModal(false);
        setViewImage(false);
    };

    return (
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogContent>
                    <img
                        src={image}
                        alt="full-size-cover"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                    />
                </DialogContent>
            </Dialog>
    )
};