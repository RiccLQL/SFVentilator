import React from 'react';

import { Typography } from '@material-ui/core';

import ChartIcon from "@material-ui/icons/InsertChartOutlined";
import HelpIcon from "@material-ui/icons/HelpOutlined";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";

import MonitorPageTabs from './MonitorPageTabs';
import manualVentilation from './manualVentilation.jpg';
import wallSocket from './wallSocket.png';
import imgDesFiO2 from './DesFiO2.png';

export const getStepContent = classes => [
    ['Using this Instructions dialog', <>
        This dialog will teach you how to use the ventilator's user interface.
        Note that you can follow the steps in order by using the
        &nbsp;<Typography variant="button" component="span">Back</Typography>&nbsp;
        and &nbsp;<Typography variant="button" component="span">Next</Typography>&nbsp;
        buttons,  or skip between steps by clicking on numbers.
    </>],
    ['Install ventilator', <>
        ??
    </>],
    ['Continue manual ventilation.', <>
        <br />
        <img src={manualVentilation} width={350} alt="Manual ventilation" />
    </>],
    ['Electric connection', <>
        Plug the ventilator into an electrical socket.
        <br />
        <img src={wallSocket} width={250} alt="Wall socket" />
    </>],
    ['General settings', <>
        To set general settings,
        press <SettingsIcon className={classes.inlineIcon} /> in the menu on the left to go to General Settings.
        <br /><br />
        Every setting is represented as a blue button or a textbox.
        To modify the setting, click on the button or textbox.
        An adjustment dialog will open. Use the slider and the buttons in the bottom-left corner to adjust your value.
        Then, press the blue "Set" button.
        <br />
        <img src={imgDesFiO2} width={750} alt="DesFiO2" />
    </>],
    ['Patient Settings', <>
        To set patient-specific settings,
        press <PersonIcon className={classes.inlineIcon} /> in the menu on the left to go to Patient Settings.
        <br /><br />
        Every setting is represented as a blue button or a textbox.
        To modify the setting, click on the button or textbox.
        An adjustment dialog will open. Use the slider and the buttons in the bottom-left corner to adjust your value.
        Then, press the blue "Set" button.
    </>],
    ['Main monitor page', <>
        On the <ChartIcon className={classes.inlineIcon} /> Monitor page, you can do several things.
        Click the buttons below on the left to learn about the various settings, values, and charts.
        <MonitorPageTabs />
    </>],
    ['Alarms and Warnings', <>

    </>],
    ['On/off switch', <>

    </>],
    ['Support', <>
        Should you need any assistance, or should any technical malfunctions occur,
        kindly reach out to Ian Langleben at ilangleben19@gmail.com and expect a response within a few days.
        <br /><br />
        This concludes the instructions. If ever you want to see this help dialog again,
        simply click the <HelpIcon className={classes.inlineIcon} /> icon next to the title.
    </>],
];