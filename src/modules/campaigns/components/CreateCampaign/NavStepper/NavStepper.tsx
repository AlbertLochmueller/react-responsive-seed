import * as React from 'react';
import * as classNames from 'classnames';
import {style} from 'typestyle';
import {theme} from '../../../../../components/App/ui-theme';
import Stepper, {Step, StepButton} from 'material-ui/Stepper';
import Typography from 'material-ui/Typography';

export interface NavStepperProps {
    activeStep: number;
    steps: string[];
    completedSteps: any;
}

const navStepperClasses = {
    stepper: style({
        width: '100%',
        padding: 10,
    }),
    labelOverride: style({
        $nest: {
            'p': {
                margin: 5,
            }
        }
    }),
    stepLabel: style({
        whiteSpace: 'noWrap' as any,
        color: theme.palette.secondary.A400
    }),
    completeStepLabel: style({
        transition: 'color 0.25s linear',
        color: theme.palette.primary.A400
    }),
    invalidStepLabel: style({
        transition: 'color 0.25s linear',
        color: 'yellow' as any,
    }),
    activeStepLabel: style({
        fontWeight: 'bold' as any,
        color: theme.palette.secondary.A400
    }),
    stepperContent: style({
        paddingRight: 0,
    }),

};

export const NavStepper = ({steps, completedSteps, activeStep}: NavStepperProps) => (
    <Stepper alternativeLabel nonLinear activeStep={activeStep} className={navStepperClasses.stepper}>
        {steps.map((label, index) => {
            return (
                <Step key={label}>
                    <StepButton
                        completed={completedSteps.has(index)}
                        style={{cursor: 'unset'}}
                        className={navStepperClasses.labelOverride}
                        orientation={"horizontal"}
                    >
                        <Typography
                            className={classNames(
                                navStepperClasses.stepLabel,
                                (completedSteps.has(index)) && navStepperClasses.completeStepLabel,
                                (index === activeStep) && navStepperClasses.activeStepLabel)}
                            type="caption">
                            {label}
                        </Typography>
                    </StepButton>
                </Step>
            )
        })}
    </Stepper>
);

