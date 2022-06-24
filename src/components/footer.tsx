import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Footer = () => {
    const makeStyles = {
        display: 'flex',
        backgroundColor:'#2E2CA3',
        justifyContent: 'center',
        height:'70px',
        textColor:'white',
        marginTop:'30px',
        textAlign:'center',
    }
  return (
    <Container sx={makeStyles} maxWidth={false}>
        <p>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1,color:'white' }}>
          Footer
        </Typography>
        </p>
    </Container>
  );
};
export default Footer;