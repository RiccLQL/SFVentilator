import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider, List, ListItem, TextField, Typography } from "@material-ui/core";

import SettingTextField from "../components/SettingTextField";

const useStyles = makeStyles(theme => ({

}));

export default function SettingsPage() {
    const [tempMin, setTempMin] = useState(20);
    const [tempMax, setTempMax] = useState(30);
    const [humidityMin, setHumidityMin] = useState(20);
    const [humidityMax, setHumidityMax] = useState(30);
    const [humidityRangeTempWithin, setHumidityRangeTempWithin] = useState(0);
    const [humidityRangeTempNotWithin, setHumidityRangeTempNotWithin] = useState(0);

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
                    <SettingTextField
                        decimalPlaces={1}
                        description="Minimum acceptable temperature"
                        min={20}
                        max={40}
                        setter={setTempMin}
                        setting="Min"
                        unit="degrees Celsius"
                        value={tempMin}
                    />
                    &nbsp;-&nbsp;
                    <SettingTextField
                        decimalPlaces={1}
                        description="Maximum acceptable temperature"
                        min={20}
                        max={40}
                        setter={setTempMax}
                        setting="Max"
                        unit="degrees Celsius"
                        value={tempMax}
                    />
                </ListItem>
                <Divider />
                <ListItem><Typography variant="h6">Humidity</Typography></ListItem>
                <ListItem>
                    <Typography variant="body1">Acceptable humidity range:</Typography>&nbsp;&nbsp;&nbsp;

                    <SettingTextField
                        decimalPlaces={0}
                        description="Minimum acceptable humidity"
                        min={20}
                        max={40}
                        setter={setHumidityMin}
                        setting="Min"
                        unit="percentage"
                        value={humidityMin}
                    />
                    &nbsp;-&nbsp;
                    <SettingTextField
                        decimalPlaces={0}
                        description="Maximum acceptable humidity"
                        min={20}
                        max={40}
                        setter={setHumidityMax}
                        setting="Max"
                        unit="percentage"
                        value={humidityMax}
                    />
                </ListItem>
                <ListItem>
                    <Typography variant="body1">
                        <u>If the temperature is within range</u>,
                        how far out of the humidity range should we warn you?
                    </Typography>&nbsp;&nbsp;&nbsp;
                    <SettingTextField
                        decimalPlaces={1}
                        description="Warn me if the humidity is out of this range"
                        min={20}
                        max={40}
                        setter={setHumidityRangeTempWithin}
                        setting="Range"
                        unit="percentage"
                        value={humidityRangeTempWithin}
                    />
                </ListItem>
                <ListItem>
                    <Typography variant="body1">
                        <u>If the temperature is out of range</u>,
                        how far out of the humidity range should we warn you?
                    </Typography>&nbsp;&nbsp;&nbsp;
                    <SettingTextField
                        decimalPlaces={1}
                        description="Warn me if the humidity is out of this range"
                        min={20}
                        max={40}
                        setter={setHumidityRangeTempNotWithin}
                        setting="Range"
                        unit="percentage"
                        value={humidityRangeTempNotWithin}
                    />
                </ListItem>
            </List>
        </div>
    )
};