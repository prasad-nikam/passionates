import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

function Search() {
    return (
        <div>
            <TextField
                id="outlined-multiline-flexible"
                label="Search Box"
                multiline
                fullWidth
                sx={{ m: 1, width: '90%' }}
                maxRows={16}
                name='msg'
            />
            <Button
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ margin: "5px", height: "60px" }}
            >
                Search
            </Button>
            <br />
            <span style={{ color: "gray", margin: "20px" }}> <i> search username or interests</i> </span>


        </div>
    )
}

export default Search