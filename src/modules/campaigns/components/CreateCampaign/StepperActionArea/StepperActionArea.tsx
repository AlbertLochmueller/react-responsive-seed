import * as React from 'react';
import * as classNames from 'classnames';
import Button from 'material-ui/Button';
import {style} from 'typestyle';
import {theme} from '../../../../../components/App/ui-theme';
import {getSteps} from '../NewCampaign/NewCampaign';

export interface StepperActionAreaProps {
    activeStep: number;
    finish: boolean;
    back();
    next();
}

const stepperActionAreaClasses = {
    button: style({
        textTransform: 'none' as any,
        // marginRight: theme.spacing.unit,
    }),
    proceedButton: style({
        background: 'linear-gradient(45deg, #1f877d 30%, #26A69A 90%)',
        $nest: {
            '&:hover': {
                background: 'linear-gradient(45deg, #1c7c73 30%, #239b90 90%)',
            }
        }
    }),
    actionsContainer: style({
        position: 'absolute' as any,
        bottom: 0,
        // height: 80,
        width: 'inherit' as any,
        padding: theme.spacing.unit*3,
        textAlign: 'right' as any,
    }),
};

export const StepperActionArea = ({activeStep, next, back, finish}: StepperActionAreaProps) => (
    <div className={stepperActionAreaClasses.actionsContainer}>
            <Button
                disabled={activeStep === 0}
                onClick={() => back()}
                className={stepperActionAreaClasses.button}
                color={'inherit'}
            >
                Zurück
            </Button>
            <Button
                raised
                color="primary"
                onClick={() => next()}
                className={classNames(stepperActionAreaClasses.button, stepperActionAreaClasses.proceedButton)}
            >
                {finish ? 'Inserieren' : 'Weiter'}
            </Button>
    </div>
);
