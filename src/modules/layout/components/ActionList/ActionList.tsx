import * as React from 'react';
import List, {ListItemIcon} from 'material-ui/List';
import {NavLinkItem} from '../NavLinkItem/NavLinkItem';
import DashBoardIcon from 'material-ui-icons/Dashboard';
import NextWeekIcon from 'material-ui-icons/NextWeek';
import SendIcon from 'material-ui-icons/Send';
import SettingsIcon from 'material-ui-icons/Settings';
import ReceiptIcon from 'material-ui-icons/Receipt';
import EventAvailableIcon from 'material-ui-icons/EventAvailable';
import StoreMallDirectoryIcon from 'material-ui-icons/StoreMallDirectory';
import {theme} from '../../../../components/App/ui-theme';
import {style} from 'typestyle';
import Divider from 'material-ui/Divider';
import {
    AGREEMENTS_PATH,
    CAMPAIGNS_PATH, INVOICES_PATH, MARKETPLACE_PATH, NEGOTIATIONS_PATH,
    SETTINGS_PATH
} from '../../../../components/Main/Main';

export interface ActionListProps {
    isAdvertiser: boolean;
}

const actionListClasses = {
    list: style({
        width: '100%',
        maxWidth: 360,
        background: theme.palette.background.paper,
        color: theme.palette.secondary.A400,
    }),
    listItem: style({
        cursor: 'pointer',
        $nest: {
            '&:hover': {
                color: theme.palette.primary.A400
            }
        }
    })
};

export const ActionList = ({isAdvertiser}: ActionListProps) => (
    <div>
        <List className={actionListClasses.list}>
            <div className={actionListClasses.listItem}>
                <NavLinkItem target="/" label="Dashboard">
                    <ListItemIcon>
                        <DashBoardIcon style={{color: 'inherit'}}/>
                    </ListItemIcon>
                </NavLinkItem>
            </div>
            {isAdvertiser ?
                <div className={actionListClasses.listItem}>
                    <NavLinkItem target={MARKETPLACE_PATH} label="Marktplatz">
                        <ListItemIcon>
                            <StoreMallDirectoryIcon style={{color: 'inherit'}}/>
                        </ListItemIcon>
                    </NavLinkItem>
                </div>
            :
                <div className={actionListClasses.listItem}>
                    <NavLinkItem target={CAMPAIGNS_PATH} label="Kampagnen">
                        <ListItemIcon>
                            <NextWeekIcon style={{color: 'inherit'}}/>
                        </ListItemIcon>
                    </NavLinkItem>
                </div>
            }

            <div className={actionListClasses.listItem}>
                <NavLinkItem target={NEGOTIATIONS_PATH} label="Nachrichten">
                    <ListItemIcon>
                        <SendIcon style={{color: 'inherit'}}/>
                    </ListItemIcon>
                </NavLinkItem>
            </div>
        </List>
        <Divider/>

        <List className={actionListClasses.list}>
            <div className={actionListClasses.listItem}>
                <NavLinkItem target={AGREEMENTS_PATH} label="Abschlüsse">
                    <ListItemIcon>
                        <EventAvailableIcon style={{color: 'inherit'}}/>
                    </ListItemIcon>
                </NavLinkItem>
            </div>
            {!isAdvertiser &&
            <div className={actionListClasses.listItem}>
                <NavLinkItem target={INVOICES_PATH} label="Rechnungen">
                    <ListItemIcon>
                        <ReceiptIcon style={{color: 'inherit'}}/>
                    </ListItemIcon>
                </NavLinkItem>
            </div>
            }
            <div className={actionListClasses.listItem}>
                <NavLinkItem target={SETTINGS_PATH} label="Einstellungen">
                    <ListItemIcon>
                        <SettingsIcon style={{color: 'inherit'}}/>
                    </ListItemIcon>
                </NavLinkItem>
            </div>
        </List>
    </div>

);