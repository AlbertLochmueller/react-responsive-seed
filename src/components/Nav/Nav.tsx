import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import {Component} from 'react';
import * as classNames from 'classnames';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Toolbar from 'material-ui/Toolbar';
import * as fastReachLogo from '../../modules/layout/assets/logo.png';
import {teal} from 'material-ui/colors';
import {NavTop} from '../../modules/layout/components/NavTop/NavTop';
import {Main} from '../Main/Main';
import {SideNavContainer} from '../../modules/layout/containers/SideNavContainer';
import {style} from 'typestyle';
import {theme} from '../App/ui-theme';
import {UserNavControl} from '../../modules/users/components/UserNavControl/UserNavControl';
import {Home} from '../../modules/layout/components/Home/Home';

export interface NavProps {
    isLoggedIn: boolean;
}

interface INavState {
    isLoggedIn: boolean;
    sideNavOpen: boolean;
    logo: any;
}

const drawerWidth = 240;
const appBarHeight = 50;

const navClasses = {
    root: style({
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden' as 'hidden',
    }),
    appFrame: style({
        position: 'relative' as 'relative',
        display: 'flex' as 'flex',
        width: '100%',
        height: '100%',
    }),
    appBar: style({
        position: 'absolute' as 'absolute',
        height: appBarHeight,
        background: theme.palette.background.paper,
        color: teal[500],
        zIndex: theme.zIndex.navDrawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    }),
    toolBar: style({
        ...theme.mixins.toolbar,
    }),
    logoVisible: style({
        minHeight: 30,
        minWidth: 125,
        display: 'block' as any,
        position: 'relative' as any,
        visibility: 'visible' as 'visible',
        opacity: 1,
        transition: 'opacity 1.5s linear',
    }),
    logoHidden: style({
        display: 'none' as any,
        // minHeight: 0,
        // minWidth: 0,
        // position: 'relative' as any,
        // visibility: 'hidden' as 'hidden',
        opacity: 0,
        // transition: 'visibility 0s 2s, opacity 2s linear',
    }),
    navTop: style({
        height: appBarHeight,
        width: '100%',
        whiteSpace: 'noWrap' as any,
        display: 'flex' as any,
        alignItems: 'left' as any,
        justifyContent: 'left' as any,
    }),
    userNavControl: style({
        height: '100%',
        width: '100%',
        whiteSpace: 'noWrap' as any,
        display: 'flex' as any,
        alignItems: 'center' as any,
        justifyContent: 'flex-end' as any,
    }),
    appBarShift: style({
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    menuButton: style({
        marginLeft: 0,
        marginRight: 0,
        width: 60,
        color: theme.palette.secondary.A400,
    }),
    loggedInPosition: style({
        position: 'absolute' as any,
        left: '50%' as any,
    }),
    hide: style({
        display: 'none' as 'none',
    }),
    list: style({
        width: '100%',
        maxWidth: 360,
        background: theme.palette.background.paper,
    }),
    drawerInner: style({
        width: drawerWidth,
    }),
    content: style({
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        height: 'calc(100% - 56px)',
        overflow: 'scroll' as 'scroll',
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 50px)',
            marginTop: 50,
        },
    }),
};

export class Nav extends Component<NavProps, INavState> {

    constructor(props) {
        super(props);

        this.state = {
            sideNavOpen: false,
            logo: fastReachLogo,
            isLoggedIn: this.props.isLoggedIn,
        }
    }

    componentWillMount() {
    }

    goHome() {
        console.log('Go Home()!');
    }

    handleLogAction() {

    }


    handleSideNav() {
        const sideNavOpen = !this.state.sideNavOpen;

        this.setState({
            sideNavOpen
        });
    }


    render() {
        const {isLoggedIn, sideNavOpen} = this.state;

        return (
            <div className={navClasses.root}>
                <div className={navClasses.appFrame}>
                    <AppBar className={classNames(navClasses.appBar, sideNavOpen && navClasses.appBarShift)}>
                        <Toolbar className={navClasses.toolBar}
                        disableGutters={isLoggedIn}>
                            {isLoggedIn &&
                            <IconButton
                                aria-label="Open Drawer"
                                onClick={() => this.handleSideNav()}
                                className={classNames(navClasses.menuButton, sideNavOpen && navClasses.hide)}
                            ><MenuIcon/>
                            </IconButton>
                            }

                            {isLoggedIn ? (
                                <div className={classNames(
                                    sideNavOpen && navClasses.logoHidden,
                                    !sideNavOpen && navClasses.logoVisible,
                                    navClasses.loggedInPosition)}>
                                    <div style={{position: 'relative', left: '-50%'}}>
                                    <Home logoOnly={true}/>
                                    </div>
                                </div>
                            ) : (
                                <div className={classNames(
                                    sideNavOpen && navClasses.logoHidden,
                                    !sideNavOpen && navClasses.logoVisible)}>
                                    <Home logoOnly={false}/>
                                </div>
                            )
                            }

                            <div className={navClasses.navTop}>
                                <NavTop isLoggedIn={isLoggedIn}/>
                            </div>

                            <div className={navClasses.userNavControl}>
                            <UserNavControl isLoggedIn={isLoggedIn}/>
                            </div>
                        </Toolbar>
                    </AppBar>
                    {isLoggedIn &&
                    <SideNavContainer open={sideNavOpen} toggle={() => this.handleSideNav()}
                                      goHome={() => this.goHome()}/>
                    }

                    <div className={navClasses.content}>
                        <Main/>
                    </div>
                </div>
            </div>
        )
    }
}
