// import * as React from 'react';
// import {Component} from 'react';
// import {CreateCampaign} from '../components/CreateCampaign/CreateCampaign';
// import {Inject} from 'react.di';
// import {CampaignService} from '../services/CampaignService';
// import {Vertical} from '../enums/Vertical';
// import {Success} from '../components/CreateCampaign/Success/Success';
//
// interface CreateCampaignContainerProps {
//     open: boolean;
// }
//
// interface CreateCampaignContainerState {
//     success: boolean;
//     finishMode: boolean;
// }
//
//
// export class CreateCampaignContainer extends Component<CreateCampaignContainerProps, CreateCampaignContainerState> {
//
//     @Inject campaignService: CampaignService;
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             success: false,
//             finishMode: false,
//         };
//     }
//
//     handleSubmit(data?: any) {
//         if (data) {
//             this.setState({
//                 finishMode: true
//             });
//
//             // TODO Implement dynamic vertical lateron
//             this.campaignService.createCampaign({campaign: data, vertical: Vertical.newsletter})
//                 .then(() => {
//                     this.setState({
//                         success: true,
//                     })
//                 })
//                 .catch(() => {
//                     this.setState({
//                         success: false,
//                     })
//                 });
//             return;
//         }
//     }
//
//     handleClose() {
//        this.setState({
//            finishMode: false,
//            success: false
//        }, () => this.forceUpdate())
//     }
//
//     render() {
//         const {open} = this.props;
//         const {finishMode, success} = this.state;
//
//         return (<div>
//                 {finishMode ?
//                     <Success open={finishMode} successful={success} toggle={() => this.handleClose()}/>
//                     :
//                     <CreateCampaign open={open} submit={data => this.handleSubmit(data)}/>
//                 }
//             </div>
//             );
//     }
// }
