import {grey, deepOrange} from 'material-ui/colors';
import {createMuiTheme} from 'material-ui/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            ...deepOrange,
            A400: '#f49b16',
        },
        secondary: {
            ...grey,
            A400: '#757575',
        },
        text: {
            primary: '#6492e0',
            secondary: '#757575',
            disabled: "rgba(0, 0, 0, 0.38)",
            hint: "rgba(0, 0, 0, 0.38)",
            icon: "rgba(0, 0, 0, 0.38)",
            divider: "rgba(0, 0, 0, 0.12)",
            lightDivider: "rgba(0, 0, 0, 0.075)"
        },
        background: {
        default: '#f7f7f7',
        }
    },
    mixins: {
        toolbar: {
            minHeight: 50,
        }
    },
    zIndex: {
        mobileStepper: 900,
        menu: 1000,
        appBar: 1100,
        drawerOverlay: 1200,
        navDrawer: 1300,
        dialogOverlay: 1400,
        dialog: 1500,
        layer: 2000,
        popover: 2100,
        snackbar: 2900,
        tooltip: 3000
}});
