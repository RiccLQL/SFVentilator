import React from 'react';

import ChartIcon from "@material-ui/icons/InsertChartOutlined";
import HelpIcon from "@material-ui/icons/HelpOutlined";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";

import manualVentilation from './manualVentilation.jpg';
import wallSocket from './wallSocket.png';

export const getStepContent = classes => [
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
        press <SettingsIcon className={classes.inlineIcon} /> in the menu on the left to go to Settings.
        <br /><br />
        Every setting is represented as a blue button or a textbox.
        To modify the setting, click on the button or textbox.
        An adjustment dialog will open. Use the slider and the buttons in the bottom-left corner to adjust your value.
        Then, press the blue "Set" button.
    </>],
    ['Patient profile', <>
        To set patient-specific settings,
        press <PersonIcon className={classes.inlineIcon} /> in the menu on the left to go to Patient Profile.
        <br /><br />
        Every setting is represented as a blue button or a textbox.
        To modify the setting, click on the button or textbox.
        An adjustment dialog will open. Use the slider and the buttons in the bottom-left corner to adjust your value.
        Then, press the blue "Set" button.
    </>],
    ['Main monitor page', <>
        On the <ChartIcon className={classes.inlineIcon} /> Monitor page, you can do several things.
        <ol className={classes.ol}>
            <li>Desired FiO<sub>2</sub> level</li>
            <li>Pressure</li>
            <li>Charts - see instruction page #7 for more details;</li>
            <li>Humidity bar - ??</li>
            <li>Temperature level - ??</li>
        </ol>
    </>],
    ['Main monitor page, continued', <>
        These are the charts you can see on the <ChartIcon className={classes.inlineIcon} /> Monitor page.
    </>],
    [<>O<sub>2</sub> level and pressure</>, <>
        To manually control oxygen level and pressure, use the buttons near the LCD screen.
        <br /><br />
        [pictures, etc]
        <br /><br />
        All changes will be updated and visible on the touch display as well.
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