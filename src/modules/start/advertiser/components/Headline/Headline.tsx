import * as React from 'react';
import {style} from 'typestyle';
import Typography from 'material-ui/Typography';
import {CheckList} from '../CheckArea/CheckList/CheckList';
import Button from 'material-ui/Button';
import {Link} from 'react-router-dom';
import * as marketplaceIcon from '../../assets/headerImage.png';
import {theme} from '../../../../../components/App/ui-theme';
import {REGISTER_PATH} from '../../../../users/components/UserNavControl/UserNavControl';

const headlineClasses = {
    root: style({
       // position: 'relative' as any,
    }),
    header: style({
        display: 'flex' as any,
        flexDirection: 'row' as any,
        // justifyContent: 'space-between' as any,
        height: 'inherit' as any,
        margin: 'auto' as any,
        padding: '25px 0px 25px 0px',
        maxWidth: '100%',
        position: 'relative' as any,
        [theme.breakpoints.up('lg')]: {
            width: 1200,
        },
        [theme.breakpoints.down('lg')]: {
            width: 900,
        },
        [theme.breakpoints.down('md')]: {
            width: 600,
        },
    }),
    leftTile: style({
        left: 0,
        position: 'absolute' as any,
        width: '100%',
        zIndex: 3,
        textAlign: 'left' as any,
        [theme.breakpoints.down('lg')]: {
            width: '100%',
        },
    }),
    rightTile: style({
        left: 0,
        position: 'absolute' as any,
        width: '100%',
        zIndex: 2,
        textAlign: 'right',
        [theme.breakpoints.down('sm')]: {
            width: 0,
        },
    }),
    headlineTypography: style({
        textAlign: 'left' as any,
        fontWeight: 'bold' as any,
        zIndex: 3,
        color: theme.palette.text.primary
    }),
    ctaGroup: style({
        position: 'absolute' as any,
        height: '20%',
        zIndex: 3,
    }),
    actionElement: style({
        textAlign: 'left' as any,
        cursor: 'pointer' as any,
        textDecoration: 'none' as any,
    }),
    button: style({
        textTransform: 'none' as any,
        display: 'inline-block' as any,
        background: 'linear-gradient(45deg, #1f877d 30%, #26A69A 90%)',
        $nest: {
            '&:hover': {
                background: 'linear-gradient(45deg, #1c7c73 30%, #239b90 90%)',
            }
        }
    }),
    linkCTA: style({
        textAlign: 'left' as any,
        cursor: 'pointer',
        paddingTop: 20,
        [theme.breakpoints.down('md')]: {
            display: 'none' as any,
        },
    }),
    logo: style({
        height: 375,
        [theme.breakpoints.down('md')]: {
            display: 'none' as any,
            height: 0,
        },
    }),
};

export const Headline = () => (
    <div className={headlineClasses.root}>
        <div className={headlineClasses.header}>
            <div className={headlineClasses.leftTile}>
                <Typography className={headlineClasses.headlineTypography} type="headline">
                    Finde genau die richtige Newsletter-Kampagne
                </Typography>
                <CheckList/>

                <div className={headlineClasses.ctaGroup}>
                    <div className={headlineClasses.actionElement}>
                        <Link style={{textDecoration: 'none', color: 'inherit'}} to={REGISTER_PATH + '?advertiser'}>
                            <Button className={headlineClasses.button} raised color="primary"
                                    type="submit">Registrieren
                            </Button>
                        </Link>
                    </div>

                    <div className={headlineClasses.linkCTA}>
                        Du willst eine Kampagne inserieren? <Link to="/offer">Hier Lang!</Link>
                    </div>
                </div>
            </div>
            <div className={headlineClasses.rightTile}>
                <img className={headlineClasses.logo} src={marketplaceIcon}/>
            </div>
        </div>
    </div>
);