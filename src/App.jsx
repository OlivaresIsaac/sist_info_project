import React from "react";
import './App.css';
import { CHATS_URL, CONSULTS_URL, FEEDBACK_URL, LANDING_URL, LOGIN_URL, PROFILE_URL, REGISTER_URL } from "./constants/url";
import { Routes, Route, BrowserRouter, Router } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { ChatsPage } from "./pages/ChatsPage/ChatsPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { FeedbackPage } from "./pages/FeedbackPage/FeedbackPage";
import { ConsultsPage } from "./pages/ConsultsPage/ConsultsPage";
import { Layout } from "./components/Layout/Layout";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <BrowserRouter>

        {/* <Sidebar /> */}
     
          <Routes>
            <Route element={<Layout/>}>

              <Route path={LANDING_URL} exact={true} element={<LandingPage />} />
              <Route path={CHATS_URL} exact={true} element={<ChatsPage />} />
              <Route path={CONSULTS_URL} exact={true} element={<ConsultsPage />} />
              <Route path={FEEDBACK_URL} exact={true} element={<FeedbackPage />} />
              <Route path={LOGIN_URL} exact={true} element={<LoginPage />} />
              <Route path={REGISTER_URL} exact={true} element={<RegisterPage />} />
              <Route path={PROFILE_URL} exact={true} element={
              <PrivateRoute>
               <ProfilePage/>
              </PrivateRoute>
              } />
              <Route path="*" exact={true} element={<h1> NOT FOUND</h1>} /> 

            </Route>
           
          </Routes>
  
   
    </BrowserRouter>
      
  );
}


export default App;
