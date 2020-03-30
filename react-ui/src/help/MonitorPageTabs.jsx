import React, { useState } from 'react';

import { Box, Tab, Tabs, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from "@material-ui/core/styles";

import imgDesFiO2 from './DesFiO2.png';
import imgRoomTemp from './RoomTemp.png';
import imgRR from './RR.png';
import imgVT from './VT.png';
import imgPmin from './Pmin.png';
import imgPmax from './Pmax.png';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: 180,
    },
    panel: {
        width: 1000,
    },
}));

const StyledTab = withStyles({
    root: {
        textTransform: 'none',
    },
})(Tab);

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

export default function MonitorPageTabs() {
    const [value, setValue] = useState(1);
    const classes = useStyles();

    return <div className={classes.root}>
        <Tabs
            className={classes.tabs}
            onChange={(_, newValue) => setValue(newValue)}
            orientation="vertical"
            value={value}
            variant="scrollable"
        >
            <StyledTab label="RoomTemp" {...a11yProps(0)} />
            <StyledTab label="DesFiO2" {...a11yProps(1)} />
            <StyledTab label="VT" {...a11yProps(2)} />
            <StyledTab label="RR" {...a11yProps(3)} />
            <StyledTab label="Pmin and Pmax" {...a11yProps(4)} />
        </Tabs>

        <TabPanel className={classes.panel} value={value} index={0}>
            <Typography variant="body1" component="div">
                RoomTemp is a simple measurement of room temperature in °C.
            </Typography>
            <img src={imgRoomTemp} width={250} alt="RoomTemp" />
        </TabPanel>
        <TabPanel className={classes.panel} value={value} index={1}>
            <Typography variant="body1" component="div">
                DesFiO<sub>2</sub>, or the target oxygen percentage for the patient's air mixture, is a setting which can be modified easily.
                To change it, simply click on its button and use either the Slider or the &lt; and &gt; buttons to adjust its value,
                and then press Set.
            </Typography>
            <img src={imgDesFiO2} width={750} alt="DesFiO2" />
        </TabPanel>
        <TabPanel className={classes.panel} value={value} index={2}>
            <Typography variant="body1" component="div">
                VT indicates current tidal volume.
            </Typography>
            <img src={imgVT} width={250} alt="VT" />
        </TabPanel>
        <TabPanel className={classes.panel} value={value} index={3}>
            <Typography variant="body1" component="div">
                RR indicates current respiration rate.
            </Typography>
            <img src={imgRR} width={250} alt="RR" />
        </TabPanel>
        <TabPanel className={classes.panel} value={value} index={4}>
            <Typography variant="body1" component="div">
                Pmin and Pmax indicate minimum and maximum pressure, respectively.
            </Typography>
            <img src={imgPmin} width={250} alt="Pmin" />
            &nbsp;&nbsp;&nbsp;
            <img src={imgPmax} width={250} alt="Pmax" />
        </TabPanel>
    </div>;
};