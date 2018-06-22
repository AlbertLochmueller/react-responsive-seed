import * as React from 'react';
import {style} from "typestyle";
import * as classNames from 'classnames';

export interface SwitcheridooProps {
    color: any;
}

const switcheridooClasses = {
    root: style({
        width: '6vw',
        height: '6vw',
        cursor: 'pointer',
        transition: 'background 0.5s',
        $nest: {
            '&:hover': {
                background: 'black'
            }
        }
    }),
    inner: style({})
};

export const Switcheridoo = ({color}: SwitcheridooProps) => (
    <div className={classNames(color, switcheridooClasses.root)}>
    </div>
);
