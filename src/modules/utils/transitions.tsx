import * as React from 'react';
import {Component} from 'react';
import Slide from 'material-ui/transitions/Slide';

export function slideIn(props) {
    return <Slide direction="up" {...props} />;
}
