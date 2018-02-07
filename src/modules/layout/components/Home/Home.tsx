import * as React from 'react';
import {Link} from 'react-router-dom';
import {style} from 'typestyle';
import * as fastReachLogoFont from '../../assets/Logo_Idee.png';
import * as fastReachLogo from '../../assets/Logo_Idee_Cutoff.png';

export interface Homeprops {
    logoOnly: boolean;
}


const homeClasses = {
    fastreachLogo: style({
        minHeight: 30,
        minWidth: 125,
        cursor: 'pointer' as 'pointer',
        position: 'absolute' as any,
        objectFit: 'contain' as any,
    }),
};

function getLogo(logoOnly: boolean) {
    return logoOnly ? fastReachLogo : fastReachLogoFont;
}

export const Home = ({logoOnly}: Homeprops) => (
    <Link style={{textDecoration: 'none', color: 'inherit', minHeight: 30, minWidth: 125}} to="/">
            <img className={homeClasses.fastreachLogo} src={getLogo(logoOnly)}/>
    </Link>
);