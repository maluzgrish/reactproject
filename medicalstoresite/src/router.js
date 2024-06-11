import { createBrowserRouter } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Addmedicine from "./components/Medicines/Addmedicine";
import Listmedicine from "./components/Medicines/Listmedicine";
import Editmedicine from "./components/Medicines/Editmedicine";

import App from "./App";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: '/signup', element: <Register/> },
    { path: '/login', element: <Login/> },
    { path: '/addmedicine', element: <Addmedicine/> },
    { path: '/listmedicine', element: <Listmedicine/> },
    {path:"/editmedicine/:id", element:<Editmedicine />} ,

]);

export default router;