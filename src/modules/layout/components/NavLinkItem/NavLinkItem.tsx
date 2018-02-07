import * as React from 'react';
import {ListItem, ListItemText} from 'material-ui/List';
import {theme} from '../../../../components/App/ui-theme';
import {NavLink} from 'react-router-dom';
import Typography from 'material-ui/Typography';

export interface NavLinkItemProps {
    target: string;
    label: string;
    children: any;
}

export const NavLinkItem = ({target, label, children}: NavLinkItemProps) => (
    <NavLink exact style={{textDecoration: 'none', color: 'inherit'}}
             to={target}
             activeStyle={{
                 color: theme.palette.primary.A400,
                 backgroundColor: '#F5F5F5',
             }}>
        <ListItem style={{backgroundColor: 'inherit'}} button>
            {...children}
            <ListItemText disableTypography primary={
                <Typography type="subheading" color="inherit" noWrap={true}>
                    {label}
                </Typography>
            }/>
        </ListItem>
    </NavLink>

);