import React from "react";
import ReactDOM from "react-dom/client";
import logo from './logo.svg';
import './App.css';
import {
  LANDING_URL,
  LOGIN_URL,
} from "./constants/url";
//import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
// import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
// import { PublicRoute } from "./components/PublicRoute/PublicRoute";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         {/* creo que este es navbar */}
//         {/* <Route element={<LandingPage />}> */}
        

//           <Route
//             path={LANDING_URL}
//             element={
//               <PublicRoute>
//                 <LandingPage />
//               </PublicRoute>
//             }
//           />

//           <Route
//             path={LOGIN_URL}
//             element={
//               <PublicRoute>
//                 <LoginPage />
//               </PublicRoute>
//             }
//           />
         
//          {/* </Route> */}
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );


function App() {
  return (
    <LandingPage/>
  );
}


export default App;
