import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Chart from "./Chart";
import SettingButton from "./SettingButton";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
    },
}));

export default function HomePage() {
    const [FIO2, setFIO2] = useState(100);
    const [TI, setTI] = useState(1.70);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div style={{ width: 800, height: 600 }}>
                <Chart
                    title="Flow"
                    data={(() => {
                        let now = Date.now();
                        return [65, 59, 35, 81, -25, 55, 40].reduce((acc, next, i) => [...acc, {
                            datum: next,
                            timestamp: now + 10 * i
                        }], []);
                    })()}
                    colors={{ 0: 'green', 3: 'red', }}
                />
            </div>
            <SettingButton
                description={<>Fraction of inspired O<sub>2</sub></>}
                decimalPlaces={0}
                min={21}
                max={100}
                setter={setFIO2}
                setting={<>FIO<sub>2</sub></>}
                settingID="FIO2"
                unit="percentage"
                value={FIO2}
            />
            <SettingButton
                description="Inspiratory time"
                decimalPlaces={2}
                min={0}
                max={5}
                setter={setTI}
                setting="TI"
                settingID="TI"
                unit="seconds"
                value={TI}
            />
        </div>
    );
}
