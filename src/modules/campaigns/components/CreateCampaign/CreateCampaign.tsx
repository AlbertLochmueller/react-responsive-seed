import * as React from 'react';
import {theme} from '../../../../components/App/ui-theme';
import * as classNames from 'classnames';
import List, {ListItem, ListItemIcon} from 'material-ui/List';
import Button from 'material-ui/Button';
import AddCircleIcon from 'material-ui-icons/AddCircle';
import {style} from 'typestyle';
import {Component} from 'react';
import {NewCampaignContainer} from '../../containers/NewCampaignContainer';

export interface CreateCampaignProps {
    open: boolean;
}

const createCampaignClasses = {
    list: style({
        width: '100%',
        maxWidth: 360,
        background: theme.palette.background.paper,
        // color: theme.palette.secondary.A400,
    }),
    listItem: style({
        cursor: 'pointer',
        color: theme.palette.secondary.A400,
        $nest: {
            '&:hover': {
                color: theme.palette.primary.A400
            }
        }
    }),
    bottomList: style({
        display: 'flex' as any,
        flexDirection: 'column' as any,
        paddingTop: 0,

    }),
    campaignVisible: style({
        visibility: 'visible' as 'visible',
        opacity: 1,
        transition: 'opacity 1.5s linear',
    }),
    campaignHidden: style({
        visibility: 'hidden' as 'hidden',
        opacity: 0,
        height: 0,
        width: 0,
    }),
    button: style({
        textTransform: 'none' as any,
        width: 150,
        background: 'linear-gradient(45deg, #1f877d 30%, #26A69A 90%)',
        $nest: {
            '&:hover': {
                background: 'linear-gradient(45deg, #1c7c73 30%, #239b90 90%)',
            }
        }
    }),
};

export interface CreateCampaignState {
    newCampaignActive: boolean;
}

export class CreateCampaign extends Component<CreateCampaignProps, CreateCampaignState> {
    constructor(props) {
        super(props);

        this.state = {
            newCampaignActive: false
        };
    }

    activate() {
        this.setState({newCampaignActive: true})
    }

    deactivate() {
        this.setState({newCampaignActive: false})
    }

    render() {
        const {open} = this.props;
        const {newCampaignActive} = this.state;

        return (
            <div style={{margin: 'auto'}}>
                <List className={classNames(createCampaignClasses.list && createCampaignClasses.bottomList)}>
                    <ListItem
                        style={{margin: 'auto'}}
                        className={classNames(open && createCampaignClasses.campaignVisible, !open && createCampaignClasses.campaignHidden)}>
                            <Button className={createCampaignClasses.button}
                                    raised color="primary"
                                    type="submit"
                            onClick={() => this.activate()}
                            >Kampagne Erstellen
                            </Button>
                    </ListItem>
                    {!open &&
                    <div>
                        <ListItem className={createCampaignClasses.listItem}>
                                <ListItemIcon onClick={() => this.activate()}>
                                    <AddCircleIcon style={{color: 'inherit'}}/>
                                </ListItemIcon>
                        </ListItem>
                    </div>
                    }
                </List>
                {newCampaignActive && <NewCampaignContainer onClose={() => this.deactivate()}/>}
            </div>

        )
    }
}

