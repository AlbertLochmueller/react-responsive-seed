import * as React from 'react';
import {style} from 'typestyle';
import Typography from 'material-ui/Typography';
import {theme} from '../../../../../../components/App/ui-theme';
import {Component} from 'react';
import {Campaign} from '../../../../interfaces/Campaign';
import {StepperActionArea} from '../../StepperActionArea/StepperActionArea';
import {Ad} from '../../../../interfaces/Ad';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import {AdGroup} from './AdGroup/AdGroup';
import {AdType} from '../../../../enums/AdType';
import {BillingType} from '../../../../../marketplace/filter/verticals/shared/enums/BillingType';

export const ADS_STEP = 'ads';

export interface AdsStepProps {
    back();

    next(name: string, step?: Partial<Campaign>);

    finish: boolean;
    activeStep: number;
}

export interface AdsStepState {
    checkFields: boolean;
    adsHasErrors: boolean;
    values: {
        ads: Ad[],
    }
}

const adsStepClasses = {
    adsStep: style({
        width: '100%' as any,
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
        alignItems: 'flex-start' as any,
        height: 64,
    }),
    adGroup: style({
        height: 324,
        overflow: 'auto' as any,
    }),
    headlineTypography: style({
        textAlign: 'left' as any,
        color: theme.palette.text.primary,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'center' as any,
        // height: 'inherit' as any,
    }),
    actionWidth: style({
        width: '10%' as any,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'center' as any,
        alignItems: 'flex-end' as any,
    })
};

export function getDefaultAd(): Ad {
    return {adType: AdType.standalone, billingType: BillingType.tkp, price: 0};
}

export class AdsStep extends Component<AdsStepProps, AdsStepState> {
    constructor(props) {
        super(props);

        this.state = {
            checkFields: false,
            values: {ads: [getDefaultAd()]},
            adsHasErrors: false,
        }
    }

    handleSubmit() {
        const {next} = this.props;
        this.setState({
            checkFields: true
        });
        const stateOk = this.checkState();

        if (stateOk) {
            return next(ADS_STEP, {ads: this.state.values.ads});
        }

        return next(ADS_STEP);
    }

    checkState() {
        const {adsHasErrors} = this.state;
        this.forceUpdate();
        return (adsHasErrors);
    }

    handleChange(ads, adsHasErrors) {

        this.setState({
            values: {
                ads: ads
            },
            adsHasErrors: adsHasErrors
        }, () => this.checkState())
    }

    addItem() {
        let {values} = this.state;
        const newAds = values.ads.concat([getDefaultAd()]);
        this.setState({
            values: {
                ads: newAds
            },
        }, () => this.forceUpdate());

    }

    render() {
        const {activeStep, finish} = this.props;
        const {values, checkFields} = this.state;

        return (
            <div className={adsStepClasses.form}>
                <div style={{
                    maxHeight: 450,
                    width: '100%' as any,
                    overflow: 'hidden' as any,
                    position: 'absolute',
                    padding: theme.spacing.unit * 3,
                    top: 0,
                }}>
                    <div className={adsStepClasses.adsStep}>
                        <div className={adsStepClasses.row}>
                            <Typography className={adsStepClasses.headlineTypography} type="title">
                                Anzeigen hinzufügen
                            </Typography>
                            <div className={adsStepClasses.actionWidth}>
                                <Button fab mini
                                        color="primary"
                                        aria-label="add"
                                        style={{marginRight: 5}}
                                        onClick={() => this.addItem()}
                                >
                                    <AddIcon/>
                                </Button>
                            </div>
                        </div>
                        <div className={adsStepClasses.adGroup}>
                            <AdGroup
                                adsValues={values.ads}
                                checkFields={checkFields}
                                onChange={(ads, adsHasErrors) => this.handleChange(ads, adsHasErrors)}
                            />
                        </div>
                    </div>
                </div>
                <StepperActionArea activeStep={activeStep}
                                   finish={finish}
                                   back={() => ''}
                                   next={() => this.handleSubmit()}/>
            </div>

        );
    }
}