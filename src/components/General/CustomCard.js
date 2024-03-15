import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import { Modal, Box, Button } from '@mui/material';

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

const CustomCard = ({cardData}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleOpen =async (test) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          <Typography sx={{ mt: 2 }}>
            Status: {cardData.status.status} 
          </Typography>
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
