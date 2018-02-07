import * as React from 'react';
import {style} from 'typestyle';
import {theme} from '../../../../../../../../components/App/ui-theme';
import {lighten} from 'material-ui/styles/colorManipulator';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

export interface BlankElementProps {
    onAdd();
}

const carouselElementClasses = {
    blank: style({
        background: lighten(theme.palette.secondary.A400, 0.95),
        minHeight: 90,
        width: 150,
        display: 'flex' as any,
        justifyContent: 'center' as any,
        alignItems: 'center' as any,
    })
};

export const BlankElement = ({onAdd}: BlankElementProps) => (
        <div className={carouselElementClasses.blank}>
            <Button fab mini
                    color="primary"
                    aria-label="add"
                    onClick={() => onAdd()}>
                <AddIcon/>
            </Button>
        </div>
);