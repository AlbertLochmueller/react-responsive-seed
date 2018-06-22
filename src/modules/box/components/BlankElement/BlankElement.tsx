import * as React from 'react';
import {style} from "typestyle";
import * as classNames from 'classnames';

const blankClasses = {
  root: style({
      width: '6vw',
      height: '6vw',
      border: '1px solid #000'
  }),
};

export const BlankElement = () => (
    <div className={blankClasses.root}>
    </div>
);
