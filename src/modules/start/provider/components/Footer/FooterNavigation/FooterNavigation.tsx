import * as React from 'react';
import {style} from 'typestyle';
import Typography from 'material-ui/Typography';
import * as classNames from 'classnames';
import {Link} from 'react-router-dom';
import {MARKETPLACE_PATH, OFFER_PATH} from '../../../../../../components/Main/Main';
import {theme} from '../../../../../../components/App/ui-theme';

const footerNavigationClasses = {
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

export const FooterNavigation = () => (
    <div>
        <Typography className={classNames(footerNavigationClasses.contentTypography && footerNavigationClasses.bold)} type="caption">
            {"Navigation"}
        </Typography>
        <Link style={{textDecoration: 'none', color: 'inherit'}} to={MARKETPLACE_PATH}>
            <Typography className={footerNavigationClasses.contentTypography} type="caption">
                {"Alle Kampagnen"}
            </Typography>
        </Link>
        <Link style={{textDecoration: 'none', color: 'inherit'}} to={OFFER_PATH}>
            <Typography className={footerNavigationClasses.contentTypography} type="caption">
                {"Kampagnen Inserieren"}
            </Typography>
        </Link>
        <Link style={{textDecoration: 'none', color: 'inherit'}} to={"/blog"}>
            <Typography className={footerNavigationClasses.contentTypography} type="caption">
                {"Blog"}
            </Typography>
        </Link>
        <Link style={{textDecoration: 'none', color: 'inherit'}} to={"/pricing"}>
            <Typography className={footerNavigationClasses.contentTypography} type="caption">
                {"Preis"}
            </Typography>
        </Link>
    </div>
);