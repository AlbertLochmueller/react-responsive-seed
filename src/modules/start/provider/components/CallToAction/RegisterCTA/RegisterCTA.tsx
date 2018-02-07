import * as React from 'react';
import Typography from 'material-ui/Typography';
import {style} from 'typestyle';
import {Link} from 'react-router-dom';
import Button from 'material-ui/Button';
import {theme} from '../../../../../../components/App/ui-theme';
import {REGISTER_PATH} from '../../../../../users/components/UserNavControl/UserNavControl';

const registerCTAClasses = {
    registerCTA: style({
        width: '100%' as any,
        display: 'flex' as any,
        flexDirection: 'row' as any,
        justifyContent: 'space-between' as any,
        alignItems: 'center' as any,
        paddingTop: 50,
        paddingBottom: 100,
    }),
    textArea: style({
        textAlign: 'left' as any,
    }),
    headlineTypography: style({
        textAlign: 'left' as any,
        color: theme.palette.text.primary
    }),
    contentTypography: style({
        color: theme.palette.secondary.A400,
        textAlign: 'left' as any,
    }),
    ctaItem: style({
        display: 'block' as any,
        // margin: theme.spacing.unit,
    }),
    actionElement: style({
        textAlign: 'center' as any,
        cursor: 'pointer' as any,
        textDecoration: 'none' as any,
    }),
    button: style({
        textTransform: 'none' as any,
        padding: 20,
        // display: 'inline-block' as any,
        background: 'linear-gradient(45deg, #1f877d 30%, #26A69A 90%)',
        $nest: {
            '&:hover': {
                background: 'linear-gradient(45deg, #1c7c73 30%, #239b90 90%)',
            }
        }
    }),
};

export const RegisterCTA = () => (
    <div className={registerCTAClasses.registerCTA}>
        <div className={registerCTAClasses.textArea}>
            <Typography className={registerCTAClasses.contentTypography} type="subheading">
                {'Mit FastReach schneller wachsen'}
            </Typography>
            <Typography className={registerCTAClasses.headlineTypography} type="headline">
                {'Jetzt Kampagnen-Anbieter registrieren'}
            </Typography>
        </div>
        <Typography className={registerCTAClasses.ctaItem} type="subheading" color="inherit">
            <div className={registerCTAClasses.actionElement}>
                <Link style={{textDecoration: 'none', color: 'inherit'}} to={REGISTER_PATH}>
                    <Button className={registerCTAClasses.button}
                            raised color="primary"
                            type="submit">
                        <Typography type="subheading" color="inherit" noWrap={true}>
                            Jetzt Registrieren
                        </Typography>
                    </Button>
                </Link>
            </div>
        </Typography>
    </div>

);