import { useState } from "react";
import { Box, Typography } from "@mui/material";
import {TextField} from "@mui/material";
import {Button} from "@mui/material";
import { useAuth } from "../Authentication/AuthContext";

export default function WaitingRoom({joinChatRoom}){

    const [chatroom, setChatroom] = useState();
    const {authUser} = useAuth();

    const handleSubmit = (e) =>{
        e.preventDefault();
        joinChatRoom(authUser.userName, chatroom);
    }

    return(
        <Box component="form" onSubmit={handleSubmit}>
        <Typography>Create Chatroom: </Typography>
          <TextField
            onChange={e => setChatroom(e.target.value)}
            label="chatroom"
            name="chatroom"
            id="chatroom"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: (theme) => theme.palette.primary.main,
              '&:hover': {
                backgroundColor: (theme) => theme.palette.secondary.main,
              },
            }}
          >
            Join
          </Button>
        </Box>
    )
};