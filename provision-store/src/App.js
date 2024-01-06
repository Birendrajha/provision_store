import './App.css';
import React,{useState} from 'react';
import LoginForm from './Login';
import ProductList from './ProductListPage';
import About from './About'
import { BrowserRouter as Router, Route, Link, Switch,Routes } from 'react-router-dom';
function App() {
  const [isLogin,setIsLogin] = useState(false);
  return (
    <div className="App">
    {/* {!isLogin?(

   
      <LoginForm setIsLogin={setIsLogin}/>
      ):(
             <ProductList/>
      )} */}
      {/* <LoginForm setIsLogin={setIsLogin} /> */}
      <Router>
      <Routes>
      {/* <Route path="/" element={ <LoginForm setIsLogin={setIsLogin} /> }></Route> */}
        <Route path="/"  element={<LoginForm setIsLogin={setIsLogin} />} />
        <Route path="/ProductList" element={<ProductList/>} />
        <Route path="/About" element={<About/>} />
      </Routes>
    </Router>

    </div>
  );
}

export default App;
