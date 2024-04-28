import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import CreateUser from './CreateUser'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import ListUser from './ListUser'

function Home() {
  const [users, setUsers] = useState([])
  const [openCreateDialog, setOpenCreateDialog] = useState(false)

  const handleClickOpenCreate = () => {
    setOpenCreateDialog(true)
  }

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false)
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:9090/users')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      <div style={{
            width: '80%',
            margin: '0 auto',
            marginTop: 50,
          }}>
          <Paper>
            <div style={{
              minHeight: 200,
              padding: 25
            }}>
            <Typography variant="title" color="inherit" style={{display: 'inline'}}>User list</Typography>
            {' '}
            <Button variant="fab" color="primary" aria-label="Add" onClick={handleClickOpenCreate} style={{ width: 35, height: 30}}>
              <AddIcon />
            </Button>
            <Dialog
              open={openCreateDialog}
              onClose={handleCloseCreateDialog}
              PaperProps={{
              component: 'form',
              onSubmit: (event) => {
              event.preventDefault()
              handleCloseCreateDialog()
            }
          }}
          >
            <CreateUser handleCloseCreateDialog={handleCloseCreateDialog} fetchUsers={fetchUsers} />
          </Dialog>
          <ListUser users={users} setUsers={setUsers} />
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default Home
