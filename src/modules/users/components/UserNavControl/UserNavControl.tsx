import * as React from 'react';
import * as classNames from 'classnames';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import {style} from 'typestyle';
import {theme} from '../../../../components/App/ui-theme';
import {AccountCircle} from 'material-ui-icons';
import {Component} from 'react';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import {Link} from 'react-router-dom';
import {Inject} from 'react.di';
import {AuthService} from '../../../auth/AuthService';
import {UserDropdown} from '../UserDropdown/UserDropdown';
import {findDOMNode} from 'react-dom';

export const REGISTER_PATH = '/register';

export interface UserNavProps {
    isLoggedIn: boolean;
}

export interface UserNavState {
    open: boolean;
    anchorEl: any;
    anchorRef: any;
}

const menuButtonWidth = 50;

const userNavControlClasses = {
    userNav: style({
        height: 'inherit' as any,
        display: 'flex' as any,
        alignItems: 'center' as any,
        justifyContent: 'center' as any,
    }),
    userNavItem: style({
        display: 'block' as any,
        margin: theme.spacing.unit,
    }),
    typography: style({
        color: theme.palette.secondary.A400,
        transition: 'color 0.25s linear',
        $nest: {
            '&:hover': {
                color: theme.palette.primary.A400
            }
        }
    }),
    rolesTypography: style({
        color: theme.palette.primary.A400,
    }),
    actionElement: style({
        textAlign: 'center' as any,
        cursor: 'pointer' as any,
        textDecoration: 'none' as any,
    }),
    button: style({
        textTransform: 'none' as any,
        background: 'linear-gradient(45deg, #1f877d 30%, #26A69A 90%)',
        $nest: {
            '&:hover': {
                background: 'linear-gradient(45deg, #1c7c73 30%, #239b90 90%)',
            }
        }
    }),
    menuButton: style({
        marginLeft: 0,
        marginRight: 0,
        width: menuButtonWidth,
        // display: 'block' as any,
    }),
};

export class UserNavControl extends Component<UserNavProps, UserNavState> {

    @Inject authService: AuthService;

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            anchorEl: null,
            anchorRef: 'anchor'
        }
    }

    componentWillMount() {
    }

    openMenu() {
        const {open} = this.state;

        if (open) {
            this.setState({
                open: false,
            })
        } else {

            this.setState({
                open: true,
                anchorEl: this.button ? findDOMNode(this.button) : null
            })
        }

    }

    closeMenu() {
        this.setState({open: false});
    };

    button = null;

    render() {
        const {open, anchorEl} = this.state;
        const {isLoggedIn} = this.props;

        return (
            <div>
                {
                    isLoggedIn ? (
                        <div
                            ref={node => {
                                this.button = node;}}
                            className={classNames(userNavControlClasses.userNav, userNavControlClasses.actionElement)}>
                            {this.authService.isValidAdvertiser() ?
                                <Typography className={userNavControlClasses.rolesTypography} type="caption"
                                            noWrap={true}>
                                    {'[Werbender]'}
                                </Typography>
                                :
                                <Typography className={userNavControlClasses.rolesTypography} type="caption"
                                            noWrap={true}>
                                    {'[Anbieter]'}
                                </Typography>
                            }

                            <IconButton
                                // buttonRef={node => {
                                //     this.button = node;
                                // }}
                                onClick={() => this.openMenu()}
                                className={classNames(userNavControlClasses.menuButton, userNavControlClasses.typography)}
                            >
                                <AccountCircle/>
                            </IconButton>
                            <UserDropdown open={open}
                                          anchorEl={anchorEl}
                                          isAdvertiser={this.authService.isValidAdvertiser()}
                                          toggle={() => this.closeMenu()}/>
                        </div>
                    ) : (
                        <div className={userNavControlClasses.userNav}>
                            <Typography className={userNavControlClasses.userNavItem} type="subheading" color="inherit">
                                <div className={userNavControlClasses.actionElement}>
                                    <Link style={{textDecoration: 'none', color: 'inherit'}} to={REGISTER_PATH}>
                                        <Button className={userNavControlClasses.button}
                                                raised color="primary"
                                                type="submit">
                                            <Typography type="caption" color="inherit" noWrap={true}>
                                                Registrieren
                                            </Typography>
                                        </Button>
                                    </Link>
                                </div>
                            </Typography>
                            <Divider/>
                            <Typography className={userNavControlClasses.userNavItem} type="title">
                                <div className={userNavControlClasses.actionElement}>
                                    <Link style={{textDecoration: 'none', color: 'inherit'}} to="/login">
                                        <Typography className={userNavControlClasses.typography} type="caption"
                                                    noWrap={true}>
                                            Anmelden
                                        </Typography>
                                    </Link>
                                </div>
                            </Typography>
                        </div>
                    )
                }
            </div>
        )
    }
}