import Home from './pages/Home.js'
import Update from './pages/Update.js';
import UpdateForm from './components/CarUpdateForm.js';

//import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
function App() {

  


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Outlet />,
      children: [
        { path: "/Home" , element: <Home/> },
        { path: "/Update", element: <Update/> },
        { path: "/Update/:id", element: <UpdateForm/> },
      ],
    },
  ]);

  return(
    <>

    <RouterProvider router={router}/>



    {/*
      <Router>
        <Routes>

          <Route path="/" element={<Home/>} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/Update" element={<Update/>} />
          <Route path="/Update/:id" element={<UpdateForm/>} />

        </Routes>
      </Router>
  */} 
    </>
  )
}





export default App;
