import * as React from 'react';
import {style} from 'typestyle';
import {HeaderSearch, HeaderSubmit} from '../HeaderSearch/HeaderSearch';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import {HeaderSwitch} from '../HeaderSwitch/HeaderSwitch';
import {Vertical} from '../../../../campaigns/enums/Vertical';

export interface CollapsedHeaderProps {
    query: string;
    toggle();
    submit(value: HeaderSubmit);
    switchVertical(vertical: Vertical);
}

const collapsedHeaderClasses = {
    collapsedHeader: style({
        width: 'inherit' as any,
        display: 'flex' as any,
        flexDirection: 'row' as any,
        // flexWrap: 'nowrap' as any,
        justifyContent: 'center' as any,
        alignItems: 'stretch' as any,
        alignContent: 'center' as any,
        height: 50,
    }),
    switch: style({
        margin: 'auto' as any,
    }),
    search: style({
        width: 200,
        paddingLeft: 10,
        margin: 'auto 0px auto 0px' as any,
    }),
    expandToggle: style({
        width: 200,
        margin: 'auto 0px auto 0px' as any,
        textAlign: 'right' as any,
        paddingRight: 10,
        // justifyContent: 'flex-end' as any,
    })
};

export const CollapsedHeader = ({toggle, submit, switchVertical, query}: CollapsedHeaderProps) => (
    <div className={collapsedHeaderClasses.collapsedHeader}>
        <div className={collapsedHeaderClasses.search}>
            <HeaderSearch collapsed={true} submit={(value) => submit(value)} query={query}/>
        </div>
        <div className={collapsedHeaderClasses.switch}>
            <HeaderSwitch collapsed={true} submit={(vertical) => switchVertical(vertical)}/>
        </div>
        <div className={collapsedHeaderClasses.expandToggle}>
            <IconButton style={{textAlign: 'right'}} onClick={() => toggle()}>
                <ExpandMoreIcon/>
            </IconButton>
        </div>

    </div>
);