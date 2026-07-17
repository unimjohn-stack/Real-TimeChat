// import './App.css'
// import { Show, SignIn, SignInButton, SignUpButton, UserButton } from '@clerk/react'
// import Home from './Pages/Home'
// import { Button } from '@heroui/react'
// const { checkAuth, isCheckingAuth, clearAuth } = useAuthStore();
// const clearAuth = useAuthStore((state) => state.clearAuth);
// const checkAuth = useAuthStore((state) => state.checkAuth);
// const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
// userId,
// console.log({
//   isSignedIn,
// });
// import { useAuth } from '@clerk/react'
import { ThemeProvider } from './context/ThemeContext'
import { WallpaperProvider } from './context/WallpaperContext'
import { Routes, Route, Navigate } from 'react-router'
import ChatPage from './Pages/ChatPage'
import AuthPage from './Pages/AuthPage'
import PageLoader from './Components/PageLoader'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast';

function App() {

  // const { isSignedIn, isLoaded } = useAuth();
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();




  useEffect(() => {
    checkAuth();

  },[checkAuth]);
  // todo...
  if (isCheckingAuth) return <PageLoader />;
  

  return (
    <ThemeProvider>
      <WallpaperProvider>
        <Routes>
          <Route path='/' element={ authUser ? ( <ChatPage /> ) : ( <Navigate to={"/auth"} replace/> ) } />
          
          <Route path='/auth' element={ authUser ? <Navigate to="/" replace /> : <AuthPage /> } />
        </Routes>
        <Toaster />
      </WallpaperProvider>
    </ThemeProvider>
  );
}

export default App;
