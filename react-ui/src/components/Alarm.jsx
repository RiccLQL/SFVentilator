import React from "react";

import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import WarningIcon from "@material-ui/icons/Warning";

import { capitalize } from "../Utilities";

const border = "10px solid red";
const useStyles = makeStyles(theme => ({
    dialogTitle: {
        border,
        borderBottom: 'none',
    },
    dialogContent: {
        border,
        borderTop: 'none',
        borderBottom: 'none',
    },
    dialogActions: {
        border,
        borderTop: 'none',
    },
    icon: {
        position: 'relative',
        top: 5,
        left: -5,
        marginRight: 5,
    },
}));

export default function Alarm({ children, description, open, setOpen, severity }) {
    const classes = useStyles();

    severity = severity || "error";

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle className={classes.dialogTitle}>
                <WarningIcon className={classes.icon} />
                {capitalize(severity)} - {description}
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <DialogContentText>
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button onClick={() => setOpen(false)} color="primary" variant="outlined">
                    Close
                 </Button>
            </DialogActions>
        </Dialog>
    );
};