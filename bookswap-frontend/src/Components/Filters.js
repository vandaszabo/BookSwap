import React from 'react';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { InputLabel } from '@mui/material';
import { FormControl } from '@mui/material';

export default function Filters({ setFilterObj }) {

    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [locations, setLocations] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChangeGenre = (event) => {
        setSelectedGenre(event.target.value);
    };

    const handleChangeLanguage = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const handleChangeLocation = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleFilter = () => {
        setFilterObj({
            genre: selectedGenre,
            language: selectedLanguage,
            location: selectedLocation
        })
    };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch("http://localhost:5029/api/User/Location/List", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                if (data !== null) {
                    setLocations(data);
                }
            } catch (error) {
                console.error(`Error in fetchLocations: ${error.message}`);
            }
        };

        fetchLocations();
    }, [setLocations]);


    return (
        <Stack
            sx={{
                pt: [2, 4],
                color: (theme) => theme.palette.primary.main
            }}
            direction={['column', 'row']}
            spacing={2}
            justifyContent="center"
        >
            <FormControl
                sx={{ m: 1, minWidth: 120 }}
                size="small"
            >
                <InputLabel
                    id="genre"
                    sx={{
                        color: (theme) => theme.palette.primary.main
                    }}
                >
                    Genre
                </InputLabel>
                <Select
                    labelId="genreLabel"
                    id="genre"
                    value={selectedGenre}
                    label="Genre"
                    onChange={handleChangeGenre}
                    sx={{
                        color: (theme) => theme.palette.primary.main
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"fantasy"}>Fantasy</MenuItem>
                    <MenuItem value={"scifi"}>Sci-fi</MenuItem>
                    <MenuItem value={"romantic"}>Romantic</MenuItem>
                    <MenuItem value={"adventure"}>Adventure</MenuItem>
                    <MenuItem value={"drama"}>Drama</MenuItem>
                    <MenuItem value={"crime"}>Crime</MenuItem>
                    <MenuItem value={"thriller"}>Thriller</MenuItem>
                    <MenuItem value={"biography"}>Biography</MenuItem>
                    <MenuItem value={"psychology"}>Psychology</MenuItem>
                    <MenuItem value={"children"}>Children's Literature</MenuItem>
                </Select>
            </FormControl>
            <FormControl
                sx={{
                    m: 1,
                    minWidth: 120
                }}
                size="small">
                <InputLabel
                    id="language"
                    sx={{ 
                        color: (theme) => theme.palette.primary.main 
                    }}>
                    Language
                </InputLabel>
                <Select
                    labelId="languageLabel"
                    id="language"
                    value={selectedLanguage}
                    label="Language"
                    onChange={handleChangeLanguage}
                    sx={{ 
                        color: (theme) => theme.palette.primary.main 
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"en"}>English</MenuItem>
                    <MenuItem value={"hun"}>Hungarian</MenuItem>
                </Select>
            </FormControl>
            <FormControl
                sx={{ 
                    m: 1, 
                    minWidth: 120 
                }}
                size="small">
                <InputLabel
                    id="location"
                    sx={{ 
                        color: (theme) => theme.palette.primary.main 
                    }}>
                    Location
                </InputLabel>
                <Select
                    labelId="locationLabel"
                    id="location"
                    value={selectedLocation}
                    label="Location"
                    onChange={handleChangeLocation}
                    sx={{ 
                        color: (theme) => theme.palette.primary.main 
                    }}
                >
                    <MenuItem
                        value="">
                        <em>None</em>
                    </MenuItem>
                    {locations && locations.map((city, index) => (
                        <MenuItem
                            key={index}
                            value={city}>
                            {city}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                onClick={handleFilter}
                variant="contained"
                disabled={loading}
                sx={{ mt: [2, 0] }}
            >
                Filter
            </Button>
        </Stack>

    )
}