import './App.css'
import { Show, SignIn, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import Home from './Pages/Home'

function App() {

  return (
    <>
      <h1>MY APP</h1>
      {/* <Home /> */}
      <header>
        <Show when="signed-out">
          <SignInButton mode='modal' />
          <SignUpButton mode='modal' />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </>
  )
}

export default App
