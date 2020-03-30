import React from "react";

import { Divider, List, ListItem, Typography } from "@material-ui/core";

import SettingTextField from "../components/SettingTextField";
import Bridge from "../Bridge";
import { useRefresher } from "../Utilities";

export default function GeneralSettingsPage() {
    const { HumMargBadTemp, HumMargGoodTemp, MaxHum, MaxTemp, MinHum, MinTemp,
        setHumMargBadTemp, setHumMargGoodTemp, setMaxHum, setMaxTemp, setMinHum, setMinTemp, } = Bridge;

    useRefresher(100);

    return (
        <div>
            <Typography variant="h5">General Settings</Typography>
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
                        setter={setMinTemp}
                        setting="Min"
                        unit="degrees Celsius"
                        value={MinTemp}
                    />
                    &nbsp;-&nbsp;
                    <SettingTextField
                        decimalPlaces={1}
                        description="Maximum acceptable temperature"
                        min={20}
                        max={40}
                        setter={setMaxTemp}
                        setting="Max"
                        unit="degrees Celsius"
                        value={MaxTemp}
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
                        setter={setMinHum}
                        setting="Min"
                        unit="percentage"
                        value={MinHum}
                    />
                    &nbsp;-&nbsp;
                    <SettingTextField
                        decimalPlaces={0}
                        description="Maximum acceptable humidity"
                        min={20}
                        max={40}
                        setter={setMaxHum}
                        setting="Max"
                        unit="percentage"
                        value={MaxHum}
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
                        setter={setHumMargGoodTemp}
                        setting="Range"
                        unit="percentage"
                        value={HumMargGoodTemp}
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
                        setter={setHumMargBadTemp}
                        setting="Range"
                        unit="percentage"
                        value={HumMargBadTemp}
                    />
                </ListItem>
            </List>
        </div>
    )
};