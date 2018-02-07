import * as React from 'react';
import {style} from 'typestyle';
import Typography from 'material-ui/Typography';
import * as classNames from 'classnames';
import {Link} from 'react-router-dom';
import {LOGIN_PATH} from '../../../../../../components/Main/Main';
import {REGISTER_PATH} from '../../../../../users/components/UserNavControl/UserNavControl';
import {theme} from '../../../../../../components/App/ui-theme';

const footerUserClasses = {
    contentTypography: style({
        textAlign: 'left' as any,
        color: theme.palette.secondary.A400,
        $nest: {
            '&:hover': {
                color: theme.palette.primary.A400
            }
        }
    }),
    bold: style({
        fontWeight: 'bold' as any
    }),
};

export const FooterUser = () => (
    <div>
        <Typography className={classNames(footerUserClasses.contentTypography && footerUserClasses.bold)} type="caption">
            {"Nutzer"}
        </Typography>
        <Link style={{textDecoration: 'none', color: 'inherit'}} to={LOGIN_PATH}>
            <Typography className={footerUserClasses.contentTypography} type="caption">
                {"Login"}
            </Typography>
        </Link>
        <Link style={{textDecoration: 'none', color: 'inherit'}} to={REGISTER_PATH}>
            <Typography className={footerUserClasses.contentTypography} type="caption">
                {"Registrieren"}
            </Typography>
        </Link>
        <Link style={{textDecoration: 'none', color: 'inherit'}} to={"/help"}>
            <Typography className={footerUserClasses.contentTypography} type="caption">
                {"Hilfe"}
            </Typography>
        </Link>
        <Link style={{textDecoration: 'none', color: 'inherit'}} to={"/faq"}>
            <Typography className={footerUserClasses.contentTypography} type="caption">
                {"FAQ"}
            </Typography>
        </Link>
    </div>
);