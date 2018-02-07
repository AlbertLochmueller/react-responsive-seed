import * as React from 'react';
import {Component} from 'react';
import {Inject} from 'react.di';
import {CampaignService} from '../services/CampaignService';
import {Vertical} from '../enums/Vertical';
import {Success} from '../components/CreateCampaign/Success/Success';
import {NewCampaign} from '../components/CreateCampaign/NewCampaign/NewCampaign';
import {Campaign} from '../interfaces/Campaign';

export interface NewCampaignContainerProps {
    onClose();
}

interface NewCampaignContainerState {
    open: boolean;
    success: boolean;
    finishMode: boolean;
}


export class NewCampaignContainer extends Component<NewCampaignContainerProps, NewCampaignContainerState> {

    @Inject campaignService: CampaignService;

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            success: false,
            finishMode: false,
        };
    }

    handleSubmit(data: Campaign) {

        console.log('Kampagne: ', data);

        this.setState({
            finishMode: true
        });

        // TODO Implement dynamic vertical lateron
        this.campaignService.createCampaign({campaign: data, vertical: Vertical.newsletter})
            .then(() => {
                this.setState({
                    success: true,
                })
            })
            .catch(() => {
                this.setState({
                    success: false,
                })
            });
        return;
    }

    handleClose() {
        this.setState({
            finishMode: false,
            success: false,
            open: false
        }, () => this.forceUpdate());

        const {onClose} = this.props;
        onClose();
    }

    render() {
        const {finishMode, success, open} = this.state;

        return (
            <div>
                {finishMode ?
                    <Success open={finishMode} successful={success} toggle={() => this.handleClose()}/>
                    :
                    <NewCampaign open={open}
                                 submit={data => this.handleSubmit(data)}
                                 toggle={() => this.handleClose()}
                    />
                }
            </div>
        );
    }
}
