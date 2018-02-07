import * as React from 'react';
import * as classNames from 'classnames';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import {style} from 'typestyle';
import {theme} from '../../../../components/App/ui-theme';
import {Home} from '../Home/Home';
import Typography from 'material-ui/Typography';
import {ActionList} from '../ActionList/ActionList';
import {CreateCampaign} from '../../../campaigns/components/CreateCampaign/CreateCampaign';

export interface SideNavProps {
    open: boolean;

    isAdvertiser: boolean;

    toggle(): any;

    goHome(): any;
}

const drawerWidth = 240;

const sideNavClasses = {
    sideNav: style({
        backgroundColor: theme.palette.background.paper,
        height: '100%',
    }),
    drawerPaper: style({
        position: 'relative' as 'relative',
        height: '100%',
        width: drawerWidth,
        zIndex: theme.zIndex.navDrawer,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    logoVisible: style({
        minHeight: 30,
        minWidth: 125,
        position: 'relative' as any,
        // paddingLeft: 30,
        visibility: 'visible' as 'visible',
        opacity: 1,
        transition: 'opacity 1.5s linear',
    }),
    logoHidden: style({
        visibility: 'hidden' as 'hidden',
        opacity: 0,
        transition: 'visibility 0s 2s, opacity 2s linear, height 1s linear',
        height: 0,
        width: 0,
    }),
    campaignVisible: style({
        visibility: 'visible' as 'visible',
        opacity: 1,
        transition: 'opacity 1.5s linear',
    }),
    campaignHidden: style({
        visibility: 'hidden' as 'hidden',
        opacity: 0,
        height: 0,
        width: 0,
    }),
    drawerPaperClose: style({
        width: 60,
        height: '100%',
        overflowX: 'hidden' as 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    }),
    drawerInner: style({
        width: drawerWidth,
        height: '100%',
    }),
    drawerHeader: style({
        position: 'relative',
        display: 'flex' as 'flex',
        alignItems: 'center' as 'center',
        justifyContent: 'flex-end' as 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    }),
    bottomDisclaimer: style({
        paddingBottom: 20,
    }),
};

export const SideNav = ({open, isAdvertiser, toggle, goHome}: SideNavProps) => (
    <div className={sideNavClasses.sideNav}>
        <Drawer
            type="permanent"
            style={{height: '100%'}}
            classes={{
                paper: classNames(sideNavClasses.drawerPaper, !open && sideNavClasses.drawerPaperClose),
            }}
            open={open}>
            <div className={sideNavClasses.drawerInner}>
                <div className={sideNavClasses.drawerHeader}>
                    <div className={classNames(
                        !open && sideNavClasses.logoHidden,
                        open && sideNavClasses.logoVisible)}>
                        <Home logoOnly={false}/>
                    </div>
                    <IconButton style={{right: 0}} onClick={() => toggle()}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <ActionList isAdvertiser={isAdvertiser}/>
                {!isAdvertiser && <div>
                    <Divider/>
                    <CreateCampaign open={open}/>
                </div>
                }

            </div>
            <Typography
                className={classNames(sideNavClasses.bottomDisclaimer, open ? sideNavClasses.campaignVisible : sideNavClasses.campaignHidden)}
                type="caption" align="center" color="inherit" noWrap={true}>
                © FastReach
            </Typography>
        </Drawer>
    </div>
);