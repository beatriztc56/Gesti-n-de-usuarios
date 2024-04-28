import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import DeleteIcon from '@material-ui/icons/Delete'

const DeleteUser = ({ userId, onDelete }) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:9090/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        onDelete()
      } else {
        console.error('Failed to delete user')
      }
    } catch (error) {
      console.error('Failed to delete user', error)
    }
  }

  return (
    <div> 
      <Button onClick={handleClickOpen} >
        <DeleteIcon />
      </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
          component: 'dialog',
          onSubmit: (event) => {
          event.preventDefault()
          handleClose()
        }
        }}
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure to delete the user?
          </DialogTitle>
          <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action can not be undone
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDelete} variant='raised' color='primary'>Delete</Button>
          </DialogActions>
      </Dialog>
    </div>
  )
}

export default DeleteUser
