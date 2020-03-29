import React from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Chart from "../components/Chart";
import DataButton from "../components/DataButton";
import Bridge from "../Bridge";
import { useRefresher } from "../Utilities";
import { themeData } from '../Config';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
    },
}));

export default function MonitorPage({ mode, setMode }) {
    const classes = useStyles();
    const { setDesFiO2, DesFiO2, Flow, RoomTemp } = Bridge;

    useRefresher(100);

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div style={{ display: 'flex', }}>
                        <DataButton
                            description="Room temperature"
                            decimalPlaces={1}
                            setting="RoomTemp"
                            unit="degrees Celsius"
                            value={RoomTemp}
                        />
                        <DataButton
                            description={<>Desired FiO<sub>2</sub> (% of O<sub>2</sub> in the air mixture being delivered to patient)</>}
                            decimalPlaces={0}
                            min={21}
                            max={100}
                            setter={setDesFiO2}
                            setting="DesFiO2"
                            step={10}
                            unit="percentage"
                            value={DesFiO2}
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} style={{ height: 250 }}>
                            <Chart
                                title="Flow"
                                data={Flow}
                                colors={{ 0: themeData.palette.secondary.main }}
                                maxPoints={20}
                                suggestedMin={-100}
                                suggestedMax={100}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            Test
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
