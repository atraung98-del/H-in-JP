
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";

// import Homepage from './pages/seeker/Home'
import Searchfilter from './pages/seeker/searchfilter'
import Saved from './pages/seeker/saved';
import Provider from './pages/provider/providerprofile';
import AllProperties from './pages/provider/allproperties';
import Uploads from './pages/provider/upload';
import Messages from './pages/provider/messages';
import Settings from './pages/provider/settings';
import Signup from './signup'
import Homepage from './pages/seeker/Home';

function App() {
     
 return(
      <BrowserRouter>
      
          <Routes>
               
               <Route path="/" element={<Signup/>}/>
               <Route path="/Home" element={<Homepage/>}/>
               <Route path="/searchfilter" element={<Searchfilter/>}/>
               <Route path="/saved" element={<Saved/>}/>
               {/* <Route path="./Signup" element={<Signup/>}/> */}
               <Route path="/provider/Provider" element={<Provider/>}/>
               <Route path="/provider/Provider/allproperties" element={<AllProperties/>}/>
               <Route path="/provider/Provider/Uploads" element={<Uploads/>}/>
               <Route path="/provider/Provider/messages" element={<Messages/>}/>
               <Route path="/provider/Provider/settings" element={<Settings/>}/>
               
          </Routes>
          
      </BrowserRouter>
 ) 
}

export default App
