import React, { Fragment, } from "react";

import {
    Divider, List, ListItem, ListItemText,
    Typography,
} from "@material-ui/core";

import { logs } from '../Logging';
import { useRefresher } from "../Utilities";

export default function DebugConsolePage() {
    useRefresher(200);

    return (
        <div>
            <Typography variant="h6">Debug Console</Typography>
            <Typography variant="subtitle1">Don't modify any settings here unless you know what you're doing.</Typography>
            <List dense>
                <Divider />
                {logs.map((message, i, arr) =>
                    <Fragment key={i}>
                        <ListItem button>
                            <ListItemText primary={`(#${arr.length - i}) ${message.message}`} secondary={message.timestamp} />
                        </ListItem>
                        <Divider />
                    </Fragment>
                )}
            </List>
        </div>
    );
};