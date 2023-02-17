import React from "react";
import ReactDOM from "react-dom/client";
import logo from './logo.svg';
import './App.css';
import {
  LANDING_URL,
  LOGIN_URL,
} from "./constants/url";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { Layout } from "./pages/Layout/Layout";
// import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
// import { PublicRoute } from "./components/PublicRoute/PublicRoute";

export default function App() {
  // <React.StrictMode>
     return (
      <BrowserRouter>
      <Routes>
        {/* creo que este es navbar */}
        {/* <Route path={LANDING_URL} element={<Layout />}> */}
      
          <Route
          path={LANDING_URL}
             index element={
              // <PublicRoute>
                <LandingPage />
              // </PublicRoute>
            }
          />

          <Route
            path={LOGIN_URL}
            element={
              // <PublicRoute>
                <LoginPage />
              // </PublicRoute>
            }
          />
         
         {/* </Route> */}
      </Routes>
    </BrowserRouter>
     )
  // </React.StrictMode>
};

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


// export default App;
