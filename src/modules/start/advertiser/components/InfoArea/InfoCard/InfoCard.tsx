import * as React from 'react';
import {style} from 'typestyle';
import Typography from 'material-ui/Typography';
import {theme} from '../../../../../../components/App/ui-theme';

export interface InfoCardProps {
    headLine: string;
    content: string;
    image: string;
}


const infoCardClasses = {
    infoCard: style({
        borderRadius: 15,
        border: `1px solid ${theme.palette.primary.A400}`,
        width: 290,
        height: 350,
        padding: '40px 10px 25px 10px',
        margin: theme.spacing.unit
    }),
    headlineTypography: style({
        textAlign: 'center' as any,
        color: theme.palette.text.primary
    }),
    contentTypography: style({
        textAlign: 'center' as any,
        color: theme.palette.secondary.A400
    }),
    logo: style({
        height: 150,
        backgroundSize: 'contain' as any,
        marginBottom: 40,
    }),
};

export const InfoCard = ({headLine, content, image}: InfoCardProps) => (
    <div className={infoCardClasses.infoCard}>
        <img className={infoCardClasses.logo} src={image}/>
        <Typography className={infoCardClasses.headlineTypography} type="subheading">
            {headLine}
        </Typography>
        <Typography className={infoCardClasses.contentTypography} type="caption">
            {content}
        </Typography>
    </div>
);