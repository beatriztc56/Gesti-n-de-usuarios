import React, { useState } from 'react'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

function CreateUser({ handleCloseCreateDialog, fetchUsers }) {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = {
      name: name,
      lastName: lastName,
      age: age,
      email: email
    }
    try {
      const response = await fetch('http://localhost:9090/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      console.log('Usuario creado:', data)
      fetchUsers()
      handleCloseCreateDialog()
    } catch (error) {
      setError('Error creating user.')
    }
  }

  return (
    <div>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Create user
      </DialogTitle>
    <DialogContent dividers>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={11}>          
          <TextField required id='name' fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} style={{ margin:'3%' }}/>
        </Grid>
        <Grid item xs={11}>          
          <TextField required id='lastName' fullWidth label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ margin:'3%' }}/>
        </Grid>
        <Grid item xs={11}>          
          <TextField required id='age' fullWidth label="Age" value={age} onChange={(e) => setAge(e.target.value)} style={{ margin:'3%' }}/>
        </Grid>
        <Grid item xs={11}>          
          <TextField required id='email' fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ margin:'3%' }}/>
        </Grid>
      </Grid>
      {error && <Typography variant="body2" color="error">{error}</Typography>}
      <DialogActions>
        <Button onClick={handleCloseCreateDialog} variant='raised'>Cancel</Button>
        <Button type="submit" variant='raised' color='primary'>Create</Button>
      </DialogActions>
    </form>
  </DialogContent>
  </div>
  )
}

export default CreateUser
