import React, {  useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';


import {useParams,Link,useNavigate, useLocation} from 'react-router-dom'

const Create = () => {

    const navigate = useNavigate()

    const {state} = useLocation()

    const [message, setMessage] = useState('')
    const {number} = useParams()
    
    const [post,setPost]: any = useState([])
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
    const [error, setError]: [string, (error: string) => void] = React.useState("");

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
  
   
    async function createUsers() {
      const obj = {
        id:id,
        title: title,
        body:body
      }
      axios.post(`http://jsonplaceholder.typicode.com/posts/${id}`,obj)
      .then(response => {
          console.log(response.data);
      }).catch(ex => {
        const error =
        ex.response.status === 404
          ? "Resource Not found"
          : "An unexpected error has occurred";
        setError(error);
        setLoading(false);
      });
      return;
    } 
    
    const createUser = (e: any) => {
      if (id && title && body){
        alert("Create new user");
        //createUsers();
        navigate('/');
      }else{
        alert("Morate popuniti polja");

      }
    }

    const makeStyles = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: '120px',
        marginBottom: '15px',
        '.MuiFormControl-root': {
            marginBottom: '20px',
        },
    };

    return (
      <Container  maxWidth="sm">
        <AppBar  sx={{ flexGrow: 1,textAlign:'center'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Create new user</Typography>
          <Button color="inherit" onClick={()=> navigate('/')}>HOME</Button>
        </Toolbar>
        </AppBar>
        <Box sx={makeStyles} component="form">
            <TextField
                name="id"
                label="User ID"
                InputLabelProps={{ shrink: true }}
                onChange={(e)=> setId(e.target.value)}
            />
            <TextField
                name="title"
                label="Title"
                multiline
                rows={1}
                InputLabelProps={{ shrink: true }}
                onChange={(e)=> setTitle(e.target.value)}
            />
            <TextField
                name="body"
                label="Body"
                InputLabelProps={{ shrink: true }}
                multiline
                rows={5}
                onChange={(e)=> setBody(e.target.value)}
            />
            <Box component="span" sx={{display:'flex',flexDirection: 'row'}}>
                <Button variant="contained" color="primary" onClick={createUser}>
                    Save
                </Button>
            </Box>
        </Box>
    </Container>
  );
};

export default Create;