import { Box } from "@mui/material";
import {Button} from "@mui/material";

export default function WaitingRoom({joinPrivateChat}){

    const handleSubmit = (e) =>{
        e.preventDefault();
        joinPrivateChat();
    }

    return(
        <Box component="form" onSubmit={handleSubmit}>
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
            Chat
          </Button>
        </Box>
    )
};