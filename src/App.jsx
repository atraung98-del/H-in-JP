
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";

import Homepage from './pages/seeker/Home'
import Searchfilter from './pages/seeker/searchfilter'
import Saved from './pages/seeker/saved';
import Provider from './pages/provider/providerprofile';
import AllProperties from './pages/provider/allproperties';
import Uploads from './pages/provider/upload';
import Messages from './pages/provider/messages';
import Settings from './pages/provider/settings';
import Signup from './pages/provider/signup';
import ProtectedRoute from './features/auth/ProtectedRoute';
function App() {
 return(
      <BrowserRouter>
          <Routes>
               <Route path="/" element={<Homepage/>}/>
               <Route path="/searchfilter" element={<Searchfilter/>}/>
               <Route path="/auth" element={<Signup/>}/>
               <Route element={<ProtectedRoute profileType="renter"/>}>
                    <Route path="/saved" element={<Saved/>}/>
               </Route>
               <Route element={<ProtectedRoute profileType="homeowner"/>}>
                    <Route path="/provider" element={<Provider/>}/>
                    <Route path="/provider/properties" element={<AllProperties/>}/>
                    <Route path="/provider/uploads" element={<Uploads/>}/>
                    <Route path="/provider/messages" element={<Messages/>}/>
                    <Route path="/provider/settings" element={<Settings/>}/>
               </Route>
               <Route path="*" element={<h1>Page not found</h1>}/>
               
          </Routes>
          
      </BrowserRouter>
 ) 
}

export default App
