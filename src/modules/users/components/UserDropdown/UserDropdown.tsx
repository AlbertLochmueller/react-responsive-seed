import * as React from 'react';
import {style} from 'typestyle';
import Popover from 'material-ui/Popover';
import {theme} from '../../../../components/App/ui-theme';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import PowerSettingsNewIcon from 'material-ui-icons/PowerSettingsNew';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import {Role} from '../../enums/Role';
import {darken} from 'material-ui/styles/colorManipulator';
import Typography from 'material-ui/Typography';

export interface UserDropdownProps {
    open: boolean;
    anchorEl: any;
    isAdvertiser: boolean;

    toggle();
}

const userDropdownClasses = {
    userDropdown: style({
        // position: 'absolute' as any,
        // right: 0,
        // left: 'auto' as any,
        // top: '100%' as any,
        width: 300,
        // height: 350,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'space-between' as any,
        alignItems: 'center' as any,
        borderRadius: 2,
        boxShadow: '0px 3px 12px rgba(27,31,35,0.15)' as any,
        $nest: {
            '&::before': {
                top: -16,
                right: 0,
                left: 'auto' as any,
                border: '8px solid transparent',
                borderBottomColor: 'rgba(27,31,35,0.15)',
            },
            '&::after': {
                top: -14,
                right: 0,
                left: 'auto' as any,
                border: '7px solid rgba(27,31,35,0.15)',
                borderBottomColor: 'white',
            }
        }
    }),
    roleHeader: style({
        width: '100%' as any,
        height: 50,
        display: 'flex' as any,
        justifyContent: 'center' as any,
        alignItems: 'center' as any,
        background: darken(theme.palette.background.paper, 0.05),
    }),
    rolesTypography: style({
        color: theme.palette.primary.A400,
    }),
    personSection: style({
        paddingLeft: 12,
        height: 50,
        display: 'flex' as any,
        flexDirection: 'row' as any,
        justifyContent: 'flex-start' as any,
        alignItems: 'center' as any,
    }),
    userData: style({
        width: '100%' as any,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'space-around' as any,
        alignItems: 'left' as any,
    }),
    settingsList: style({
        textAlign: 'left' as any,
    }),
    settingsItem: style({
        height: 50,
        display: 'flex' as any,
        color: theme.palette.secondary.A400,
        justifyContent: 'flex-start' as any,
        alignItems: 'center' as any,
        paddingLeft: 24,
        cursor: 'pointer' as any,
        $nest: {
            '&:hover': {
                color: darken(theme.palette.secondary.A400, 0.25),
                background: darken(theme.palette.background.paper, 0.05)
            }
        }
    }),
    logOutSection: style({
        width: '100%' as any,
        height: 50,
        color: theme.palette.secondary.A400,
        display: 'flex' as any,
        flexDirection: 'row' as any,
        justifyContent: 'center' as any,
        alignItems: 'center' as any,
        cursor: 'pointer',
        transition: 'background 0.25s linear, color 0.25s linear',
        $nest: {
            '&:hover': {
                color: theme.palette.background.paper,
                background: theme.palette.primary.A400
            }
        }
    })
};

export const UserDropdown = ({open, anchorEl, isAdvertiser, toggle}: UserDropdownProps) => (
    <Popover
        open={open}
        anchorEl={anchorEl}
        anchorPosition={{top: 0, left: 0}}
        onClose={() => toggle()}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        style={{zIndex: theme.zIndex.navDrawer + 2, marginTop: 6}}
    >
        <div className={userDropdownClasses.userDropdown}>
            <div className={userDropdownClasses.roleHeader}>
                <Typography className={userDropdownClasses.rolesTypography} type="subheading"
                            noWrap={true}>
                    {isAdvertiser ? Role.advertiser : Role.provider}
                </Typography>
            </div>

            <Divider style={{width: '100%', height: 1}}/>

            <div style={{padding: '12px 0px 0px 0px', width: '100%'}}>
                <div className={userDropdownClasses.personSection}>
                    <IconButton style={{width: 50}}>
                        <AccountCircleIcon/>
                    </IconButton>
                    <div className={userDropdownClasses.userData}>
                        <div>
                            <Typography style={{
                                color: theme.palette.secondary.A400,
                                whiteSpace: 'pre-wrap' as any,
                                fontWeight: 'bold' as any,
                            }}
                                        type="caption">
                                Max Mustermann
                            </Typography>
                        </div>
                        <div>
                            <Typography style={{color: theme.palette.secondary.A400, whiteSpace: 'pre-wrap' as any}}
                                        type="caption">
                                max@mustermann.de
                            </Typography>
                        </div>
                    </div>
                </div>

                <div className={userDropdownClasses.settingsList}>
                    <div className={userDropdownClasses.settingsItem}>
                        <Typography style={{color: 'inherit', whiteSpace: 'pre-wrap' as any}}
                                    type="caption">
                            Profil
                        </Typography>
                    </div>
                    <div className={userDropdownClasses.settingsItem}>
                        <Typography style={{color: 'inherit', whiteSpace: 'pre-wrap' as any}}
                                    type="caption">
                            Accounteinstellungen
                        </Typography>
                    </div>
                </div>
            </div>


            <Divider style={{width: '100%', height: 1}}/>

            <div className={userDropdownClasses.logOutSection}
                 onClick={() => location.reload(true)}>
                <div style={{margin: theme.spacing.unit}}>
                    <PowerSettingsNewIcon/>
                </div>
                <div>
                    <Typography style={{color: 'inherit'}} type="subheading">
                        Ausloggen
                    </Typography>
                </div>
            </div>
        </div>
    </Popover>

);

