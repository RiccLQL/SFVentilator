import React, { useState } from "react";

import { IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NotificationIcon from "@material-ui/icons/Notifications";
import NotificationImportantIcon from "@material-ui/icons/NotificationImportant";

import Bridge from "../Bridge";
import { useRefresher } from "../Utilities";

const useStyles = makeStyles(theme => ({
    root: {
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
    },
    alarmIconButton0: {
        color: "inherit",
    },
    alarmIconButtonNon0: {
        color: "red",
    },
    alarmIcon: {
        fontSize: 42,
    },
    menuItem: {
        width: 400,
    },
}));

export default function StatusIndicator() {
    const [anchorEl, setAnchorEl] = useState(null);

    const classes = useStyles();

    useRefresher(100);

    const { alarms, status } = Bridge;
    const activeAlarms = alarms.filter(alarm => alarm.on);

    return (
        <div className={classes.root}>
            <Typography variant="h5">{status}</Typography>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <IconButton
                className={activeAlarms.length === 0 ? classes.alarmIconButton0 : classes.alarmIconButtonNon0}
                onClick={event => setAnchorEl(event.currentTarget)}
            >
                {activeAlarms.length === 0
                    ? <NotificationIcon className={classes.alarmIcon} />
                    : <NotificationImportantIcon className={classes.alarmIcon} />
                }
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                keepMounted
                onClose={() => setAnchorEl(null)}
                open={!!anchorEl}
            >
                {activeAlarms.length === 0
                    ? <MenuItem className={classes.menuItem}>No alarms or warnings.</MenuItem>
                    : activeAlarms.map((alarm, i) => <MenuItem key={i} className={classes.menuItem}>{alarm.component}</MenuItem>)
                }
            </Menu>
        </div>
    )
};