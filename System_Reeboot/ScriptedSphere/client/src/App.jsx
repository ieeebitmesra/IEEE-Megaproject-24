// import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import DashBoard from './Pages/DashBoard'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Projects from './Pages/Projects'
import PrivateRoute from './Components/PrivateRoute'
import OnlyAdmin from './Components/OnlyAdminPrivateRoute'
import CreatePost from './Pages/CreatePost'
import Contest from './Pages/Contest'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/contests' element={<Contest />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<DashBoard />} />
        </Route>
        <Route element={<OnlyAdmin />}>
          <Route path='/create-post' element={<CreatePost />} />
        </Route>
        <Route path='/projects' element={<Projects />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
