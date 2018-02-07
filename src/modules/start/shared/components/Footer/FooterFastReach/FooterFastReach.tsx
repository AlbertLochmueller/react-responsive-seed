import * as React from 'react';
import {style} from 'typestyle';
import Typography from 'material-ui/Typography';
import * as classNames from 'classnames';
import {Link} from 'react-router-dom';
import {theme} from '../../../../../../components/App/ui-theme';

const footerFastReachClasses = {
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

export const FooterFastReach = () => (
    <div>
        <Typography className={classNames(footerFastReachClasses.contentTypography && footerFastReachClasses.bold)} type="caption">
            {"FastReach"}
        </Typography>
        <Link style={{textDecoration: 'none', color: 'inherit'}} to={"/about"}>
            <Typography className={footerFastReachClasses.contentTypography} type="caption">
                {"Über Uns"}
            </Typography>
        </Link>
        <Link style={{textDecoration: 'none', color: 'inherit'}} to={"/imprint"}>
            <Typography className={footerFastReachClasses.contentTypography} type="caption">
                {"Impressum"}
            </Typography>
        </Link>
        <Link style={{textDecoration: 'none', color: 'inherit'}} to={"/contact"}>
            <Typography className={footerFastReachClasses.contentTypography} type="caption">
                {"Kontakt"}
            </Typography>
        </Link>
        <Link style={{textDecoration: 'none', color: 'inherit'}} to={"/legal"}>
            <Typography className={footerFastReachClasses.contentTypography} type="caption">
                {"AGB & Disclaimer"}
            </Typography>
        </Link>
    </div>
);