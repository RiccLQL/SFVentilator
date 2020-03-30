import React from "react";

import { Typography } from "@material-ui/core";

import Bridge from "../Bridge";
import { useRefresher} from "../Utilities";

export default function StatusIndicator() {
    useRefresher(100);

    return (
        <div style={{ flexGrow: 1 }}>
            <Typography variant="h5">{Bridge.status}</Typography>
        </div>
    )
};