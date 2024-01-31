import React from 'react';
import { useState } from 'react';
import { TextField, Stack, Autocomplete } from '@mui/material';


function SearchInput({ books, onSearch, theme }) {

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
        <div>
            <Stack spacing={1} sx={{ width: 250 }}>
                <Autocomplete
                    {...defaultProps}
                    id="clear-on-escape"
                    clearOnEscape
                    value={null}
                    onChange={handleChange}
                    renderInput={(params) => (
                        <TextField {...params} label="Book Title" color='primary'
                        InputLabelProps={{
                            style: {
                                color: 'myTheme.palette.primary.main',
                                paddingLeft: '2px'
                            },
                        }}
                            sx={{
                                '& .MuiInputBase-input': {
                                    color: 'myTheme.palette.secondary.main'
                                }
                            }}
                        />
                    )}
                />
            </Stack>
        </div>
    )
}
export default SearchInput;