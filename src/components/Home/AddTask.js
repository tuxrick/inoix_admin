import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import { Modal, Box, TextField, Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import user from '../Services/user';

// modal styles
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    maxHeight: '70vh',
    overflow: 'scroll',
    boxShadow: 24,
    p: 4,
  };

  const AddTask = () => {
    const [open, setOpen] = useState(false);
    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());


    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        user.list(token).then((data) => {
            if (Array.isArray(data)) {
                let executors = data.filter((item) => item.role === "executor");
                setUserList(executors);
            } else {
              console.error("Wrong data: ", data);
            }
        }).catch((error) => {
            console.error("Error getting data: ", error);
        });
    }, [token]);

    const handleOpen =async () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      }

      const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
        console.log("Nuevo usuario seleccionado:", event.target.value);
      };

      const handleDateChange = (date) => {
        console.log("Nueva fecha seleccionada:", date);
        setSelectedDate(date);
      };

    return (
        <>
            <Button variant="contained" onClick={() => handleOpen()}>Add Task</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Add Task
                    </Typography>
                    <br/>
                    <Typography variant="h6" component="h2">
                        Assign to: 
                        <select onChange={handleUserChange}>
                        {userList.map(user => (
                            <option key={user.id} value={user.id}>{user.name} {user.last_name}</option>
                        ))}
                        </select>
                    </Typography>
                    <br/>
                    <TextField
                        fullWidth
                        label={"Title"}
                        variant="outlined"
                        id="title"
                    />
                    <br/><br/>
                    <TextField
                        fullWidth
                        label={"Description"}
                        variant="outlined"
                        id="description"
                    />
                    <br/><br/>
                    <Typography variant="h6" component="h2">
                        Due Date:
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="yyyy/MM/dd"
                            placeholderText="Selecciona una fecha"
                        />
                    </Typography>
                    <br/>

                    <Button variant="contained" onClick={() => {}}>Add Task</Button>
                </Box>
            </Modal>
        </>
    );
}
export default AddTask;