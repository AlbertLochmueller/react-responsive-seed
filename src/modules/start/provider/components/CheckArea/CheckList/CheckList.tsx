import * as React from 'react';
import {style} from 'typestyle';
import {CheckItem} from '../CheckItem/CheckItem';

const checkListClasses = {
    checkList: style({
        margin: '40px 0'
    })
};

export const CheckList = () => (
    <div className={checkListClasses.checkList}>
        <CheckItem bold={false}>
            Finde die passende Newsletter-Kampagne
        </CheckItem>
        <CheckItem bold={false}>
            Verhandle und einige dich mit Anbietern
        </CheckItem>
        <CheckItem bold={false}>
            In wenigen Schritten zum offiziellen Angebot
        </CheckItem>
        <CheckItem bold={true}>
            Nutze alles komplett kostenlos
        </CheckItem>
    </div>
);