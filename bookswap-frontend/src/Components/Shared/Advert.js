import React from 'react';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';

export default function Advert({ title, description, buttonText, image, path }) {

    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(path);
    };

    return (

        <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', maxWidth: '100%' }}
            >
                {/* Image */}
                <CardMedia
                    component="div"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '200px',
                        width: '100%',
                        background: `url(${image}) center/cover no-repeat`,
                    }}
                />
                <CardContent sx={{ flexGrow: 1 }}>

                    {/* Advert title */}
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>

                    {/* Description */}
                    <Typography variant="body2">{description}</Typography>
                </CardContent>

                <CardActions>

                    {/* Action button */}
                    <Button
                        onClick={handleClick}
                        sx={{ textTransform: 'none', width: '100%', color: (theme)=> theme.palette.secondary.black , backgroundColor: (theme)=> theme.palette.secondary.medium,
                        '&:hover': {
                            backgroundColor: (theme) => theme.palette.primary.main,
                            color: (theme)=> theme.palette.primary.light
                        } }} variant='contained'>
                        {buttonText}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
};