
import './App.css';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/Home';
import NavBar from './components/NavBar';
import AddProductComp from './components/AddProductComp';
import Products from './components/Products';
import Cart from './components/Cart';
import { useSelector } from 'react-redux';
import Product from './components/Product';

function App() {
  const recivedData=useSelector(state=>state)
  return (
    <Router>
      <div className="App">
        {/* <NavBar/> */}
         {/* <SignInForm /> */}
         {/* <SignUpForm/>  */}
         {/* <AddProductComp/> */}
         {/* <Products/> */}
         {/* <Cart/> */}
         {recivedData.finalData.navBar && <NavBar/>}
      </div>

      <Route exact path='/home' component={Home}/>
      <Route exact path='/' component={SignInForm}/>
      <Route exact path='/sign_up' component={SignUpForm}/>
      <Route exact path='/add_product' component={AddProductComp}/>
      <Route exact path='/products' component={Products}/>
      <Route exact path='/cart' component={Cart}/>
      <Route exact path='/product' component={Product}/>
    </Router>
  );
}

export default App;
