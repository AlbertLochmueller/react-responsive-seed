import * as React from 'react';
import {style} from 'typestyle';
import Typography from 'material-ui/Typography';
import {theme} from '../../../../../components/App/ui-theme';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import FilterListIcon from 'material-ui-icons/FilterList';
import {Component} from 'react';
import {NewCampaignContainer} from '../../../containers/NewCampaignContainer';

export interface MyCampaignsNavProps {
    campaignCount: number;
    adCount: number;

    filter();
}

export interface MyCampaignsNavState {
    newCampaignActive: boolean;
}

const myCampaignsNavClasses = {
    myCampaignsNav: style({
        width: '100%' as any,
        display: 'flex' as any,
        justifyContent: 'space-between' as any,
        alignItems: 'center' as any,
    }),
    infoElement: style({
        width: 400,
        display: 'flex' as any,
        flexDirection: 'row' as any,
        justifyContent: 'space-between' as any,
    }),
    headlineTypography: style({
        textAlign: 'left' as any,
        color: theme.palette.secondary.A400
    }),
    actionElement: style({
        width: 100,
        display: 'flex' as any,
        flexDirection: 'row' as any,
        justifyContent: 'space-between' as any,
    }),
};


export class MyCampaignsNav extends Component<MyCampaignsNavProps, MyCampaignsNavState> {
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
        const {campaignCount, adCount, filter} = this.props;
        const {newCampaignActive} = this.state;

        return (
            <div className={myCampaignsNavClasses.myCampaignsNav}>
                <div className={myCampaignsNavClasses.myCampaignsNav}>
                    <div className={myCampaignsNavClasses.infoElement}>
                        <Typography className={myCampaignsNavClasses.headlineTypography} type="headline">
                            {`Kampagnen: ${campaignCount}`}
                        </Typography>
                        <Typography className={myCampaignsNavClasses.headlineTypography} type="headline">
                            {`Anzeigen: ${adCount}`}
                        </Typography>
                    </div>
                    <div className={myCampaignsNavClasses.actionElement}>
                        <Button fab mini
                                color="primary"
                                aria-label="filter"
                                onClick={() => filter()}
                        >
                            <FilterListIcon/>
                        </Button>
                        <Button fab mini
                                color="primary"
                                aria-label="add"
                                onClick={() => this.activate()}
                        >
                            <AddIcon/>
                        </Button>
                    </div>
                </div>
                {newCampaignActive && <NewCampaignContainer onClose={() => this.deactivate()}/>}
            </div>

        )
    }
}
