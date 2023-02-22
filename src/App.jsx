import React from "react";
import './App.css';
import { LANDING_URL, LOGIN_URL } from "./constants/url";
import { Routes, Route, BrowserRouter, Router } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { ChatsPage } from "./pages/ChatsPage/ChatsPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { FeedbackPage } from "./pages/FeedbackPage/FeedbackPage";
import { ConsultsPage } from "./pages/ConsultsPage/ConsultsPage";

import Sidebar from './components/SideBar/Sidebar';





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
    <BrowserRouter>
      <div className="flex"> 
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" exact={true} element={<LandingPage />} />
            <Route path="/chats" exact={true} element={<ChatsPage />} />
            <Route path="/consults" exact={true} element={<ConsultsPage />} />
            <Route path="/feedback" exact={true} element={<FeedbackPage />} />
            <Route path="/login" exact={true} element={<LoginPage />} />
            <Route path="/register" exact={true} element={<RegisterPage />} />
          </Routes>
        </div>
      </div>   
    </BrowserRouter>
      
  );
}


export default App;
