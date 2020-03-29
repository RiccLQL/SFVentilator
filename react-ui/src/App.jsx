import React, { useState } from 'react';

import clsx from 'clsx';

import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import {
	AppBar,
	CssBaseline,
	Divider, Drawer, IconButton,
	List, MenuItem, Select,
	Toolbar, Typography,
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ChartIcon from "@material-ui/icons/InsertChartOutlined";
import CalibrateIcon from "@material-ui/icons/AddToHomeScreen";
import SettingsIcon from "@material-ui/icons/Settings";
import ConsoleIcon from "@material-ui/icons/LaptopChromebookRounded";
import HelpIcon from "@material-ui/icons/HelpOutlined";

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import MonitorPage from "./pages/MonitorPage";
import CalibrationPage from "./pages/CalibrationPage";
import SettingsPage from "./pages/SettingsPage";
import Error404Page from "./pages/Error404Page";
import ConsolePage from "./pages/ConsolePage";

import Alarm from "./components/Alarm";

import HelpScreen from "./HelpScreen";

import { log } from './Logging';
import { useBridge } from "./Bridge";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexGrow: 1,
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.text.primary,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	left: {
		display: 'flex',
		flexGrow: 1,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	modeSelectorArea: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.9),
		marginLeft: 0,
		width: '100%',
		minWidth: '20rem',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
	},
	modeSelect: {
		display: 'flex',
		flexGrow: 1,
	},
	helpIcon: {
		marginLeft: theme.spacing(1),
	},
}));

function App() {
	const classes = useStyles();
	const theme = useTheme();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [helpOpen, setHelpOpen] = useState(false);
	const [monitorMode, setMonitorMode] = useState(0);
	const [alarm, setAlarm] = useState({
		children: <>This value is too high!</>,
		description: 'FiO2 is too high!',
		open: false,
		severity: 'error',
	});

	const bridge = useBridge(log);

	return (
		<Router>
			<div className={classes.root}>
				<HelpScreen {...{ helpOpen, setHelpOpen }} />
				<CssBaseline />
				<Alarm
					setOpen={next => setAlarm(alarm => ({ ...alarm, open: next }))}
					{...alarm}
				/>
				<AppBar
					position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: drawerOpen,
					})}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={() => setDrawerOpen(true)}
							edge="start"
							className={clsx(classes.menuButton, {
								[classes.hide]: drawerOpen,
							})}
						>
							<MenuIcon />
						</IconButton>
						<div className={classes.left}>
							<Typography className={classes.title} variant="h4" noWrap>
								Cureona RPi UI
          					</Typography>
							<IconButton
								className={classes.helpIcon}
								color="inherit"
								onClick={() => setHelpOpen(true)}
							><HelpIcon /></IconButton>
						</div>
						<Switch>
							{['/', '/monitor'].map((path, i) => <Route key={i} exact path={path} component={() => <>
								<Typography variant="h6">Breathing mode:&nbsp;</Typography>
								<div className={classes.modeSelectorArea}>
									<Select
										className={classes.modeSelect}
										onChange={event => setMonitorMode(event.target.value)}
										value={monitorMode}
										variant="outlined"
									>
										<MenuItem value={0}>Patient-triggered respiration</MenuItem>
									</Select>
								</div>
							</>} />)}
						</Switch>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					className={clsx(classes.drawer, {
						[classes.drawerOpen]: drawerOpen,
						[classes.drawerClose]: !drawerOpen,
					})}
					classes={{
						paper: clsx({
							[classes.drawerOpen]: drawerOpen,
							[classes.drawerClose]: !drawerOpen,
						}),
					}}
				>
					<div className={classes.toolbar}>
						<IconButton onClick={() => setDrawerOpen(false)}>
							{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
						</IconButton>
					</div>
					<List>
						<Link to={'/monitor'} className={classes.link}>
							<ListItem button>
								<ListItemIcon><ChartIcon /></ListItemIcon>
								<ListItemText primary="Monitor" />
							</ListItem>
						</Link>
						<Divider />
						<Link to={'/calibration'} className={classes.link}>
							<ListItem button>
								<ListItemIcon><CalibrateIcon /></ListItemIcon>
								<ListItemText primary="Calibration" />
							</ListItem>
						</Link>
						<Divider />
						<Link to={'/settings'} className={classes.link}>
							<ListItem button>
								<ListItemIcon><SettingsIcon /></ListItemIcon>
								<ListItemText primary="Settings" />
							</ListItem>
						</Link>
						<Divider />
						<Link to={'/console'} className={classes.link}>
							<ListItem button>
								<ListItemIcon><ConsoleIcon /></ListItemIcon>
								<ListItemText primary="Debug console" />
							</ListItem>
						</Link>
					</List>
				</Drawer>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Switch>
						{['/', '/monitor'].map(
							(path, i) => <Route exact path={path} key={i} component={() => <MonitorPage
								bridge={bridge}
								mode={monitorMode}
								setMode={setMonitorMode}
							/>} />
						)}
						<Route exact path='/calibration' component={
							() => <CalibrationPage />
						} />
						<Route exact path='/console' component={
							() => <ConsolePage />
						} />
						<Route exact path='/settings' component={
							() => <SettingsPage />
						} />
						<Route component={Error404Page} />
					</Switch>
				</main>
			</div>
		</Router>
	);
}

export default App;