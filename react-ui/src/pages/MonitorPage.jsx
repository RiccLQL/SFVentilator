import React from "react";

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Chart from "../components/Chart";
import DataButton from "../components/DataButton";
import Bridge from "../Bridge";
import { useRefresher } from "../Utilities";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
    },
}));

export default function MonitorPage() {
    const classes = useStyles();
    const { DesFiO2, FiO2, LungPress, Pmax, Pmin, RoomTemp, RR, setDesFiO2, setRR, setPmax, setPmin, VT } = Bridge;

    useRefresher(100);

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
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
                        <DataButton
                            description={<>Tidal volume</>}
                            decimalPlaces={0}
                            setting="VT"
                            unit="mL"
                            value={VT}
                        />
                        <DataButton
                            description={<>Respiration rate</>}
                            decimalPlaces={0}
                            min={21}
                            max={100}
                            setter={setRR}
                            setting="RR"
                            unit="breaths/minute"
                            value={RR}
                        />
                        <DataButton
                            description={<>Minimum desired ventilator pressure</>}
                            decimalPlaces={0}
                            min={21}
                            max={100}
                            setter={setPmin}
                            setting="Pmin"
                            unit="cmH2O"
                            value={Pmin}
                        />
                        <DataButton
                            description={<>Maximum desired ventilator pressure</>}
                            decimalPlaces={0}
                            min={21}
                            max={100}
                            setter={setPmax}
                            setting="Pmax"
                            unit="cmH2O"
                            value={Pmax}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} style={{ height: 20 }} />
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={9} style={{ height: 250 }}>
                            <Chart
                                title="Lung pressure"
                                data={LungPress}
                                maxPoints={10000}
                                suggestedMin={-100} suggestedMax={100}
                            />
                        </Grid>
                        <Grid item>
                            <DataButton
                                description={<>Maximum pressure</>}
                                decimalPlaces={0}
                                setting="Pmax"
                                unit="cmH2O"
                                value={Pmax}
                            />
                            <div style={{ height: 20 }} />
                            <DataButton
                                description={<>Maximum pressure</>}
                                decimalPlaces={0}
                                setting="Pmax"
                                unit="cmH2O"
                                value={Pmax}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={9} style={{ height: 250 }}>
                            <Chart
                                title="Current FiO2"
                                data={FiO2}
                                maxPoints={10000}
                                suggestedMin={-100} suggestedMax={100}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
