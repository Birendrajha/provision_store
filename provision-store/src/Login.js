import React, { useState } from 'react';
import { TextField, Button, Container, Typography, CssBaseline,Box } from '@mui/material';


const LoginForm = ({setIsLogin}) => {
//  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const loginEndpoint = 'https://apiv2stg.promilo.com/user/oauth/token';

  const handleLogin = async () => {
    const payload = `userName=${email}&password=${encodeURIComponent(password)}&grant_type=password`;

    try {
      const response = await fetch(loginEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload,
      });
      setIsLogin(true)
      if (response.ok) {
        const data = await response.json();
        // Handle the token or any other response data here
        console.log('Token:', data.access_token);
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  const validateAndSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (password.trim() === '') {
      alert('Please enter your password.');
      return;
    }

    alert('Validation successful. Submitting form...');
    console.log('Email:', email);
    console.log('Password:', password);
    handleLogin()
    // Add code to send the login request to your server here.
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box display='flex' justifyContent='center' alignItems='center'>
        <form>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
           // className={classes.submit}
            onClick={validateAndSubmit}
          >
            Login
          </Button>
        </form>
        </Box>
      </div>
    </Container>
  );
};

export default LoginForm;
