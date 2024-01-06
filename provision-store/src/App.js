import './App.css';
import React,{useState} from 'react';
import LoginForm from './Login';
import ProductList from './ProductListPage';
function App() {
  const [isLogin,setIsLogin] = useState(false);
  return (
    <div className="App">
    {!isLogin?(

   
      <LoginForm setIsLogin={setIsLogin}/>
      ):(
             <ProductList/>
      )}
    </div>
  );
}

export default App;
