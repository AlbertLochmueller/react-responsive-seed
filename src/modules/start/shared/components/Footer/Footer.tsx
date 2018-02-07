import * as React from 'react';
import {style} from 'typestyle';
import Card from 'material-ui/Card';
import {FooterNavigation} from './FooterNavigation/FooterNavigation';
import {FooterFastReach} from './FooterFastReach/FooterFastReach';
import {FooterUser} from './FooterUser/FooterUser';
import {FooterNewsletter} from './FooterNewsletter/FooterNewsletter';
import {theme} from '../../../../../components/App/ui-theme';

export interface FooterProps {
    submitMail(email: string);
}

const footerClasses = {
    fullWidth: style({
        width: '100%',
    }),
    content: style({
        height: 200,
        width: '75%',
        [theme.breakpoints.down('lg')]: {
            width: '100%',
        },
        display: 'flex' as any,
        flexDirection: 'row' as any,
        flexWrap: 'wrap' as any,
        margin: 'auto' as any,
    }),
    list: style({
        textAlign: 'left' as any,
        margin: 'auto' as any,
        height: 150,
        width: 120,
    }),
    input: style({
        textAlign: 'center' as any,
        margin: 'auto' as any,
        height: 150,
        width: 250,
    }),
};

export const Footer = ({submitMail}: FooterProps) => (
    <Card className={footerClasses.fullWidth}>
        <div className={footerClasses.content}>
            <div className={footerClasses.list}>
                <FooterNavigation/>
            </div>
            <div className={footerClasses.list}>
                <FooterFastReach/>
            </div>
            <div className={footerClasses.list}>
                <FooterUser/>
            </div>
            <div className={footerClasses.input}>
                <FooterNewsletter submit={(email) => submitMail(email)}/>
            </div>
        </div>
    </Card>
);