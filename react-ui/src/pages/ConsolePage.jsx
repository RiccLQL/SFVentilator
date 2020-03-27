import React, { Fragment, } from "react";

import {
    Divider, List, ListItem, ListItemText,
    Typography,
} from "@material-ui/core";

import { logs } from '../Logs';
import { useRefresher } from "../Utilities";

export default function ConsolePage() {
    useRefresher(200);

    return (
        <div>
            <Typography variant="h6">Log</Typography>
            <List>
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