import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Divider, List, ListItem, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({

}));

export default function SettingsPage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h5">Settings</Typography>
            <Typography variant="subtitle1">Changes will be automatically saved.</Typography>
            <Divider />
            <List dense>
                <ListItem><Typography variant="h6">Temperature</Typography></ListItem>
                <ListItem>
                    <Typography variant="body1">Acceptable temperature range:</Typography>&nbsp;&nbsp;&nbsp;
                    <TextField label="Min (°C)" margin="dense" variant="outlined" />
                    &nbsp;&nbsp;-&nbsp;&nbsp;
                    <TextField label="Max (°C)" margin="dense" variant="outlined" />
                </ListItem>
                <Divider />
                <ListItem><Typography variant="h6">Humidity</Typography></ListItem>
                <ListItem>
                    <Typography variant="body1">Acceptable humidity range:</Typography>&nbsp;&nbsp;&nbsp;
                    <TextField label="Min (%)" margin="dense" variant="outlined" />
                    &nbsp;&nbsp;-&nbsp;&nbsp;
                    <TextField label="Max (%)" margin="dense" variant="outlined" />
                </ListItem>
                <ListItem>
                    <Typography variant="body1">
                        How far out of the humidity range should we warn you <b>if the temperature is within range</b>?
                    </Typography>&nbsp;&nbsp;&nbsp;
                    <TextField label="Range (%)" margin="dense" variant="outlined" />
                </ListItem>
                <ListItem>
                    <Typography variant="body1">
                        How far out of the humidity range should we warn you <b>if the temperature is out of range</b>?
                    </Typography>&nbsp;&nbsp;&nbsp;
                    <TextField label="Range (%)" margin="dense" variant="outlined" />
                </ListItem>
            </List>
        </div>
    )
};