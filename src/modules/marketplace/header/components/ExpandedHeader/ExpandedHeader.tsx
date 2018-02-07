import * as React from 'react';
import {style} from 'typestyle';
import {HeaderSearch, HeaderSubmit} from '../HeaderSearch/HeaderSearch';
import IconButton from 'material-ui/IconButton';
import ExpandLessIcon from 'material-ui-icons/ExpandLess';
import {HeaderSwitch} from '../HeaderSwitch/HeaderSwitch';
import {Vertical} from '../../../../campaigns/enums/Vertical';
import * as headerImage from './../../assets/background.jpg';

export interface ExpandedHeaderProps {
    query: string;

    toggle();

    submit(value: HeaderSubmit);

    switchVertical(vertical: Vertical);
}

const expandedHeaderClasses = {
    expandedHeader: style({
        width: '100%' as any,
        textAlign: 'center' as 'center',
        display: 'inline-block' as any,
        position: 'relative' as any,
        height: 400,
    }),
    content: style({
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'center' as any,
        flexWrap: 'wrap' as any,
        width: 600,
        margin: 'auto' as any,
        height: '100%'
    }),
    collapseToggle: style({
        position: 'absolute',
        bottom: 10,
        right: 10,
    }),
    headerImage: style({
        position: 'absolute' as any,
        top: 0,
        left: 0,
        height: '100%',
        width: '100%' as any,
        objectFit: 'cover' as any,
        $nest: {
            '::before': {
                display: 'block' as any,
                position: 'fixed' as any,
                width: '100%' as any,
                height: '100%' as any,
                left: 0,
                top: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.6)' as any
            }
        }
    })
};

export const ExpandedHeader = ({toggle, submit, switchVertical, query}: ExpandedHeaderProps) => (
    <div className={expandedHeaderClasses.expandedHeader}>
            <img className={expandedHeaderClasses.headerImage}
                 src={headerImage}>
            </img>
        <div className={expandedHeaderClasses.content}>
            <HeaderSwitch collapsed={false} submit={(vertical) => switchVertical(vertical)}/>
            <HeaderSearch collapsed={false} submit={(value) => submit(value)} query={query}/>
        </div>

        <IconButton className={expandedHeaderClasses.collapseToggle} onClick={() => toggle()}>
            <ExpandLessIcon/>
        </IconButton>
    </div>
);