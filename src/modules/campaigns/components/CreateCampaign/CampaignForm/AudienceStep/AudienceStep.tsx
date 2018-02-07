import * as React from 'react';
import {style} from 'typestyle';
import Typography from 'material-ui/Typography';
import {theme} from '../../../../../../components/App/ui-theme';
import {Component} from 'react';
import {Campaign} from '../../../../interfaces/Campaign';
import {StepperActionArea} from '../../StepperActionArea/StepperActionArea';
import {AgeGroup} from '../../../../enums/AgeGroup';
import {NumberInput} from '../../../../../layout/components/Input/NumberInput/NumberInput';
import {MenuSelect} from '../../../../../layout/components/MenuSelect/MenuSelect';
import {CampaignAudience} from '../../../../interfaces/CampaignSteps/CampaignAudience';

export const AUDIENCE_STEP = 'audience';

export interface AudienceStepProps {
    back();

    next(name: string, step?: Partial<Campaign>);

    initial: boolean;
    audienceValues: CampaignAudience;
    finish: boolean;
    activeStep: number;
}

export interface AudienceStepState {
    checkFields: boolean;
    values: {
        ageGroups?: AgeGroup[];
        clickRate: number;
        female: number;
        male: number;
        income: number;
        openingRate: number;
    }
    ageGroupsHasError: boolean;
    femaleHasError: boolean;
    maleHasError: boolean;
    incomeHasError: boolean;

}

const audienceStepClasses = {
    audienceStep: style({
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
    row: style({
        display: 'flex' as any,
        flexDirection: 'row' as any,
        justifyContent: 'space-between' as any,
        marginBottom: 20,
    }),
    halfWidth: style({
        width: '45%' as any,
    })
};

function validate(field: string, value: any) {
    switch (field) {
        case 'ageGroups': {
            return (!!value);
        }
        case 'female': {
            return (value >= 1 && value <= 100);
        }
        case 'male': {
            return (value >= 1 && value <= 100);
        }
    }
    return true;
}

function calculateReversePercent(value: number) {
    const correctedValue = (value <= 100) ? value : 100;
    return (100 - correctedValue);
}

export class AudienceStep extends Component<AudienceStepProps, AudienceStepState> {
    constructor(props) {
        super(props);

        this.state = {
            checkFields: false,
            values: {
                clickRate: 0,
                female: 50,
                income: 0,
                male: 50,
                openingRate: 0
            },
            ageGroupsHasError: false,
            femaleHasError: false,
            maleHasError: false,
            incomeHasError: false,
        }
    }

    componentWillMount() {
        const {audienceValues, initial} = this.props;

        if (!initial) {
            this.setState({
                values: {
                    ageGroups: audienceValues.ageGroups,
                    female: audienceValues.female,
                    male: audienceValues.male,
                    income: audienceValues.income,
                    openingRate: audienceValues.openingRate || 0,
                    clickRate: audienceValues.clickRate || 0,
                }
            })
        }
    }

    async handleSubmit() {
        const {next} = this.props;
        this.setState({
            checkFields: true
        });
        const stateOk = await this.checkState();

        if (stateOk) {
            return next(AUDIENCE_STEP, {audience: this.state.values});
        }

        return next(AUDIENCE_STEP);
    }

    checkState() {
        const {values} = this.state;
        const ageGroupsOk = validate('ageGroups', values.ageGroups);
        const femaleOk = validate('female', values.female);
        const maleOk = validate('male', values.male);

        this.setState({
            ageGroupsHasError: !ageGroupsOk,
            femaleHasError: !femaleOk,
            maleHasError: !maleOk,
        });

        return (ageGroupsOk && femaleOk && maleOk);
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        if (name == 'male') {
            this.setState({
                values: {
                    ...this.state.values,
                    [name]: target.value,
                    female: calculateReversePercent(target.value),
                }
            }, () => this.checkState());
        }
        if (name == 'female') {
            this.setState({
                values: {
                    ...this.state.values,
                    [name]: target.value,
                    male: calculateReversePercent(target.value),
                }
            }, () => this.checkState());
        }
        if (name !== 'female' && name !== 'male') {
            this.setState({
                values: {
                    ...this.state.values,
                    [name]: target.value,
                }
            }, () => this.checkState());
        }

    }

    render() {
        const {activeStep, finish, back} = this.props;
        const {
            values,
            checkFields,
            maleHasError,
            femaleHasError,
            ageGroupsHasError,
        } = this.state;

        return (
            <div className={audienceStepClasses.form}>
                <div style={{
                    maxHeight: 450,
                    width: '100%' as any,
                    overflow: 'hidden' as any,
                    position: 'absolute',
                    padding: theme.spacing.unit * 3,
                    top: 0,
                }}>
                    <div className={audienceStepClasses.audienceStep}>
                        <Typography className={audienceStepClasses.headlineTypography} type="title">
                            Zielgruppe
                        </Typography>
                        <div className={audienceStepClasses.row}>
                            <div className={audienceStepClasses.halfWidth}>
                                <NumberInput name={'male'}
                                             label={'Anteil männlich'}
                                             value={values.male}
                                             hasError={checkFields ? maleHasError: false}
                                             min={0}
                                             max={100}
                                             unit={'%'}
                                             onChange={(event) => this.handleInputChange(event)}/>
                            </div>
                            <div className={audienceStepClasses.halfWidth}>
                                <NumberInput name={'female'}
                                             label={'Anteil weiblich'}
                                             value={values.female}
                                             hasError={checkFields ? femaleHasError: false}
                                             min={0}
                                             max={100}
                                             unit={'%'}
                                             onChange={(event) => this.handleInputChange(event)}/>
                            </div>
                        </div>

                        <MenuSelect name={'ageGroups'}
                                    id={'select-age-group'}
                                    value={values.ageGroups ? values.ageGroups : ''}
                                    label={'Altersgruppe'}
                                    hasError={checkFields ? ageGroupsHasError: false}
                                    options={AgeGroup}
                                    onChange={(event) => this.handleInputChange(event)}/>

                        <div className={audienceStepClasses.row}>
                            <div className={audienceStepClasses.halfWidth}>
                                <NumberInput name={'openingRate'}
                                             label={'Ø Öffnungsrate (Optional)'}
                                             value={values.openingRate}
                                             hasError={false}
                                             min={0}
                                             max={100}
                                             unit={'%'}
                                             onChange={(event) => this.handleInputChange(event)}/>
                            </div>
                            <div className={audienceStepClasses.halfWidth}>
                                <NumberInput name={'clickRate'}
                                             label={'Ø Klickrate (Optional)'}
                                             value={values.clickRate}
                                             hasError={false}
                                             min={0}
                                             max={100}
                                             unit={'%'}
                                             onChange={(event) => this.handleInputChange(event)}/>
                            </div>
                        </div>
                        <NumberInput name={'income'}
                                     label={'Ø Gehalt (Optional)'}
                                     value={values.income}
                                     hasError={false}
                                     min={0}
                                     unit={'€'}
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