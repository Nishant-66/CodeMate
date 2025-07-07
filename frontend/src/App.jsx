import React from 'react';
import {BrowserRouter,Routes,Route} from  'react-router-dom';
import {Home} from './Components/Home'
import {Signup} from './Components/Signup'
import {Login} from './Components/Login'
import {Hero} from './Components/Hero'
import {Profile} from './Components/Profile'
import {Connections} from './Components/Connections'
import{Feed} from './Components/Feed'
import {ChangePassword} from './Components/ChangePassword'
function App(){
  return (
    <div>
      <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home></Home>} >
        <Route path="/" element={<Hero/>}/>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/connections" element={<Connections/>}/>
        <Route path="/changepassword" element={<ChangePassword/>}/>
        </Route>
       </Routes>
      </BrowserRouter>

      
    </div>
  )
}
export default App;

