import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useAuth } from '../app/context/AuthContex'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoggingIn, setIsLoggingIn] = useState(true)

  const { login, signup, currentUser } = useAuth()

  async function submitHandler() {
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }
    if (isLoggingIn) {
      try {
        await login(email, password)
      } catch (err) {
        setError('Incorrect email or password')
      }
      return
    }
    await signup(email, password)
  }

  return (
    <Box
      maxWidth={400}
      display='flex'
      flexDirection={'column'}
      alignItems='center'
      justifyContent={'center'}
      boxShadow='15px 15px 15px 20px #ccc'
      padding={4}
      margin='auto'
      marginTop={6}
    >
      <h1>{isLoggingIn ? 'Login' : 'Register'}</h1>
      {error && <div>{error}</div>}
      <TextField
        fullWidth
        id='email'
        name='email'
        label='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email Address'
      />
      <TextField
        fullWidth
        id='password'
        name='password'
        label='Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
      />
      <Button
        onClick={submitHandler}
        color='primary'
        variant='contained'
        fullWidth
        type='submit'
      >
        Submit
      </Button>
      <Button
        color='primary'
        variant='secondary'
        fullWidth
        onClick={() => setIsLoggingIn(!isLoggingIn)}
      >
        {!isLoggingIn ? 'Login' : 'Register'}
      </Button>
    </Box>
  )
}
