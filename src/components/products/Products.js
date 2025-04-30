import React, { useEffect, useState } from 'react';
import {
  Container, Grid, Typography, Card, CardContent, CardMedia, Button,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate, Link } from 'react-router';
//import { IconButton } from '@mui/material';
//import Editicon from '@mui/icons-material/Edit';
//import DeleteIcon from '@mui/icons-material/Delete';
// import { Link } from 'react-router-dom';
const Products = ({isAdmin}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('default');
  //const [isAdmin, setIsAdmin] = useState(true);  // Admin state
  const navigate = useNavigate();
  //'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBkZW1vLmNvbSIsImlhdCI6MTcyNzUyOTU5NCwiZXhwIjoxNzI3NTM3OTk0fQ.4N754S6XTm1Sdx75807m2bW-GsuZ8TeIgmAzMPNgyRC8XtxfvpMdf2tUhMthSwpX23QtGuqu6HFmnbpSEZlCLQ';
 const token='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBkZW1vLmNvbSIsImlhdCI6MTcyODA1NTYxNiwiZXhwIjoxNzI4MDY0MDE2fQ.oU_svzONjD4uTMlLyHc8uRBOZEDd1WriuonUqrr-LqVCPYLI7IOVSXO1ICJ5aojwAzM43EqcCr-zMVoBpvFZRQ'
   useEffect(() => {
    //const token = localStorage.getItem('authToken');
    //console.log("tkn: "+token);
    //const token='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBkZW1vLmNvbSIsImlhdCI6MTcyNzc2MjUzMywiZXhwIjoxNzI3NzcwOTMzfQ.xcKrL6Bi-nIoHEhFJ0jWZQEgpKu9VVfrEcJ08rDb7n9wFZ3JaBbEXZbLWQRavtp2xlKEqk5aGAmnSYkCK-Iapg';
    localStorage.setItem('x-auth-token', token); // Store the token
  if (!token) {
    navigate('/login');
  } else {
    fetchProducts();
  }
}, [navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://dev-project-ecommerce.upgrad.dev/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  console.log("prod"+isAdmin);
  // Category filtering
  const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };

  // Sorting by price
  const sortProductsByPrice = (order) => {
    setSortOrder(order);
    let sortedProducts = [...products];

    if (order === 'lowToHigh') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === 'highToLow') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProducts(sortedProducts);
  };
  //////////////////////////
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://dev-project-ecommerce.upgrad.dev/api/products/{id}`, {
        method: 'DELETE',
        headers: {
          
          'x-auth-token': token // Replace with your actual token logic
      },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Show alert message
      alert('Product deleted successfully!');

      // Update state to remove the deleted product from the list
      setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };
  /////////////////////////////

  // Filter products by selected category
  const displayedProducts = products.filter((product) => {
    return selectedCategory === 'ALL' || product.category === selectedCategory;
  });

  return (
    <Container>
      {/* Category Tabs */}
      <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          color="primary"
          value={selectedCategory}
          exclusive
          onChange={handleCategoryChange}
          aria-label="product categories"
        >
          <ToggleButton value="ALL">ALL</ToggleButton>
          <ToggleButton value="APPAREL">APPAREL</ToggleButton>
          <ToggleButton value="ELECTRONICS">ELECTRONICS</ToggleButton>
          <ToggleButton value="FOOTWEAR">FOOTWEAR</ToggleButton>
          <ToggleButton value="PERSONAL CARE">PERSONAL CARE</ToggleButton>
        </ToggleButtonGroup>
      </div>

      {/* Sort Dropdown and Products Grid */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Sort Dropdown */}
        <div style={{ marginRight: '20px' }}>
          <FormControl variant="outlined" style={{ minWidth: 200 }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortOrder}
              onChange={(e) => sortProductsByPrice(e.target.value)}
              label="Sort by"
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="highToLow">Price: High to Low</MenuItem>
              <MenuItem value="newest">Newest</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Product Cards Grid */}
        <Grid container spacing={4} style={{ flexGrow: 1 }}>
          {loading && <Typography>Loading...</Typography>}
          {error && <Typography color="error">{error}</Typography>}

          {displayedProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card style={{width:300}}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.imageUrl  || 'https://placehold.jp/100x100.png'}// Placeholder image
                  alt={product.name}
                />
                <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between' ,height:100}}>
                        <Typography variant="h6">{product.name}</Typography>
                       <Typography variant="h6" align="right">${product.price} </Typography>
                             </div>
                  <Typography>
                    {product.description}
                  </Typography>
                  <div>

                  {/* Admin and User Differentiation */}
                {/*}  {!isAdmin ?( <Button variant="contained" size="small" color="primary">BUY</Button>)
                :<>
                (<Button variant="contained" size="small" color="primary">Delete</Button>
                  <Button variant="contained" size="small" color="primary">Edit</Button>)
                  </>
                }*/}
                 {isAdmin ? (
                    <>
                      {/*<Button variant="contained" color="secondary" style={{ marginTop: '10px' }}>
                        EDIT PRODUCT
                      </Button>
                      <Button variant="contained" color="error" style={{ marginTop: '10px', marginLeft: '10px' }}>
                        DELETE
                      </Button>*/}
                      <div style={{display:'flex',gap:'10px'}}>
                       {/*<Editicon  style={{color:'grey',cursor:'pointer'}}/>*/}
                      {/* {displayedProducts.map((product) => (
                        <div key={product.id}>
                        <span>{product.name}</span>
                         <Link to={`/edit/${product.id}`}>
                       <button>Edit</button>
                         </Link>
                        </div>

                        ))}
                         <Link to={`/ProductDetails/${product.id}`} >
                          <Link to="/ProductDetails">*/}
                          <Link to={`/ProductDetails/${product.id}`} >
                         <Button variant="contained" color="primary">
                      BUY
                    </Button>
                    </Link>
                        
                       {/*} <Link to="/edit" >*/}
                        <Link to={`/edit/${product.id}`} >
                       <Button>Edit</Button>
                         </Link>
                     {/*  <Deleteicon style={{color:'grey',cursor:'pointer'}} />*/}
                     <button onClick={() => handleDelete(product.id)} style={{ marginLeft: '10px' }}>
                     🗑️ Delete
                     </button>
                    {/*<IconButton onClick={() => handleDelete(product.id)} >
              <DeleteIcon />
            </IconButton>*/}
                      </div>
                    </>
                  ) : (
                    
                    <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                      BUY
                    </Button>
                    
                  )}
                   </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default Products;