import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../Authentication/AuthContext';
import { fetchPostsByLocation } from '../../Utils/FetchFunctions';
import Album from './Album';
import { Typography } from '@mui/material';

export default function BooksForYou({onView}){

    const [bookList, setBookList] = useState(null);
    const {authUser} = useAuth();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{

        const fetchLocation = async (id, city) => {
            setLoading(true);
            try {
                const bookList = await fetchPostsByLocation(id, city);
    
                if (bookList !== null) {
                    setBookList(bookList);
                }
            } catch (error) {
                console.error(`Error in fetchBookListData: ${error.message}`);
            }finally{
                setLoading(false);
            }
        };

        fetchLocation(authUser.id, authUser.city);
    },[authUser.id, authUser.city]);

return(
    <React.Fragment>
         {!bookList && <Typography>There are no Books in your City right now.</Typography>}
        {bookList && <Album title='Books in Your City' books={bookList} onView={onView} />}

    </React.Fragment>
)
}
