import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {useNavigate} from 'react-router-dom';


const Home = () => {
  const navigate  = useNavigate();
    interface IPost {
        id: number;
        userId?: number;
        title: string;
        body: string;
      }
  const defaultPosts:IPost[] = [];

  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(defaultPosts);
  const [error, setError]: [string, (error: string) => void] = React.useState("");
  const [loading, setLoading] = useState(false);
    
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
        ) => {
        navigate('/about/${index}', {state: index});
        setSelectedIndex(index);
  };  

  useEffect(() => {
    const headers = {"Content-Type": "application/json"};
    axios.get<IPost[]>("https://jsonplaceholder.typicode.com/posts",{headers}).then(response => {
            setPosts(response.data);
            setLoading(false);
          }).catch(ex => {
            const error =
            ex.response.status === 404
              ? "Resource Not found"
              : "An unexpected error has occurred";
            setError(error);
            setLoading(false);
          });
  }, [setPosts, setLoading]);

  return (
    <Container maxWidth="sm">
      <AppBar sx={{setWidth:'100%'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <img src={require("../img/logo.png")}/>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <Button color="inherit" onClick={()=> navigate('/create')}>Create</Button>
        </Toolbar>
      </AppBar>
      <div className="my-2">
      
        <List component="nav" aria-label="main mailbox folders" sx={{marginTop:'70px'}}>
            {posts.map((post) => (
                <div key={post.id}>
                    <ListItemButton
                        selected={selectedIndex === post.id}
                        sx={{backgroundColor:'#8ACDEC'}}
                        onClick={(event) => handleListItemClick(event, post.id)}
                    >
                        <ListItemText primary={post.title} secondary={post.body} />
                    </ListItemButton>
                    <Divider/>
                </div>
            ))}        
          </List>
      </div>
    </Container>
    
  );
};
export default Home;