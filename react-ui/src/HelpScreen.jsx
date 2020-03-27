import React from "react";

import {
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@material-ui/core";

export default function HelpScreen({ helpOpen, setHelpOpen }) {
    return (
        <Dialog open={helpOpen}>
            <DialogTitle>Welcome!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    In case you've 
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setHelpOpen(false)}
                >
                    No Help Needed
                    </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setHelpOpen(false)}
                >
                    Teach me
                </Button>
            </DialogActions>
        </Dialog>
    );
};