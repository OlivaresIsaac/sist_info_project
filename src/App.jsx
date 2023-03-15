import React from "react";
import './App.css';
import { CHATS_URL, CHECKOUTURL, CONSULTS_URL, FEEDBACK_URL, LANDING_URL, LOGIN_URL, PROFILE_URL, REGISTER_URL } from "./constants/url";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LandingController } from "./pages/LandingPage/LandingController";
import { ChatsController } from "./pages/ChatsPage/ChatsController";
import { LoginController } from "./pages/LoginPage/LoginController";
import { RegisterController } from "./pages/RegisterPage/RegisterController";
import { FeedbackController } from "./pages/FeedbackPage/FeedbackController";
import { ConsultsController } from "./pages/ConsultsPage/ConsultsController";
import { Layout } from "./components/Layout/Layout";
import { ProfileController } from "./pages/ProfilePage/ProfileController";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { CheckoutController } from "./pages/CheckoutPage/CheckoutController";

function App() {
  return (
    <BrowserRouter>
    
          <Routes>
            <Route element={<Layout/>}>

              <Route path={LANDING_URL} exact={true} element={<LandingController />} />
              
              <Route path={CHATS_URL} exact={true} element={
                <PrivateRoute>
                <ChatsController/>
               </PrivateRoute>} />

              <Route path={CONSULTS_URL} exact={true} element={
               <PrivateRoute>
              <ConsultsController />
              </PrivateRoute>} />
              
              <Route path={FEEDBACK_URL} exact={true} element={
                <PrivateRoute>
                <FeedbackController/>
               </PrivateRoute>
              } />
              <Route path={LOGIN_URL} exact={true} element={<LoginController />} />
              <Route path={REGISTER_URL} exact={true} element={<RegisterController />} />
              <Route path={PROFILE_URL} exact={true} element={
              
              <PrivateRoute>
               <ProfileController/>
              </PrivateRoute>
              } />

              <Route path={CHECKOUTURL} exact={true} element={
              
              <PrivateRoute>
               <CheckoutController/>
              </PrivateRoute>
              } />

              <Route path="*" exact={true} element={<h1> NOT FOUND</h1>} /> 

            </Route>
           
          </Routes>
  
   
    </BrowserRouter>
      
  );
}


export default App;
