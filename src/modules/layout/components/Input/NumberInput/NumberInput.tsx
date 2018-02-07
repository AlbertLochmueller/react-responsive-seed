import * as React from 'react';
import * as classNames from 'classnames';
import {style} from 'typestyle';
import {theme} from '../../../../../components/App/ui-theme';
import TextField from 'material-ui/TextField';

export interface NumberInputProps {
    name: string;
    hasError: boolean;
    unit?: string;
    min?: number;
    max?: number;
    value?: number;
    label: string;
    onChange(value: any);
}

const numberInputClasses = {
    numberInput: style({
        width: '100%',
    }),
    textFieldRoot: style({
        padding: 0,
        $nest: {
            'label + &': {
                marginTop: theme.spacing.unit * 3,
            },
        }
    }),
    textFieldInput: style({
        borderRadius: 4,
        background: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow', 'color']),
        $nest: {
            '&:focus': {
                borderColor: theme.palette.primary.A400,
            },
        }
    }),
    formError: style({
        borderRadius: 4,
        background: theme.palette.common.white,
        border: '1px solid #ced4da',
        borderColor: theme.palette.error.A400,
        fontSize: 16,
        padding: '10px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow', 'color']),
        $nest: {
            '&:focus': {
                borderColor: theme.palette.primary.A400,
            },
        }
    }),
    textFieldFormLabel: style({
        transition: theme.transitions.create(['color']),
        fontSize: 18,
    }),
};

function calculateRange(min?: number, max?:number) {
    if (min !== undefined && max !== undefined) {
        return {min, max}
    }
    if (min !== undefined) {
        return {min}
    }
    if (max !== undefined) {
        return {max}
    }
}

export const NumberInput = ({name, unit, min, max, label, value, hasError, onChange}: NumberInputProps) => (
    <div>
        {unit ? (
            <TextField
                name={name}
                type={"number"}
                className={numberInputClasses.numberInput}
                value={value || ""}
                label={label}
                onChange={(event) => onChange(event)}
                InputProps={{
                    disableUnderline: true,
                    inputProps: calculateRange(min, max),
                    classes: {
                        root: numberInputClasses.textFieldRoot,
                        input: classNames(hasError && numberInputClasses.formError, !hasError && numberInputClasses.textFieldInput),
                    },
                }}
                InputLabelProps={{
                    shrink: true,
                    className: numberInputClasses.textFieldFormLabel,
                }}
            />
        ) : (
            <TextField
                name={name}
                type={"number"}
                className={numberInputClasses.numberInput}
                value={value || ""}
                onChange={(event) => onChange(event)}
                label={label}
                InputProps={{
                    disableUnderline: true,
                    inputProps: calculateRange(min, max),
                    classes: {
                        root: numberInputClasses.textFieldRoot,
                        input: classNames(hasError && numberInputClasses.formError, !hasError && numberInputClasses.textFieldInput),
                    },
                }}
                InputLabelProps={{
                    shrink: true,
                    className: numberInputClasses.textFieldFormLabel,
                }}
            />
        )}
    </div>
);