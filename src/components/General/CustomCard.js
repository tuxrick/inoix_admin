import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import { Modal, Box, TextField, Button } from '@mui/material';
import tasks from '../Services/tasks';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: 10,
    cursor: "pointer"
  },
  title: {
    fontSize: 14,
  },
});

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

const CustomCard = ({cardData, statusList}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(cardData.status.id);

  const token = useSelector(state => state.auth.token);

  //console.log(cardData);

  const handleOpen =async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    let new_status = event.target.value+"";
    tasks.change_status(token, cardData.id+"", new_status).then((data) => {
        if(data){
            alert("Status successfully changed");
            window.location.reload();
        }else{
            alert("Error changing status");
            window.location.reload();
        }
    }).catch((error) => {
        console.error("Error getting data: ", error);
    });
    console.log("Nuevo estado seleccionado:", event.target.value);
  };

  const handleAddComment = (comment) => {
    console.log("New comment:", comment);
    tasks.add_comment(token, cardData.id+"", comment).then((data) => {
        if(data){
            alert("Comment successfully added");
            window.location.reload();
        }else{
            alert("Error saving comment, please try again.");
            window.location.reload();
        }
    }).catch((error) => {
        console.error("Error getting data: ", error);
    });
  }

  //console.log(cardData);
  return (
    <>
    <Card onClick={() => handleOpen()} className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Task: {cardData.title}
        </Typography>
        <Typography variant="h6" component="h2">
          Status: {cardData.status.status}
        </Typography>
        <Typography variant="h6" component="h2">
          Assigned: {cardData.user.name}
        </Typography>
        <Typography variant="h6" component="h2">
          Due Date: {cardData.due_date}
        </Typography>
      </CardContent>
    </Card>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Task: {cardData.title}
          </Typography>
          Status: 
          { cardData.id_status !== 4 &&
            <>
                <select value={selectedStatus} onChange={handleStatusChange}>
                    {statusList.map(status => (
                    <option key={status.id} value={status.id}>{status.status}</option>
                    ))}
                </select>
            </>
          }
          { cardData.id_status === 4 &&
            <>
                Status: {cardData.status.status}
            </>
          }
          <Typography sx={{ mt: 2 }}>
            Description: {cardData.description}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Created: {cardData.created}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Due date: {cardData.due_date}
          </Typography>
          <br/>
          { cardData.id_status === 4 &&
                <>
                    <TextField
                        fullWidth
                        label={"Comment"}
                        variant="outlined"
                        id="comment-input"
                    />
                    <br/><br/>
                    <Button variant="contained" onClick={() => handleAddComment(document.getElementById("comment-input").value)}>Add Comment</Button>
                </>
            }

          {cardData.comments.length > 0 &&
          <>
            <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                Comments:
            </Typography>

            {cardData.comments.map((comment) => {
                return (
                <Typography sx={{ mt: 2 }}>
                    {comment.comment}<br/>{comment.created}
                </Typography>
                )
            })}
          </>
          }
        </Box>
    </Modal>
    </>
  );
};

export default CustomCard;
