import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

function EditUser({ editingUser, setEditingUser, setUsers, handleCloseEditDialog }) {
  const [name, setName] = useState(editingUser.name)
  const [lastName, setLastName] = useState(editingUser.lastName)
  const [age, setAge] = useState(editingUser.age)
  const [email, setEmail] = useState(editingUser.email)

  const handleSaveEdit = async (e) => {
    e.preventDefault()
    const editedUser = {
      ...editingUser,
      name: name,
      lastName: lastName,
      age: age,
      email: email
    }
    try {
      const response = await fetch(`http://localhost:9090/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      })

      if (!response.ok) {
        throw new Error('Failed to edit user')
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === editingUser.id ? editedUser : user))
      )
      setEditingUser(null)
    } catch (error) {
      console.error('Error editing user:', error)
    }
  }

  return (
    <div>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Edit user
      </DialogTitle>
      <DialogContent dividers>
      <form onSubmit={handleSaveEdit}>
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <TextField type="text" fullWidth name="name" value={name} onChange={(e) => setName(e.target.value)} style={{ margin:'3%' }}/>
          </Grid>
          <Grid item xs={11}>
            <TextField type="text" fullWidth name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ margin:'3%' }} />
          </Grid>
          <Grid item xs={11}>
            <TextField type="text" fullWidth name="age" value={age} onChange={(e) => setAge(e.target.value)} style={{ margin:'3%' }} />
          </Grid>
          <Grid item xs={11}>
            <TextField type="email" fullWidth name="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ margin:'3%' }}/>
          </Grid>
        </Grid>
        <DialogActions>
        <Button onClick={handleCloseEditDialog} variant='raised'>Cancel</Button>
          <Button type='submit' variant='raised' color='primary'>Edit</Button>
        </DialogActions>
      </form>
      </DialogContent>
    </div>
  )
}

export default EditUser
