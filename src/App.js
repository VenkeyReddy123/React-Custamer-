import AddCard from "./HomeComponents/AddCard";
import HomePage from "./HomePage";
import ProductDisplay from "./ProductDisplay";
import Product_Filters from "./Product_Filters";
import Checking from "./Delivary/Checking";
import Payment from "./Delivary/Payment";
import CreateNewAccount from "./Accounts/CreateNewAccount";
import Login from "./Accounts/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Order from "./Delivary/Order";
import Book from "./Delivary/Book";
import Forget from "./Forget";
import Status from "./Delivary/Status";
import ProductListDisply from './HomeComponents/ProductsListDisply.jsx'




function App() {
  const val=localStorage.getItem('email')?'safag':''
  if(val){
    localStorage.setItem('request','sdfesrg')
  }
  else{
    localStorage.setItem('request','')
  }
  return (
    <div className="App">  
    <BrowserRouter>
      <Routes>
          {localStorage.getItem('request')?<Route path='/' element={<HomePage/>}/>:<Route path='/' element={<Login/>}/>}
           <Route path="/List" element={<ProductListDisply/>}/>
          <Route path='/Reg' element={<CreateNewAccount />} />
          <Route path='/Home' element={<HomePage />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Home' element={<HomePage />} />
          <Route path='/Product' element={<Product_Filters />} />
          <Route path='/Addcard' element={<AddCard />} />
          <Route path='/Orders' element={<Order/>} />
          <Route path='/Dis' element={<ProductDisplay/>}/>
          <Route path='/Check' element={<Checking/>}/>
          <Route path='/Pay' element={<Payment/>}/>
          <Route path='/Order' element={<Order/>}/>
          <Route path='/Book' element={<Book/>}/>
          <Route path='/For' element={<Forget/>}/>
          <Route path='/Sta' element={<Status />}/>
      </Routes>

      </BrowserRouter>
     
     
    
<>

</>
    </div>
  );
}

export default App;
