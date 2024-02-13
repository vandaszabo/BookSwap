import React from 'react';
import { TextField, Stack, Autocomplete } from '@mui/material';

//*********-------Main function for autocomplete Search input-------*********//
function SearchInput({ books, onSearch }) {

    //*********-------Provide data for autocomplete functionality-------*********//
    const defaultProps = {
        options: books,
        getOptionLabel: (option) => option.title,
        getOptionKey: (option) => option.postId
    };

    //*********-------Handle Change for Search bar input field-------*********//
    const handleChange = (event, newValue) => {
        event.preventDefault();
        onSearch(newValue)
    };

    return (
        <div>
            <Stack spacing={1} sx={{ width: 250}}>
                <Autocomplete
                sx={{
                    '& .MuiOutlinedInput-root': {
                        padding: '0'
                    }
                }}
                    {...defaultProps}
                    id="clear-on-escape"
                    clearOnEscape
                    value={null}
                    onChange={handleChange}
                    renderInput={(params) => (
                        <TextField {...params} label="Book Title" color='primary'
                        InputLabelProps={{
                            style: {
                                color: '#333333',
                                paddingLeft: '2px',
                                fontSize: 'small'
                            },
                        }}
                        />
                    )}
                />
            </Stack>
        </div>
    )
}
export default SearchInput;