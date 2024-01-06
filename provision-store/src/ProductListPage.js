import React,{useState,useEffect} from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  CssBaseline,
  Avatar,
  Box,
  AppBar, Toolbar, InputBase, IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
const ProductList = () => {
  const containerStyle = {
    paddingTop: '16px',
    paddingBottom: '16px',
  };

  const cardStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const cardMediaStyle = {
    paddingTop: '85%', // 16:9
  };

  const cardContentStyle = {
    flexGrow: 1,
  };

  const appBarStyle = {
    backgroundColor: '#f56c42', // Replace with your desired color
  };

  const titleStyle = {
    flexGrow: 1,
  };

  const searchContainerStyle = {
    position: 'relative',
    borderRadius: 4,
    backgroundColor: 'white',
    marginLeft: 0,
    width: '40%',

  };

  const searchIconStyle = {
    padding: '10px',
    paddingTop:'12px',
    position: 'absolute',
    pointerEvents: 'none',
  };

  const inputBaseStyle = {
    padding: '10px',
    paddingLeft: '40px', // Adjust based on the search icon size
    width: '100%',
  }
  const [productList,setProductList] = useState([]);
  const [searchQuery,setSearchQuery] = useState('');
  const getProduct = async () => {
   // const payload = `userName=${email}&password=${encodeURIComponent(password)}&grant_type=password`;

    try {
      const response = await fetch('https://api.kalpav.com/api/v1/product/category/retail', {
        method: 'GET',
       
        headers: {
          'Authorization': 'Basic UHJvbWIsbzpxNCE1NkBaeSN4MiRHQg==',
        },
      });
      console.log(response)
      if (response.ok) {
        const data = await response.json();
         const productList = data.response;
         console.log('productList:', productList);
        setProductList(productList);
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };
  useEffect(()=>{
    getProduct()
  },[]);
  const handleSearch  = ()=>{
   const searchedProduct =  productList.filter((product) =>
    product.productCategory.productCategoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setProductList(searchedProduct);
  }
  const handleSearchOnEnter = (event)=>{
    if (event.key === 'Enter') {
      handleSearch();
    }
  }
  useEffect(()=>{
        if(searchQuery.length===0){
          getProduct();
        }
  },[searchQuery])

  return (
    <Container maxWidth="lg" style={containerStyle}>
    <Box marginBottom={2} paddingBottom={9}>
     <AppBar position="fixed" style={appBarStyle}>
      <Toolbar>
      <Avatar src={`http://www.hindigraphics.in/wp-content/uploads/2019/01/pro.png`}/>
        <Typography variant="h6" style={titleStyle}>
         Provision Store
        </Typography>
        <div style={searchContainerStyle}>
        <IconButton style={searchIconStyle} aria-label="search" disabled>
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Search..."
            style={inputBaseStyle}
            inputProps={{ 'aria-label': 'search' }}
            onChange={(event)=>{setSearchQuery(event.target.value)}}
            onKeyDown={handleSearchOnEnter}
          />
        </div>
      </Toolbar>
    </AppBar>
    </Box>
      <CssBaseline />
      <Grid container spacing={2}>
        {productList.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <Card elevation={7} style={cardStyle}>
              <CardMedia
                style={cardMediaStyle}
                image={product.productCategory.productCategoryImage}
                title={product.productCategory.productCategoryName}
              />
              <CardContent style={cardContentStyle}>
                <Typography gutterBottom variant="h5" component="div">
                  {product.productCategory.productCategoryName}
                </Typography>
                <Typography>{product.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
