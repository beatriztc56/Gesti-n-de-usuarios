import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DeleteUser from './DeleteUser'
import EditUser from './EditUser'
import EditIcon from '@material-ui/icons/Edit'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const ListUser = ({ users, setUsers }) => {
  const [editingUser, setEditingUser] = useState(null)
  const [openEditDialog, setOpenEditDialog] = useState(false) 

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false)
    setEditingUser(null)
  }

  const handleEditUser = (user) => {
    setEditingUser(user)
    setOpenEditDialog(true)
  }
      
  const handleDeleteUser = (userId) => {
    // Elimina el usuario del array de usuarios
    const updatedUsers = users.filter(user => user.id !== userId)
    setUsers(updatedUsers)
  }

  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Second Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Mail</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.lastName}</TableCell>
              <TableCell align="right">{user.age}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleEditUser(user)}>
                  <EditIcon />
                </Button>
                <Dialog
                  open={openEditDialog}
                  onClose={handleCloseEditDialog}
                  PaperProps={{
                  component: 'form',
                  onSubmit: (event) => {
                  event.preventDefault()
                  handleCloseEditDialog()
                  }
                  }}
                >
            {editingUser && (
            <EditUser
              editingUser={editingUser}
              setEditingUser={setEditingUser}
              setUsers={setUsers}
              users={users}
              handleCloseEditDialog={handleCloseEditDialog}
            />
            )}
          </Dialog>
          <DeleteUser userId={user.id} onDelete={() => handleDeleteUser(user.id)}/>
           </TableCell>
        </TableRow>
        ))}
        </TableBody>
      </Table>
  )
}

export default ListUser
