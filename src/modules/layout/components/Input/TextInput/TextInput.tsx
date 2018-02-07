import * as React from 'react';
import * as classNames from 'classnames';
import {style} from 'typestyle';
import {theme} from '../../../../../components/App/ui-theme';
import TextField from 'material-ui/TextField';

export interface TextInputProps {
    name: string;
    hasError: boolean;
    rows?: number;
    defaultValue?: string;
    placeholder: string;
    label: string;
    onChange(event);
    onSubmit?();
}

const textInputClasses = {
    textInput: style({
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
                // borderColor: '#80bdff',
                borderColor: theme.palette.primary.A400,
                // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        }
    }),
    textFieldFormLabel: style({
        transition: theme.transitions.create(['color']),
        fontSize: 18,
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
                // borderColor: '#80bdff',
                borderColor: theme.palette.primary.A400,
                // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        }
    })
};

export const TextInput = ({name, rows, placeholder, label, defaultValue, hasError, onChange, onSubmit}: TextInputProps) => (
    <div>
        {rows ? (
            <TextField
                name={name}
                className={textInputClasses.textInput}
                value={defaultValue || ""}
                multiline={true}
                onKeyUp={(e) => (e.keyCode === 13) ? onSubmit && onSubmit() : null}
                rows={rows}
                placeholder={placeholder}
                label={label}
                onChange={(event) => onChange(event)}
                InputProps={{
                    disableUnderline: true,
                    classes: {
                        root: textInputClasses.textFieldRoot,
                        input: classNames(hasError && textInputClasses.formError, !hasError && textInputClasses.textFieldInput),
                    },
                }}
                InputLabelProps={{
                    shrink: true,
                    className: textInputClasses.textFieldFormLabel,
                }}
            />
        ) : (
            <TextField
                name={name}
                className={textInputClasses.textInput}
                value={defaultValue || ""}
                placeholder={placeholder}
                onChange={(event) => onChange(event)}
                onKeyUp={(e) => (e.keyCode === 13) ? onSubmit && onSubmit() : null}
                label={label}
                InputProps={{
                    disableUnderline: true,
                    classes: {
                        root: textInputClasses.textFieldRoot,
                        input: classNames(hasError && textInputClasses.formError, !hasError && textInputClasses.textFieldInput),
                    },
                }}
                InputLabelProps={{
                    shrink: true,
                    className: textInputClasses.textFieldFormLabel,
                }}
            />
        )}
    </div>
);