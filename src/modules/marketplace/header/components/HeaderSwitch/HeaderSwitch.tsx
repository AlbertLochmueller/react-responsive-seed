import * as React from 'react';
import {style} from 'typestyle';
import {Component} from 'react';
import {Vertical} from '../../../../campaigns/enums/Vertical';
import IconButton from 'material-ui/IconButton';
import DraftsIcon from 'material-ui-icons/Drafts';
import {theme} from '../../../../../components/App/ui-theme';
import Typography from 'material-ui/Typography';
import * as newsletterIcon from '../../assets/newsletter.png';


export interface HeaderSwitchProps {
    collapsed: boolean;
    submit(vertical: Vertical);
}

export interface HeaderSwitchState {
    vertical: Vertical;
}

const headerSwitchClasses = {
    expanded: style({
        width: '100%',
        marginBottom: 25,
        // height: 50,
    }),
    verticalItem: style({
        display: 'flex' as any,
        // flexWrap: 'wrap' as any,
        flexDirection: 'column' as any,
        justifyContent: 'center' as any,
        // cursor: 'pointer' as any,
    }),
    verticalIcon: style({
        margin: 'auto' as any,
        height: 100,
        width: 125,
        color: theme.palette.secondary.A400
    }),
    verticalLabel: style({
        margin: 'auto' as any,
        color: theme.palette.secondary.A400,
        textAlign: 'justify' as any,
    }),
    collapsed: style({}),
    image: style({
        margin: 'auto' as any,
        height: 125,
        maxWidth: '100%' as any,
        objectFit: 'contain' as any,
        zIndex: theme.zIndex.drawerOverlay,
    })
};

export class HeaderSwitch extends Component<HeaderSwitchProps, HeaderSwitchState> {
    constructor(props) {
        super(props);
        this.state = {
            vertical: Vertical.newsletter
        }
    }

    handleInputChange(vertical: Vertical) {
        this.setState({vertical});
    }

    render() {
        const {vertical} = this.state;
        const {submit, collapsed} = this.props;

        return (
            <div>
                {collapsed ? (
                    <Typography className={headerSwitchClasses.verticalLabel} type="subheading">
                        {vertical}
                    </Typography>
                ) : (
                    <div className={headerSwitchClasses.expanded} onClick={() => submit(Vertical.newsletter)}>
                        <div className={headerSwitchClasses.verticalItem}>
                            <img className={headerSwitchClasses.image}
                                 src={newsletterIcon}>
                            </img>
                            {/*<IconButton className={headerSwitchClasses.verticalIcon}>*/}
                                {/*<DraftsIcon style={{fontSize: 100}}/>*/}
                            {/*</IconButton>*/}
                            {/*<Typography className={headerSwitchClasses.verticalLabel} type="subheading">*/}
                                {/*{vertical}*/}
                            {/*</Typography>*/}
                        </div>

                    </div>
                )}
            </div>
        );
    }
}