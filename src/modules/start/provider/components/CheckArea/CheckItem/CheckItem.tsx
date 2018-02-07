import * as React from 'react';
import Typography from 'material-ui/Typography';
import {style} from 'typestyle';
import * as checkIcon from '../../../assets/check.png';
import * as classNames from 'classnames';
import {theme} from '../../../../../../components/App/ui-theme';

export interface CheckItemProps {
    bold: boolean;
    children: any;
}

const checkItemClasses = {
    checkItem: style({
        marginBottom: 15,
        display: 'flex' as any,
        alignItems: 'center' as any,
        justifyContent: 'left' as any,
    }),
    checkLogo: style({
        height: 25,
        paddingRight: 10,
    }),
    contentTypography: style({
        color: theme.palette.text.secondary
    }),
    bold: style({
        fontWeight: 'bold' as any
    })
};

export const CheckItem = ({bold, children}: CheckItemProps) => (
    <div className={checkItemClasses.checkItem}>
        <img className={checkItemClasses.checkLogo} src={checkIcon}/>

        <Typography className={classNames(checkItemClasses.contentTypography, bold && checkItemClasses.bold)} type={"subheading"}>
            {...children}
        </Typography>
    </div>
);