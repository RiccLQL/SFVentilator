import React from "react";

import { Divider, List, ListItem, Typography } from "@material-ui/core";

import SettingTextField from "../components/SettingTextField";
import Bridge from "../Bridge";
import { useRefresher } from "../Utilities";

export default function PatientSettingsPage() {
    const { GoodLungTemp,
        setGoodLungTemp } = Bridge;

    useRefresher(100);

    return (
        <div>
            <Typography variant="h5">Patient Settings</Typography>
            <Typography variant="subtitle1">Changes will be automatically saved.</Typography>
            <Divider />
            <List dense>
                <ListItem>
                    <Typography variant="body1">Ideal lung temperature</Typography>&nbsp;&nbsp;&nbsp;
                    <SettingTextField
                        decimalPlaces={1}
                        description="Ideal lung temperature"
                        min={20}
                        max={40}
                        setter={setGoodLungTemp}
                        setting="GoodLungTemp"
                        unit="degrees Celsius"
                        value={GoodLungTemp}
                        width={156}
                    />
                </ListItem>
            </List>
        </div>
    )
};