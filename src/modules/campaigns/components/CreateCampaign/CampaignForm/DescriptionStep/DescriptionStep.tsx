import * as React from 'react';
import {style} from 'typestyle';
import Typography from 'material-ui/Typography';
import {theme} from '../../../../../../components/App/ui-theme';
import {TextInput} from '../../../../../layout/components/Input/TextInput/TextInput';
import {Component} from 'react';
import {Campaign} from '../../../../interfaces/Campaign';
import {StepperActionArea} from '../../StepperActionArea/StepperActionArea';
import {CampaignDescription} from '../../../../interfaces/CampaignSteps/CampaignDescription';

export const DESCRIPTION_STEP = 'campaignDescription';

export interface DescriptionStepProps {
    back();

    next(name: string, step?: Partial<Campaign>);

    descriptionValues: CampaignDescription;
    initial: boolean;
    finish: boolean;
    activeStep: number,
}

export interface DescriptionStepState {
    values: {
        title: string;
        description: string;
    };
    titleHasError: boolean;
    descriptionHasError: boolean;
    checkFields: boolean;
}

const descriptionStepClasses = {
    descriptionStep: style({
        width: '100%' as any,
    }),
    headlineTypography: style({
        textAlign: 'left' as any,
        color: theme.palette.text.primary,
        marginBottom: 24,
        height: 40,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'center' as any,
    }),
    form: style({
        position: 'relative',
        width: 600,
        height: 'inherit' as any,
    }),
};

function validate(field: string, value: string) {
    switch (field) {
        case 'title': {
            return (value.length >= 1 && value.length <= 60);
        }
        case 'description': {
            return (value.length >= 1 && value.length <= 1500);
        }
    }
}

export class DescriptionStep extends Component<DescriptionStepProps, DescriptionStepState> {
    constructor(props) {
        super(props);

        this.state = {
            values: {
                title: '',
                description: '',
            },
            titleHasError: false,
            descriptionHasError: false,
            checkFields: false,
        }
    }

    componentWillMount() {
        const {descriptionValues} = this.props;

        this.setState({
            values: {
            title: descriptionValues.title,
            description: descriptionValues.description
            }
        })
    }

    async handleSubmit() {
        const {next} = this.props;
        this.setState({
           checkFields: true
        });
        const stateOk = await this.checkState();

        if (stateOk) {
            return next(DESCRIPTION_STEP, {campaignDescription: this.state.values});
        }

        return next(DESCRIPTION_STEP);
    }

    checkState() {
        const {values} = this.state;
        const titleOk = validate('title', values.title);
        const descriptionOk = validate('description', values.description);

        this.setState({
            titleHasError: !titleOk,
            descriptionHasError: !descriptionOk,
        });

        return (titleOk && descriptionOk);
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            values: {
                ...this.state.values,
                [name]: target.value
            }
        }, () => this.checkState());

    }


    render() {
        const {activeStep, finish, back} = this.props;
        const {values, titleHasError, descriptionHasError, checkFields} = this.state;

        return (
            <div className={descriptionStepClasses.form}>
                <div style={{
                    maxHeight: 450,
                    width: '100%' as any,
                    overflow: 'hidden' as any,
                    position: 'absolute',
                    padding: theme.spacing.unit * 3,
                    top: 0,
                }}>
                    <div className={descriptionStepClasses.descriptionStep}>
                        <Typography className={descriptionStepClasses.headlineTypography}
                                    type="title">
                            Kampagne beschreiben
                        </Typography>
                        <div style={{marginBottom: 20}}>
                            <TextInput hasError={checkFields? titleHasError : false}
                                       name={'title'}
                                       defaultValue={values.title}
                                       placeholder={'Name'}
                                       label={'Titel der Kampagne'}
                                       onChange={(event) => this.handleInputChange(event)}/>
                        </div>
                        <TextInput hasError={checkFields ? descriptionHasError: false}
                                   name={'description'}
                                   defaultValue={values.description}
                                   placeholder={'Diese Kampagne bietet...'}
                                   label={'Beschreibender Text'}
                                   rows={8}
                                   onChange={(event) => this.handleInputChange(event)}/>
                    </div>
                </div>
                <StepperActionArea activeStep={activeStep}
                                   finish={finish}
                                   back={() => back()}
                                   next={() => this.handleSubmit()}/>
            </div>

        );
    }
}