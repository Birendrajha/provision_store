import React, { useState } from 'react';
import { TextField, Button, Container, Typography, CssBaseline,  Box,
  AppBar, Toolbar, Grid,Avatar,InputAdornment, IconButton} from '@mui/material';
  import VisibilityIcon from '@mui/icons-material/Visibility';
  import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
  import { useNavigate } from "react-router-dom";

const LoginForm = ({setIsLogin}) => {
  const appBarStyle = {
    backgroundColor: '#f56c42', // Replace with your desired color
  };
  const navigate = useNavigate();

  const titleStyle = {
    flexGrow: 1,
  };
//  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError,setEmailError] = useState('');
  const [passwordError,setPasswordErr]  = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const loginEndpoint = 'https://apiv2stg.promilo.com/user/oauth/token';

  const handleLogin = async (hashPassword) => {
    const payload = `userName=${email}&password=${encodeURIComponent(hashPassword)}&grant_type=password`;

    try {
      const response = await fetch(loginEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload,
      });
     
      navigate("/ProductList");

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

  const hashPasswordInSha256 = async(password)=>{
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
  
    // Use the SubtleCrypto API for hashing
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  const validateAndSubmit = async() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])/;
    if (!emailRegex.test(email)) {
     setEmailError('Please Enter A Valid Email Id')
      return;
    }

    if (password.trim() === '') {
      setPasswordErr('Please enter your password.');
      return;
    }
    if(password.length<8){
      setPasswordErr('Password Must Be 8 Char Long');
      return;
    }
    if(!passwordRegex.test(password)){
      setPasswordErr('Password Must Contain A Capital Letter ,A small Letter ,A Number & Special Char');
      return;
    }
    hashPasswordInSha256(password).then(hashPassword => handleLogin(hashPassword));
   
  };

  return (
    <>
     <Box marginBottom={2} paddingBottom={9}>
     <AppBar position="fixed" style={appBarStyle}>
      <Toolbar>
      <Avatar src={`http://www.hindigraphics.in/wp-content/uploads/2019/01/pro.png`}/>
      <Box paddingX={2}>
        <Typography variant="h6" style={titleStyle}>
         Provision Store
        </Typography>
        </Box>
      </Toolbar>
    </AppBar>
    </Box>
      <CssBaseline />
      <Box padding={3}>
      <Grid container spacing={4}>
      <Grid item key='#1' xs={12} sm={12} md={6}>
      <img src='http://www.hindigraphics.in/wp-content/uploads/2019/01/pro.png' style={{width:'100%',height:'100%'}}/>
      </Grid>
      <Grid item key='#2' xs={12} sm={12} md={6}>
      <div>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Typography component="h1" variant="h5">
         Please Login To Proceed
        </Typography>
        </Box>
        <Box  justifyContent='left' alignItems='center'>
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
            error = {emailError.length>0}
            helperText= {emailError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
            onChange={(e) => setPassword(e.target.value)}
            error = {passwordError.length>0}
            helperText= {passwordError}
          />
          <Box paddingY={5}>
          <Button
            fullWidth
            variant="contained"
            style={{backgroundColor: '#f56c42'}}
           // className={classes.submit}
            onClick={validateAndSubmit}
          >
            Login
          </Button>
          </Box>
        </form>
        </Box>
      </div>
      </Grid>
      
      </Grid>
      </Box>
    </>
  );
};

export default LoginForm;
