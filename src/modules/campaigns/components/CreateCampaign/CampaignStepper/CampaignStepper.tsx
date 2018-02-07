// import * as React from 'react';
// import * as classNames from 'classnames';
// import {style} from 'typestyle';
// import {Component} from 'react';
// import {theme} from '../../../../../components/App/ui-theme';
// import Stepper, {Step, StepLabel, StepContent} from 'material-ui/Stepper';
// import Typography from 'material-ui/Typography';
// import {StepperActionArea} from '../StepperActionArea/StepperActionArea';
// import {getSteps} from '../NewCampaign/NewCampaign';
//
// export interface CampaignStepperProps {
//     children;
//     submit();
// }
//
// export interface CampaignStepperState {
//     activeStep: number;
// }
//
// const campaignStepperClasses = {
//     root: style({
//         width: '90%',
//     }),
//     stepLabel: style({
//         color: theme.palette.secondary.A400
//     }),
//     activeStepLabel: style({
//         transition: 'color 0.25s linear',
//         color: theme.palette.primary.A400
//     }),
//     stepperContent: style({
//         paddingRight: 0,
//     }),
//
// };
//
// export class CampaignStepper extends Component<CampaignStepperProps, CampaignStepperState> {
//     constructor(props) {
//         super(props);
//         this.state = {
//             activeStep: 0,
//         }
//     }
//
//     handleNext = () => {
//         this.setState({
//             activeStep: this.state.activeStep + 1,
//         });
//     };
//
//     handleBack = () => {
//         this.setState({
//             activeStep: this.state.activeStep - 1,
//         });
//     };
//
//     handleReset = () => {
//         this.setState({
//             activeStep: 0,
//         });
//     };
//
//     render() {
//         const {activeStep} = this.state;
//         const steps = getSteps();
//         const {submit} = this.props;
//
//         return (
//             <Stepper activeStep={activeStep} orientation="vertical" style={{padding: 12, marginTop: 5}}>
//                 {steps.map((label, index) => {
//                     return (
//                         <Step key={label}>
//                             <StepLabel>
//                                 <Typography
//                                     className={classNames(campaignStepperClasses.stepLabel, (index === activeStep) && campaignStepperClasses.activeStepLabel)}>{label}</Typography>
//                             </StepLabel>
//                             <StepContent className={campaignStepperClasses.stepperContent}>
//                                 {{...this.props.children}}
//                                 <StepperActionArea
//                                     activeStep={index}
//                                     back={() => this.handleBack()}
//                                     next={() => this.handleNext()}
//                                     submit={() => submit()}
//                                 />
//                             </StepContent>
//                         </Step>
//                     )
//                 })}
//             </Stepper>
//         )
//     }
//
// }
//
