import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


import {useParams,useNavigate, useLocation} from 'react-router-dom'

const About = () => {

  const navigate = useNavigate()
  const {state} = useLocation()
   
  const [post,setPost]: any = useState([])
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
   
  async function updateUsers() {
      const obj = {
        id:id,
        title: title,
        body:body
      }
      axios.put(`http://jsonplaceholder.typicode.com/posts/${id}`,obj)
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

  async function deleteUsers() {
      axios.delete(`http://jsonplaceholder.typicode.com/posts/${id}`)
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
    
  React.useEffect(() => {
      async function getUsers() {
        axios.get(`http://jsonplaceholder.typicode.com/posts/${state}`)
        .then(response => {
            console.log(response.data);
            setPost( response.data );
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
      getUsers();
  }, []);


  const Update = (e: any) => {
      alert("Update");
      updateUsers();
      navigate('/');
  }
  const Delete = (e: any) => {
    alert("Delete");
    deleteUsers();
    navigate('/');
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
      <AppBar  sx={{ flexGrow: 1,textAlign:'center',setWidth:'100%'}}>
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
            Details
          </Typography>
          <Button color="inherit" onClick={()=> navigate('/')}>HOME</Button>
        </Toolbar>

      </AppBar>
      <Box sx={makeStyles} component="form">
          <TextField
              value={post.id  || ''}
              name="id"
              label="User ID"
              InputLabelProps={{ shrink: true }}
              onChange={(e)=> setId(e.target.value)}
          />
          <TextField
              defaultValue={post.title || ''}
              name="title"
              label="Title"
              multiline
              rows={2}
              InputLabelProps={{ shrink: true }}
              onChange={(e)=> setTitle(e.target.value)}
          />
          <TextField
              defaultValue={post.body || ''}
              name="body"
              label="Body"
              InputLabelProps={{ shrink: true }}
              multiline
              rows={5}
              onChange={(e)=> setBody(e.target.value)}
          />
          <Box component="span" sx={{display:'flex',flexDirection: 'row'}}>
          <Button variant="contained" color="primary" onClick={Update}>
              Update
          </Button>
          <Button variant="contained" color="secondary" sx={{marginLeft: "20px"}} onClick={Delete}>
              Delete
          </Button>
        </Box>
      </Box>
  </Container>
  );
};

export default About;