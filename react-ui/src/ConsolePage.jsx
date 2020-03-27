import React, { Fragment, useContext, useEffect, useState, } from "react";

import {
    Divider, List, ListItem, ListItemText,
    Typography,
} from "@material-ui/core";

import LogContext from './LogContext';

export default function ConsolePage() {
    const logs = useContext(LogContext);
    const [, set] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => set(_ => _ + 1), 200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Typography variant="h6">Log</Typography>
            <List>
                <Divider />
                {logs.map((message, i, arr) => <Fragment key={i}>
                    <ListItem button>
                        <ListItemText primary={`(#${arr.length - i}) ${message.message}`} secondary={message.timestamp} />
                    </ListItem>
                    <Divider />
                </Fragment>)}
            </List>
        </div>
    );
};