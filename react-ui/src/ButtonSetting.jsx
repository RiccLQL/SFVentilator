import React, { useState } from "react";
import PropTypes from 'prop-types';

import { makeStyles } from "@material-ui/core/styles";
import {
    Button, ButtonBase,
    Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl, FormHelperText,
    Grid,
    Input, InputAdornment,
    Slider,
    Typography,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    buttonBase: {
        width: 100,
        height: 100,
        backgroundColor: theme.palette.primary.main,
        borderRadius: "50%",
    },
    primary: {
        color: "white",
    },
    sliderContainer: {
        marginTop: theme.spacing(2.75),
    },
    textField: {
        width: 50,
    },
}));

function ButtonSetting({ decimalPlaces, description, min, max, setter, setting, unit, value }) {
    const [open, setOpen] = useState(true);
    const [localValue, setLocalValue] = useState(value);
    const classes = useStyles();

    const unitText = {
        percentage: "%",
    }[unit];

    const onClose = () => setOpen(false);

    const tidy = val => Math.min(Math.max(parseFloat(val).toFixed(decimalPlaces), min), max);

    return (
        <>
            <Dialog
                {...{ open, onClose }}
                className={classes.dialog}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>{setting} - {description}</DialogTitle>
                <DialogContent>
                    <div className={classes.sliderContainer}>
                        <Grid
                            alignItems="center"
                            container
                            spacing={2}
                        >
                            <Grid item xs={2}>
                                <Typography variant="body1">
                                    <b>Old value:</b> {value}{unitText}
                                    <br />
                                    <b>New value:</b>&nbsp;
                                    <FormControl
                                        className={classes.textField}
                                        size="small"
                                    >
                                        <Input
                                            endAdornment={<InputAdornment position="end">{unitText}</InputAdornment>}
                                            onBlur={event => setLocalValue(tidy(event.target.value))}
                                            onChange={event => setLocalValue(event.target.value)}
                                            inputProps={{
                                                style: {
                                                    textAlign: "right",
                                                }
                                            }}
                                            value={localValue}
                                        />
                                    </FormControl>
                                </Typography>
                            </Grid>
                            <Grid item>
                                {min}{unitText}
                            </Grid>
                            <Grid item xs>
                                <Slider
                                    className={classes.slider}
                                    marks
                                    min={min}
                                    max={max}
                                    step={5}
                                    onChange={(_, newValue) => setLocalValue(newValue)}
                                    value={localValue}
                                    valueLabelDisplay="auto"
                                />
                            </Grid>
                            <Grid item>
                                {max}{unitText}
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={() => { setter(localValue); onClose(); }} variant="outlined">
                        Save {setting}&nbsp;as {tidy(localValue)}{unitText}
                    </Button>
                </DialogActions>
            </Dialog>
            <div className={classes.root}>
                <ButtonBase
                    className={classes.buttonBase}
                    focusRipple
                    onClick={() => setOpen(true)}
                >
                    <Typography
                        className={classes.primary}
                        component="div"
                        variant="h6"
                    >
                        {setting}
                        <br />
                        {value}{unitText}
                    </Typography>
                </ButtonBase>
            </div>
        </>
    );
}

ButtonSetting.propTypes = {
    unit: PropTypes.oneOf(['percentage']),
};

export default ButtonSetting;