import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import clsx from "clsx";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
    Button, ButtonBase,
    Dialog, DialogActions, DialogContent, DialogTitle,
    Grid,
    Slider,
    Tooltip,
    Typography,
} from "@material-ui/core";

import LeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import RightIcon from "@material-ui/icons/KeyboardArrowRight";

import { units } from "./Utilities";

const buttonSize = 75;
const sliderLabelSize = 40;

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
    },
    button: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "25%",
        height: buttonSize,
        width: buttonSize,
        "&:hover, &$focusVisible": {
            zIndex: 1,
            "& $buttonBackdrop": {
                opacity: 0.3,
            }
        }
    },
    buttonOpen: {
        backgroundColor: "lightgrey",
    },
    focusVisible: {},
    buttonBackdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: "25%",
        backgroundColor: theme.palette.common.white,
        opacity: 0,
        transition: theme.transitions.create('opacity'),
    },
    primary: {
        color: "white",
    },
    sliderContainer: {
        marginTop: theme.spacing(3.5),
    },
    actions: {
        flex: "1 0 auto",
        justifyContent: "space-between",
    },
    buttonMargin: {
        marginLeft: theme.spacing(0.75),
        marginRight: theme.spacing(0.75),
    },
    tooltip: {
        fontSize: 14,
    },
}));

const SettingButtonDialogSlider = withStyles({
    valueLabel: {
        fontSize: "1.2rem",
        "& > span": {
            width: sliderLabelSize,
            height: sliderLabelSize,
        },
    },
})(Slider);

function SettingButton({ decimalPlaces, description, min, max, setter, setting, unit, value, startOpen }) {
    const [open, setOpen] = useState(!!startOpen);
    const [localValue, setLocalValue] = useState(value);
    const [localValueString, setLocalValueString] = useState(value.toFixed(decimalPlaces));

    useEffect(() => setLocalValueString(localValue.toFixed(decimalPlaces)), [decimalPlaces, localValue]);

    const classes = useStyles();

    const onClose = () => setOpen(false);
    const validate = val => Math.min(Math.max(parseFloat(val).toFixed(decimalPlaces), min), max);

    const unitText = units[unit];
    const round = num => Math.round(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
    const step = round((max - min) / 20);

    return (
        <>
            <Dialog
                {...{ open }}
                className={classes.dialog}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>{setting} - {description} ({unit})</DialogTitle>
                <DialogContent dividers>
                    <div className={classes.sliderContainer}>
                        <Grid
                            alignItems="center"
                            container
                            spacing={2}
                        >
                            <Grid item>
                                {min.toFixed(decimalPlaces)}{unitText}
                            </Grid>
                            <Grid item xs>
                                <SettingButtonDialogSlider
                                    className={classes.slider}
                                    marks
                                    {...{ min, max, step }}
                                    onChange={(_, newValue) => setLocalValue(parseFloat(newValue))}
                                    value={localValue}
                                    valueLabelDisplay="on"
                                />
                            </Grid>
                            <Grid item>
                                {max.toFixed(decimalPlaces)}{unitText}
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions className={classes.actions}>
                    <div>
                        <Tooltip
                            arrow
                            classes={{ tooltip: classes.tooltip }}
                            title="Decrease"
                            placement="top"
                        >
                            <Button
                                className={classes.buttonMargin}
                                color="primary"
                                onClick={() => setLocalValue(localValue => Math.max(localValue - step, min))}
                                size="large"
                                variant="outlined"
                            >
                                <LeftIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip
                            arrow
                            classes={{ tooltip: classes.tooltip }}
                            title="Increase"
                            placement="top"
                        >
                            <Button
                                className={classes.buttonMargin}
                                color="primary"
                                onClick={() => setLocalValue(localValue => Math.min(localValue + step, max))}
                                size="large"
                                variant="outlined"
                            >
                                <RightIcon />
                            </Button>
                        </Tooltip>
                    </div>
                    <div>
                        <Button
                            className={classes.buttonMargin}
                            onClick={onClose}
                            size="large"
                            variant="outlined"
                        >
                            Cancel
                    </Button>
                        <Button
                            className={classes.buttonMargin}
                            color="primary"
                            onClick={() => { setter(validate(localValue)); onClose(); }}
                            size="large"
                            variant="contained"
                        >
                            Set {setting}&nbsp;to {localValueString}{unitText}
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
            <div className={classes.root}>
                <ButtonBase
                    className={clsx(classes.button, open && classes.buttonOpen)}
                    focusRipple
                    focusVisibleClassName={classes.focusVisible}
                    onClick={() => setOpen(true)}
                >
                    {!open && <span className={classes.buttonBackdrop} />}
                    <div>
                        <Typography
                            className={classes.primary}
                            component="div"
                            variant="h5"
                        >
                            {setting}
                        </Typography>
                        <Typography
                            className={classes.primary}
                            component="div"
                            variant="h5"
                        >
                            {value.toFixed(decimalPlaces)}{unitText}
                        </Typography>
                    </div>
                </ButtonBase>
            </div>
        </>
    );
}

SettingButton.propTypes = {
    unit: PropTypes.oneOf(Object.keys(units)),
};

export default SettingButton;