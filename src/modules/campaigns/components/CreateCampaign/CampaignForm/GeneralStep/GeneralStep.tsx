import * as React from 'react';
import {style} from 'typestyle';
import Typography from 'material-ui/Typography';
import {theme} from '../../../../../../components/App/ui-theme';
import {Component} from 'react';
import {Campaign} from '../../../../interfaces/Campaign';
import {StepperActionArea} from '../../StepperActionArea/StepperActionArea';
import {DistributionType} from '../../../../enums/DistributionType';
import {Sector} from '../../../../enums/Sector';
import {Vertical} from '../../../../enums/Vertical';
import {MenuSelect} from '../../../../../layout/components/MenuSelect/MenuSelect';
import {NumberInput} from '../../../../../layout/components/Input/NumberInput/NumberInput';
import {CampaignGeneral} from '../../../../interfaces/CampaignSteps/CampaignGeneral';
import {CampaignGeneralDescription} from '../../../../enums/CampaignGeneralDescription';

export const GENERAL_STEP = 'general';

export interface GeneralStepProps {
    back();

    next(name: string, step?: Partial<Campaign>);
    initial: boolean;
    generalValues: CampaignGeneral;
    finish: boolean;
    activeStep: number,
}

export interface GeneralStepState {
    checkFields: boolean;
    values: {
        distributionType?: DistributionType;
        minVolume: number;
        range: number;
        sector?: Sector;
    }
    distributionTypeHasError: boolean;
    minVolumeHasError: boolean;
    rangeHasError: boolean;
    sectorHasError: boolean;
}

const generalStepClasses = {
    generalStep: style({
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
    }),
    halfWidth: style({
        width: '45%' as any,
    })
};

function validate(field: string, value: any) {
    switch (field) {
        case 'distributionType': {
            return (!!value);
        }
        case 'sector': {
            return (!!value);
        }
        case 'range': {
            return (value >= 1);
        }
        case 'minVolume': {
            return (value >= 1);
        }
    }
    return true;
}

export class GeneralStep extends Component<GeneralStepProps, GeneralStepState> {
    constructor(props) {
        super(props);

        this.state = {
            checkFields: false,
            values: {
                minVolume: 0,
                range: 0,
            },
            distributionTypeHasError: false,
            minVolumeHasError: false,
            rangeHasError: false,
            sectorHasError: false,
        }
    }

    componentWillMount() {
        const {generalValues, initial} = this.props;

        if (!initial) {
            this.setState({
                values: {
                    distributionType: generalValues.distributionType,
                    minVolume: generalValues.minVolume,
                    range: generalValues.range,
                    sector: generalValues.sector,
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
            return next(GENERAL_STEP, {general: this.state.values});
        }

        return next(GENERAL_STEP);
    }


    checkState() {
        const {values} = this.state;
        const distributionTypeOk = validate('distributionType', values.distributionType);
        const sectorOk = validate('sector', values.sector);
        const minVolumeOk = validate('minVolume', values.minVolume);
        const rangeOk = validate('range', values.range);

        this.setState({
            distributionTypeHasError: !distributionTypeOk,
            minVolumeHasError: !minVolumeOk,
            rangeHasError: !rangeOk,
            sectorHasError: !sectorOk,
        });

        return (distributionTypeOk && sectorOk && minVolumeOk && rangeOk);
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
        const {
            checkFields,
            values,
            distributionTypeHasError,
            minVolumeHasError,
            rangeHasError,
            sectorHasError
        } = this.state;

        return (
            <div className={generalStepClasses.form}>
                <div style={{
                    maxHeight: 450,
                    width: '100%' as any,
                    overflow: 'hidden' as any,
                    position: 'absolute',
                    padding: theme.spacing.unit * 3,
                    top: 0,
                }}>
                    <div className={generalStepClasses.generalStep}>
                        <Typography className={generalStepClasses.headlineTypography} type="title">
                            Angaben zur Kampagne
                        </Typography>
                        <MenuSelect name={'vertical'}
                                    id={'select-vertical'}
                                    value={Vertical.newsletter}
                                    label={'Kampagnen Typ'}
                                    hasError={false}
                                    options={Vertical}
                                    onChange={(event) => this.handleInputChange(event)}
                                    disabled={true}/>
                        <div className={generalStepClasses.row}>
                            <div className={generalStepClasses.halfWidth}>
                                <MenuSelect name={'sector'}
                                            id={'select-sector'}
                                            value={values.sector ? values.sector : ''}
                                            label={CampaignGeneralDescription.sector}
                                            hasError={checkFields? sectorHasError : false}
                                            options={Sector}
                                            onChange={(event) => this.handleInputChange(event)}/>
                            </div>
                            <div className={generalStepClasses.halfWidth}>
                                <MenuSelect name={'distributionType'}
                                            id={'select-distribution'}
                                            value={values.distributionType ? values.distributionType : ''}
                                            label={CampaignGeneralDescription.distributionType}
                                            hasError={checkFields ? distributionTypeHasError : false}
                                            options={DistributionType}
                                            onChange={(event) => this.handleInputChange(event)}/>
                            </div>
                        </div>

                        <div className={generalStepClasses.row}>
                            <div className={generalStepClasses.halfWidth}>
                                <NumberInput name={'range'}
                                             value={values.range}
                                             label={CampaignGeneralDescription.range}
                                             hasError={checkFields ? rangeHasError : false}
                                             min={0}
                                             onChange={(event) => this.handleInputChange(event)}/>
                            </div>
                            <div className={generalStepClasses.halfWidth}>
                                <NumberInput name={'minVolume'}
                                             value={values.minVolume}
                                             label={CampaignGeneralDescription.minVolume}
                                             hasError={checkFields ? minVolumeHasError: false}
                                             min={0}
                                             onChange={(event) => this.handleInputChange(event)}/>
                            </div>
                        </div>

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