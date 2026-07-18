
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";

import Homepage from './pages/seeker/Home'
import Searchfilter from './pages/Seeker/searchfilter'
import Saved from './pages/seeker/saved';
function App() {
 return(
      <BrowserRouter>
          <Routes>
               

               <Route path="/" element={<Homepage/>}/>
               <Route path="/searchfilter" element={<Searchfilter/>}/>
               <Route path="/saved" element={<Saved/>}/>
          </Routes>
      
      </BrowserRouter>
 ) 
}

export default App
