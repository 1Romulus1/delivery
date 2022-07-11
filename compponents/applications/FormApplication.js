import { useEffect, useReducer, useState } from 'react'
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore'
import { auth, database } from '../../firebase'
import { AppReducer } from '../../app/context/AppReducer'

import { useAuth } from '../../app/context/AuthContex'
import {Box, Button, Card, CardActions, CardContent, TextField, Typography} from "@mui/material";

export default function FormApplication() {
  const initialState = {
    date: '',
    fromCity: '',
    toCity: '',
    type: '',
    description: '',
  }
  const [state, dispatch] = useReducer(AppReducer, initialState)
  const [orders, setOrders] = useState([])
  console.log(state)

  const { currentUser } = useAuth()
  const userId = auth.currentUser.uid
  const userOrdersRef = collection(database, userId)

  // function validation() {
  //   const error = 'Please fill all fields'
  //   if(!state.date && !state.fromCity && !state.toCity && !state.type && !state.description) {
  //     return error
  //   }
  // }

  function handleSubmit(e) {
    dispatch({
      type: 'add_application',
      field: e.target.name,
      payload: e.target.value,
    })
  }

  function clearInput() {
    dispatch({
      type: 'reset',
    })
  }

  async function handleSubmitForm(e) {
    e.preventDefault()
    // validation()
    try {
      await addDoc(userOrdersRef, state, { capital: true }, { merge: true })
    } catch (error) {
    }
    await fetchOrders()

    clearInput()
  }

  async function fetchOrders() {
    const data = await getDocs(userOrdersRef)
    setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  async function updateOrder(id) {

  }

  async function deleteOrder(id) {
    const orderDoc = doc(database, userId, id)
    await deleteDoc(orderDoc)

    await fetchOrders()
  }

  useEffect(async () => {
    fetchOrders()
  }, [])

  return (
    <>
      <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            gridTemplateRows: 'auto',
            gridTemplateAreas: `"sidebar main main ."
            "footer footer footer footer"`,
          }}
      >
        <Box sx={{ gridArea: 'sidebar', bgcolor: 'main' }}
             maxWidth={400}
             display='flex'
             flexDirection={'column'}
             alignItems='center'
             justifyContent={'center'}
             padding={4}
             margin='auto'
             marginTop={1}>
          <Typography variant="inherit" component="h2" padding={2} margin='auto' marginTop={1}>
            Make Order!
          </Typography>
          <form onSubmit={handleSubmitForm}>
            <div >
              <div >
                <TextField
                    required
                    id='date'
                    label='Date'
                    type='text'
                    name='date'
                    placeholder='11/11/2022'
                    value={state.date}
                    onChange={(e) => handleSubmit(e)}
                />
              </div>
              <div >
                <TextField
                    required
                    id='fromCity'
                    label='From City'
                    type='text'
                    name='fromCity'
                    value={state.fromCity}
                    onChange={(e) => handleSubmit(e)}
                />
              </div>
              <div>
                <TextField
                    required
                    id='toCity'
                    label="To City"
                    type='text'
                    name='toCity'
                    value={state.toCity}
                    onChange={(e) => handleSubmit(e)}
                />
              </div>
              <div>
                <TextField
                    required
                    id='type'
                    label="Type"
                    type='text'
                    name='type'
                    value={state.type}
                    onChange={(e) => handleSubmit(e)}
                />
              </div>
              <div>
                <TextField
                    required
                    id='description'
                    label='Description'
                    type='text'
                    name='description'
                    value={state.description}
                    onChange={(e) => handleSubmit(e)}
                />
              </div>
            </div>
            <Button variant="contained"
                    fullWidth
                    type="submit">
              Publish
            </Button>
          </form>
        </Box>
        <Box sx={{ gridArea: 'main', bgcolor: 'secondary' }}
             display='flex'
             flexDirection={'column'}
             alignItems='center'
             justifyContent={'center'}
             padding={2}
             margin='auto'
             marginTop={1}>
          <Typography variant="inherit" component="h2">
            Your Order:
          </Typography>
          <div>
            {orders.map((order) => {
              return (
                    <Box boxShadow='15px 15px 15px 5px #ccc'
                         padding={3}
                         margin='auto'
                         minWidth={400}
                         >
                      <Card>
                        <CardContent>
                          <Typography>
                            City from: {order.fromCity}
                          </Typography>
                          <Typography>
                            City to: {order.toCity}
                          </Typography>
                          <Typography>
                            Type: {order.type}
                          </Typography>
                          <Typography>
                            Date: {order.date}
                          </Typography>
                          <Typography>
                            Description: {order.description}
                          </Typography>
                        </CardContent>
                      </Card>
                      {/*<CardActions>*/}
                      {/*  <Button size="small"*/}
                      {/*      onClick={() => {*/}
                      {/*        updateOrder(order.id)*/}
                      {/*      }}*/}
                      {/*      size='small'*/}
                      {/*  >*/}
                      {/*    Update*/}
                      {/*  </Button>*/}
                      {/*</CardActions>*/}
                      <CardActions>
                        <Button size="small"
                            onClick={() => {
                              deleteOrder(order.id)
                            }}
                            size='small'
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Box>
              )
            })}
          </div>
        </Box>
      </Box>
    </>
  )
}
