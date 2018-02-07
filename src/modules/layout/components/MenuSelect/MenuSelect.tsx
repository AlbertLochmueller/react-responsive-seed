import * as React from 'react';
import * as classNames from 'classnames';
import {style} from 'typestyle';
import {theme} from '../../../../components/App/ui-theme';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import MenuItem from 'material-ui/Menu/MenuItem';
import {lighten} from 'material-ui/styles/colorManipulator';

export interface MenuSelectProps {
    name: string;
    id: string;
    value: any;
    label: string;
    options: any; //enum
    hasError: boolean;
    disabled?: boolean;
    onChange(option: any);
}

const menuSelectClasses = {
    vertical: style({
        width: '100%',
        position:'relative' as any,
        alignItems: 'stretch' as any,
        padding: 0,
        marginBottom: 20,
        marginTop: 0,
        $nest: {
            'p': {
                position: 'absolute' as any,
            },
            'svg': {
                position: 'absolute' as any,
                right: 0,
                height: 32,
                width: 32,
            }
        }
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
        height: 40,
        background: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '0px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow', 'color']),
        $nest: {
            '&:focus': {
                borderColor: theme.palette.primary.A400,
                borderRadius: 4,
            },
        }
    }),
    formError: style({
        borderRadius: 4,
        height: 40,
        background: theme.palette.common.white,
        border: '1px solid #ced4da',
        borderColor: theme.palette.error.A400,
        fontSize: 16,
        padding: '0px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow', 'color']),
        $nest: {
            '&:focus': {
                borderColor: theme.palette.primary.A400,
                borderRadius: 4,
            },
        }
    }),
    textFieldFormLabel: style({
        transition: theme.transitions.create(['color']),
        fontSize: 18,
    }),
    menu: style({
        width: '100%' as any,
        zIndex: theme.zIndex.dialog + 1,
    }),
    menuOverride: style({
        margin: '0px 1px',
        display: 'flex' as any,
        justifyContent: 'center' as any,
        $nest: {
            'ul': {
                padding: 0,
            }
        }
    }),
    contentTypography: style({
        color: theme.palette.text.secondary,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'center' as any,
        height: 'inherit' as any,

    }),
    disabled: style({
        background: lighten(theme.palette.secondary.A100, 0.75)
    })
};

export const MenuSelect = ({name, id, options, value, label, disabled, hasError, onChange}: MenuSelectProps) => (
    <TextField
        disabled={disabled}
        name={name}
        select
        id={id}
        label={label}
        className={menuSelectClasses.vertical}
        value={value}
        onChange={(event) => onChange(event)}
        SelectProps={{
            MenuProps: {
                className: menuSelectClasses.menu,
                classes: {
                    paper: menuSelectClasses.menuOverride
                }
            },
        }}
        InputProps={{
            disableUnderline: true,
            classes: {
                root: menuSelectClasses.textFieldRoot,
                input: classNames(
                    hasError && menuSelectClasses.formError,
                    !hasError && menuSelectClasses.textFieldInput,
                    disabled && menuSelectClasses.disabled
                ),
            },
        }}
        InputLabelProps={{
            shrink: true,
            className: menuSelectClasses.textFieldFormLabel,
        }}
        margin="normal"
    >
        {Object.keys(options).map(option => (
            <MenuItem key={option} value={options[option]} style={{margin: 0, height: 17}}>
                <Typography className={menuSelectClasses.contentTypography}>
                    {options[option]}
                </Typography>
            </MenuItem>
        ))}
    </TextField>
);