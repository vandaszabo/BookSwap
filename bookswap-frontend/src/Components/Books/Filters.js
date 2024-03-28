import React from 'react';
import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { InputLabel } from '@mui/material';
import { FormControl } from '@mui/material';
import { fetchAllLocations } from '../../Utils/UserFunctions';
import { fetchPostsByLocation } from '../../Utils/BookFunctions';
import { useAuth } from '../Authentication/AuthContext';

export default function Filters({ books, setFilteredBooks }) {

    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [locations, setLocations] = useState(null);
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuth();

    const handleChangeGenre = (event) => {
        setSelectedGenre(event.target.value);
    };

    const handleChangeLanguage = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const handleChangeLocation = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleFilter = async() => {
        setLoading(true);

        let newList = books;
        if (selectedLocation) {
            newList = await fetchPostsByLocation(authUser.id, selectedLocation)
        }
        if (selectedGenre) {
            newList = newList.filter(b => b.category.toLowerCase().includes(selectedGenre.toLowerCase()))
        }
        if (selectedLanguage) {
            newList = newList.filter(b => b.language.toLowerCase().includes(selectedLanguage.toLowerCase()))
        }
        setFilteredBooks(newList);
        setLoading(false);
    };

    // Retrieve all distinct locations from all Users to Display at filter options
    useEffect(() => {
        const fetchLocations = async () => {

            setLoading(true);
            try {
                const locations = await fetchAllLocations();

                if (locations !== null) {
                    setLocations(locations);
                }
            } catch (error) {
                console.error(`Error in fetchLocations: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();

    }, [setLocations]);


    return (
        <Stack
            sx={{
                pt: [2, 3],
                pb: [1, 2],
                color: (theme) => theme.palette.primary.main,
                backgroundColor: (theme) => theme.palette.secondary.medium
            }}
            direction={['column', 'row']}
            spacing={2}
            justifyContent="center"
        >

            {/* Genres  */}
            <FormControl
                sx={{ minWidth: 120 }}
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
                    <MenuItem value={"novel"}>Novel</MenuItem>
                    <MenuItem value={"drama"}>Drama</MenuItem>
                    <MenuItem value={"scifi"}>Sci-fi</MenuItem>
                    <MenuItem value={"adventure"}>Adventure</MenuItem>
                    <MenuItem value={"romantic"}>Romantic</MenuItem>
                    <MenuItem value={"crime"}>Crime</MenuItem>
                    <MenuItem value={"thriller"}>Thriller</MenuItem>
                    <MenuItem value={"biography"}>Biography</MenuItem>
                    <MenuItem value={"psychology"}>Psychology</MenuItem>
                    <MenuItem value={"children"}>Children's Literature</MenuItem>
                </Select>
            </FormControl>

            {/* Languages */}
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
                    <MenuItem value={"hu"}>Hungarian</MenuItem>
                </Select>
            </FormControl>

            {/* Locations */}
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

            {/* Submit */}
            <Button
                onClick={handleFilter}
                variant="contained"
                disabled={loading}
                sx={{ mt: [2, 0] }}
            >
                Filter
            </Button>

            {/* Clear */}
            <Button
                onClick={() => (setSelectedGenre(""), setSelectedLanguage(""), setSelectedLocation(""), setFilteredBooks(null))}
                variant="outline"
                disabled={loading}
                sx={{ mt: [2, 0] }}
            >
                Reset
            </Button>
        </Stack>

    )
}