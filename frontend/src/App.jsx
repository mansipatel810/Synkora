import React, { use, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ChatPage from './pages/ChatPage'
import CallPage from './pages/CallPage'
import SignUpPage from './pages/SignUpPage'
import NotificationsPage from './pages/NotificationsPage'
import OnboardingPage from './pages/OnboardingPage'
import  toast ,{ Toaster } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import PageLoader from './components/PageLoader'
import useAuthUser from "./hooks/useAuthUser";
import Layout from './components/Layout'
import { useThemeStore } from './store/useThemeStore'
import Friends from './pages/Friends'
const App = () => {

  const { authUser, isLoading } = useAuthUser();
  const { theme }=useThemeStore()
 


  
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader/>

  return (
    <div className="min-h-screen max-w-[1920px]" data-theme={theme}>

      {/* <button onClick={()=>setTheme("night")}>update color</button> */}
      {/* zustand  for global*/}
       <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <HomePage/>
          </Layout>
        ) : <Navigate to={!isAuthenticated?"/login":"/onboarding"}  />} />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />


        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />


        <Route path="/notifications" element={isAuthenticated ? <NotificationsPage /> : <Navigate to="/login" />} />

        {/* if not then redirects to onboarding page */}
         <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />


         <Route
            path="/friends"
            element={
              isAuthenticated ? (
                <Friends />
              ) : (
                <Navigate to="/login" />
              )
            }
          />



        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
