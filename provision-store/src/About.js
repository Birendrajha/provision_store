import React from 'react';
import {
  Typography,
  Container,
  Box,Button,
  Paper,
} from '@mui/material';

import { useNavigate } from "react-router-dom";
const About = () => {
        const buttonStyle = {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex:1000
        };
      const navigate = useNavigate();
  return (
    <Container>
     <Box><Button style={buttonStyle} onClick={()=>{navigate("/productList")}}>Back</Button>
</Box>
      <h1>About Page</h1>   
      <Paper
          key='#paper'
          elevation={6}
          style={{
            height: 200,
            marginBottom: 8, // Adjust as needed
            padding: 16, // Adjust as needed
          }}
        >
          <Typography variant='h6'>
          How to Start The Project 
          </Typography>
          <Typography variant='body1'>Clone the project : </Typography>
          <Typography variant='body1'>Navigate to folder : cd provision_store </Typography>
          <Typography variant='body1'>Navigate to Root Directory Of Project : cd provision-store </Typography>
          <Typography variant='body1'>Do run  npm install : npm install to install all the Packages and dependency </Typography>
          <Typography variant='body1'>Then Run npm start to run the project in your Local Machine </Typography>
        </Paper>
        <Box paddingY={2}>
        <Paper
          key='#paper'
          elevation={6}
          style={{
            height: 150,
            marginBottom: 8, // Adjust as needed
            padding: 16, // Adjust as needed
          }}
        >
          <Typography variant='h6'>
         Diffculty Faced :
          </Typography>
           <Typography>Login Api was not working as Expected ,Niether it gives me the token which i supposed to send in header of product list application</Typography>
        </Paper>
        </Box>
    </Container>
  );
};

export default About;
