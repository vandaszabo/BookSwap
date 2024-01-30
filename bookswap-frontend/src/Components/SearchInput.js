import React from 'react';
import { useState } from 'react';
import { TextField, Stack, Autocomplete } from '@mui/material';


function SearchInput({ books, onSearch }) {

    const [value, setValue] = useState(null);

    const defaultProps = {
        options: books,
        getOptionLabel: (option) => option.title,
        getOptionKey: (option) => option.postId
    };

    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue)
        onSearch(newValue)
    };

    return (
        <Stack spacing={1} sx={{ width: 300 }}>
            <Autocomplete
                {...defaultProps}
                id="clear-on-escape"
                clearOnEscape
                value={null}
                onChange={handleChange}
                renderInput={(params) => (
                    <TextField {...params} label="Book Title" color='secondary' variant="standard"
                        sx={{
                            '& .MuiInputBase-input': {
                                color: '#FFFFFF'
                            }
                        }}
                    />
                )}
            />
        </Stack>
    )
}
export default SearchInput;