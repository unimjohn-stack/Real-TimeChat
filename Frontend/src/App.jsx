// import './App.css'
// import { Show, SignIn, SignInButton, SignUpButton, UserButton } from '@clerk/react'
// import Home from './Pages/Home'
// import { Button } from '@heroui/react'
import { ThemeProvider } from './context/ThemeContext'
import { WallpaperProvider } from './context/WallpaperContext'
import { Routes, Route, Navigate } from 'react-router'
import ChatPage from './Pages/ChatPage'
import AuthPage from './Pages/AuthPage'
import { useAuth } from '@clerk/react'
import PageLoader from './Components/PageLoader'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast';

function App() {

  const { isSignedIn, isLoaded } = useAuth();

  // const { checkAuth, isCheckingAuth, clearAuth } = useAuthStore();

  const clearAuth = useAuthStore((state) => state.clearAuth);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) checkAuth();

    else clearAuth();

  },[checkAuth, clearAuth, isLoaded, isSignedIn]);
  // todo...
  if (!isLoaded || (isSignedIn && isCheckingAuth)) return <PageLoader />;
  // axiosInstance.post("/api")

  return (
    <ThemeProvider>
      <WallpaperProvider>
        <Routes>
          <Route path='/' element={ isSignedIn ? <ChatPage /> : <Navigate to={"/auth"} replace/>} />
          <Route path='/auth' element={!isSignedIn ? <AuthPage /> : <Navigate to={"/"} replace/>} />
        </Routes>
        <Toaster />
      </WallpaperProvider>
    </ThemeProvider>
  )
}

export default App
