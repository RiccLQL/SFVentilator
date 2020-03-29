import React, { useState } from "react";

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

export default function MonitorPage({ mode, setMode }) {
    const [FIO2, setFIO2] = useState(100);

    const classes = useStyles();
    const { flow, roomTemp } = Bridge;

    useRefresher(100);

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div style={{ display: 'flex', }}>
                        <DataButton
                            description={<>Fraction of inspired O<sub>2</sub></>}
                            decimalPlaces={0}
                            min={21}
                            max={100}
                            setter={setFIO2}
                            setting={<>FIO<sub>2</sub></>}
                            unit="percentage"
                            value={FIO2}
                        />
                        <DataButton
                            description={<>Presure threshold for pressure chamber</>}
                            decimalPlaces={0}
                            min={21}
                            max={100}
                            setter={setFIO2}
                            setting={<>FIO<sub>2</sub></>}
                            unit="percentage"
                            value={FIO2}
                        />
                        <DataButton
                            description="Room temperature"
                            decimalPlaces={1}
                            setting="Temp"
                            unit="degrees Celsius"
                            value={roomTemp}
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} style={{ height: 250 }}>
                            <Chart
                                title="Flow"
                                data={flow.map(item => item.datum)}
                                colors={{ 0: 'green' }}
                                maxPoints={1000 / flow[flow.length - 1].interval / 5}
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
