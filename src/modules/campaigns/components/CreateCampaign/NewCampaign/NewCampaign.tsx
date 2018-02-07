import * as React from 'react';
import {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import {style} from 'typestyle';
import {theme} from '../../../../../components/App/ui-theme';
import {DescriptionStep} from '../CampaignForm/DescriptionStep/DescriptionStep';
import {NavStepper} from '../NavStepper/NavStepper';
import {Campaign, emptyCampaign} from '../../../interfaces/Campaign';
import {ImageStep} from '../CampaignForm/ImageStep/ImageStep';
import {GeneralStep} from '../CampaignForm/GeneralStep/GeneralStep';
import {AudienceStep} from '../CampaignForm/AudienceStep/AudienceStep';
import {AdsStep} from '../CampaignForm/AdsStep/AdsStep';
import {CampaignIllustration} from '../CampaignIllustration/CampaignIllustration';
import {Vertical} from '../../../enums/Vertical';

const newCampaignClasses = {
    newCampaign: style({
        // position: 'relative' as any,
        // margin: 'auto' as any,
        maxWidth: 900,
        // padding: '16px 32px',
        display: 'block' as any,
    }),
    navigation: style({
        width: 900,
        height: 70,
        display: 'flex' as any,
        justifyContent: 'center' as any,
        // boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
        borderBottom: '2px solid #f4f4f4',
    }),
    content: style({
        height: 500,
        display: 'flex' as any,
        flexDirection: 'row' as any,
        justifyContent: 'center' as any,
    }),
    logo: style({
        height: 250,
        backgroundSize: 'contain' as any,
    }),
    form: style({
        position: 'relative',
        width: 600,
        height: 'inherit' as any,
    }),
    campaignImageContainer: style({
        // position: 'absolute' as any,
        top: -50,
        left: 0,
        right: 0,
        margin: '0 auto',
        display: 'block' as any,
        height: 50,
        backgroundSize: 'contain' as any,
    }),
    campaignImage: style({
        cursor: 'pointer' as 'pointer',
        position: 'relative' as 'relative',
        margin: 'auto' as any,
        textAlign: 'center' as any,
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
        display: 'block' as 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    }),
    button: style({
        textTransform: 'none' as any,

    }),
    proceedButton: style({
        background: 'linear-gradient(45deg, #1f877d 30%, #26A69A 90%)',
        $nest: {
            '&:hover': {
                background: 'linear-gradient(45deg, #1c7c73 30%, #239b90 90%)',
            }
        }
    })
};

export interface NewCampaignProps {
    open: boolean;

    submit(campaign: Campaign);

    toggle();
}

interface NewCampaignState {
    campaign: Campaign;
    activeStep: number;
    completedSteps: any;
    vertical: Vertical;
    initials: {
        campaignDescription: boolean;
        images: boolean;
        general: boolean;
        audience: boolean;
        ads: boolean
    }
}

export function getSteps() {
    return ['Beschreibung', 'Bilder auswählen', 'Generelle Angaben', 'Zielgruppe', 'Anzeigen hinzufügen'];
}

export const totalSteps = () => {
    return getSteps().length;
};


export class NewCampaign extends Component<NewCampaignProps, NewCampaignState> {

    constructor(props) {
        super(props);

        this.state = {
            vertical: Vertical.newsletter,
            activeStep: 0,
            campaign: emptyCampaign,
            completedSteps: new Set(),
            initials: {
                campaignDescription: true,
                images: true,
                general: true,
                audience: true,
                ads: true,
            }
        }
    }


    completedSteps() {
        return this.state.completedSteps.size;
    }

    allStepsCompleted() {
        return this.completedSteps() === totalSteps();
    }

    isLastStep() {
        return this.state.activeStep === totalSteps() - 1;
    }

    handleNext = () => {
        let activeStep;

        if (this.isLastStep() && !this.allStepsCompleted()) {
            const steps = getSteps();
            activeStep = steps.findIndex((step, i) => !this.state.completedSteps.has(i));
        } else {
            activeStep = this.state.activeStep + 1;
        }
        this.setState({
            activeStep,
        });
    };

    handleBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1,
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 5,
            completedSteps: new Set(),
        });
    };

    handleComplete = (name: string, step?: Partial<Campaign>) => {
        let completed = new Set(this.state.completedSteps);

        if (step) {
            completed.add(this.state.activeStep);
            this.setState({
                completedSteps: completed,
                campaign: {
                    ...this.state.campaign,
                    [name]: step[name]
                },
                initials: {
                    ...this.state.initials,
                    [name]: false
                }
            }, () => this.performAction(completed));
        }


    };

    performAction(completed: any) {
        if (completed.size !== totalSteps()) {
            this.handleNext();
        } else {
            this.handleReset();
            this.submitCampaign(this.state.campaign);
        }
    }

    getStepContent(step: number, finish: boolean) {
        switch (step) {
            case 0:
                return <DescriptionStep key={step}
                                        initial={this.state.initials.campaignDescription}
                                        descriptionValues={this.state.campaign.campaignDescription}
                                        finish={finish}
                                        activeStep={step}
                                        back={() => this.handleBack()}
                                        next={(name, step) => this.handleComplete(name, step)}
                />;
            case 1:
                return <ImageStep key={step}
                                  initial={this.state.initials.images}
                                  finish={finish}
                                  imageValues={this.state.campaign.images}
                                  activeStep={step}
                                  back={() => this.handleBack()}
                                  next={(name, step) => this.handleComplete(name, step)}
                />;
            case 2:
                return <GeneralStep key={step}
                                    initial={this.state.initials.general}
                                    generalValues={this.state.campaign.general}
                                    finish={finish}
                                    activeStep={step}
                                    back={() => this.handleBack()}
                                    next={(name, step) => this.handleComplete(name, step)}
                />;
            case 3:
                return <AudienceStep key={step}
                                     initial={this.state.initials.audience}
                                     finish={finish}
                                     audienceValues={this.state.campaign.audience}
                                     activeStep={step}
                                     back={() => this.handleBack()}
                                     next={(name, step) => this.handleComplete(name, step)}
                />;
            case 4:
                return <AdsStep key={step}
                                finish={finish}
                                activeStep={step}
                                back={() => this.handleBack()}
                                next={(name, step) => this.handleComplete(name, step)}
                />;
            default:
                //TODO Replace with loading component lateron
                return <div>Loading</div>;
        }
    }

    submitCampaign(campaign: Campaign) {
        this.setState({
            activeStep: 5,
        });

        const {submit} = this.props;
        return submit(campaign)
    }

    render() {
        const {open, toggle} = this.props;
        const {activeStep, completedSteps} = this.state;

        return (
            <Dialog
                maxWidth="md"
                open={open}
                onClose={() => toggle()}
                style={{overflow: 'visible', zIndex: theme.zIndex.dialog,}}
            >
                <div className={newCampaignClasses.newCampaign}>
                    <div className={newCampaignClasses.navigation}>
                        <NavStepper steps={getSteps()}
                                    activeStep={activeStep}
                                    completedSteps={completedSteps}
                        />
                    </div>
                    {/*<CampaignStepper submit={() => this.submitCampaign()}/>*/}
                    <div className={newCampaignClasses.content}>
                        <CampaignIllustration step={activeStep}/>
                        {this.getStepContent(activeStep, (this.completedSteps() === (totalSteps() - 1) && !completedSteps.has(activeStep)))}
                    </div>
                </div>
            </Dialog>
        )
    }
}

