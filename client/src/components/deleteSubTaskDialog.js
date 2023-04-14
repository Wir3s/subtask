import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import { useMutation } from '@apollo/client';
import { REMOVE_SUB_TASK } from '../utils/mutations';

export default function DeleteSubTaskDialog(props) {
    console.log(props);
    const [open, setOpen] = React.useState(false);

    const [removeSubTaskId, setSubTaskId] = React.useState('');

    const [removeSubTask, { error, loading, data }] = useMutation(REMOVE_SUB_TASK, 
        { variables: { removeSubTaskId } } 
    )
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const RemoveSubTask = async() => {
        if(await document.getElementById('deleteConfirm').value !== props.subTaskName) {
            document.getElementById('deleteConfirm').value = ""
            document.getElementById('deleteConfirm').placeholder = "Name does not match, unable to delete"
            return
        }

        if (loading) return <p>Deleting the SubTask name...</p>;
        if (error) return <p>Error deleting the SubTask.</p>;
        setSubTaskId(props.subTaskId)
        removeSubTask(removeSubTaskId)

        handleClose();
    }

    const BootstrapTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.arrow}`]: {
          color: theme.palette.common.black,
        },
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: theme.palette.common.black,
        },
      }));

      return(
        <div>
            <BootstrapTooltip title="Delete Task" placement="right-end">
            <IconButton variant="outlined" onClick={handleClickOpen}>
                <DeleteIcon />
            </IconButton>
            </BootstrapTooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm SubTask Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p>You are about to delete the SubTask "{props.subTaskName}". This cannot be undone. Please enter the SubTask name below to confirm deletion.</p>
                        <p id="deleteError"></p>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="deleteConfirm"
                        placeholder='Confirm Task Name'
                        type="name"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={RemoveSubTask}>Delete</Button>
                </DialogActions>
            </Dialog>

        </div>
      );
}