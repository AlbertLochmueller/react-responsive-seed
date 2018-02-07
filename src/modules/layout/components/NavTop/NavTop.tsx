import * as React from 'react';
import {Component} from 'react';
import Typography from 'material-ui/Typography';
import {style} from 'typestyle';
import {theme} from '../../../../components/App/ui-theme';
import {Link} from 'react-router-dom';
import {AuthService} from '../../../auth/AuthService';
import {Inject} from 'react.di';

export interface NavTopProps {
    isLoggedIn: boolean;
}

const navTopClasses = {
    navTop: style({
        height: 'inherit' as any,
        width: '100%',
        whiteSpace: 'noWrap' as any,
        display: 'flex' as any,
        alignItems: 'center' as any,
        justifyContent: 'left' as any,
    }),
    navTopItem: style({
        display: 'block' as any,
        margin: theme.spacing.unit,
        color: theme.palette.secondary.A400,
        transition: 'color 0.25s linear',
        $nest: {
            '&:hover': {
                color: theme.palette.primary.A400
            }
        }
    }),
    actionElement: style({
        textAlign: 'center' as any,
        cursor: 'pointer' as any,
        textDecoration: 'none' as any,
    }),
    typography: style({
        fontWeight: 'bold' as any,
    })
};

export class NavTop extends Component<NavTopProps, {}> {

    @Inject authService: AuthService;

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }


    render() {
        const {isLoggedIn} = this.props;

        return (
                <div className={navTopClasses.navTop}>
                    {!this.authService.isValidAdvertiser() &&
                    <Typography className={navTopClasses.navTopItem} type="title">
                        <div className={navTopClasses.actionElement}>
                            <Link to="/marketplace" style={{textDecoration: 'none', color: 'inherit'}}>
                                <Typography type="caption" color="inherit" noWrap={true}>
                                    Alle Kampagnen
                                </Typography>
                            </Link>
                        </div>
                    </Typography>
                    }
                    {
                        !isLoggedIn && (
                            <div className={navTopClasses.navTop}>
                                <Typography className={navTopClasses.navTopItem} type="title">
                                    <div className={navTopClasses.actionElement}>
                                        <Link to="/offer" style={{textDecoration: 'none', color: 'inherit'}}>
                                            <Typography type="caption" color="inherit" noWrap={true}>
                                                Kampagnen Anbieten
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
