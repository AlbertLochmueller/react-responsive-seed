import * as React from 'react';
import {Component} from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import {slideIn} from '../../../utils/transitions';

export interface SlideDialogProps {
    open: boolean;
    submit(data?: any);
}

// TODO Provide Styles
// const dialogClasses = {
//
// };

export class SlideDialog extends Component<SlideDialogProps, {}>{

    constructor(props) {
        super(props);

    }


    render() {
        const {open, submit} = this.props;

        return (
                <Dialog
                    open={open}
                    transition={slideIn}
                    keepMounted
                    onRequestClose={() => submit()}
                >
                    <DialogTitle>{"Wollen Rose kaufen?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ..ha..ha..ha
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => submit()} color="primary">
                            Nein
                        </Button>
                        <Button onClick={() => submit('Er hat ja gesagt:o')} color="primary">
                            Ja
                        </Button>
                    </DialogActions>
                </Dialog>
        )
    }
}