import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Home} from './Components/Home'
import {Hero} from './Components/Hero'
import {Login} from './Components/Login'
import {Signup} from './Components/Signup'
import {Feed} from './Components/Feed'
function App() {
  return (
    <div>
      <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home></Home>} >
        <Route path="/" element={<Hero/>}/>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
        
        </Route>
       </Routes>
      </BrowserRouter>
      

      
    </div>
  )
}

export default App