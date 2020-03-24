import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { ButtonBase, Fab, Typography, } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {

    },
    fab: {
        height: 100,
        width: 100,
        margin: theme.spacing(1),
    },
}));

export default function ButtonSetting({ primary }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* <Fab
            className={classes.fab}
            color="primary"
            size="large"
            variant="extended"
        >
            {primary}
        </Fab> */}

        </div>
    );
};