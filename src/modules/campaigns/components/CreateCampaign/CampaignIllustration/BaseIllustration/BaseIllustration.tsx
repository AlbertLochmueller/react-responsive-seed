import * as React from 'react';
import {theme} from '../../../../../../components/App/ui-theme';
import {style} from 'typestyle';
import Typography from 'material-ui/Typography';

export interface BaseIllustrationProps {
    image: string;
    children;
}

const baseIllustrationClasses = {
    baseIllustration: style({
       margin: 'auto',
       padding: 40,
       display: 'flex' as any,
       flexDirection: 'column' as any,
       justifyContent: 'center',
       alignItems: 'center' as any
    }),
    logo: style({
        height: 200,
        backgroundSize: 'contain' as any,
        marginBottom: 20,
    }),
};

export const BaseIllustration = ({image, children}: BaseIllustrationProps) => (
    <div className={baseIllustrationClasses.baseIllustration}>
        <img className={baseIllustrationClasses.logo} src={image}/>
        <div style={{textAlign: 'center', marginTop: 24}}>
            <Typography style={{color: theme.palette.secondary.A400}} type="caption">
                {...children}
            </Typography>
        </div>
    </div>
);