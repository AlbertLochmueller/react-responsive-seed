import * as React from 'react';
import {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import {style} from 'typestyle';
import {theme} from '../../../../../components/App/ui-theme';
import Typography from 'material-ui/Typography';
import {Link} from 'react-router-dom';
import Button from 'material-ui/Button';
import {CAMPAIGNS_PATH} from '../../../../../components/Main/Main';
import * as borderImage from '../../../assets/borderImage.png';
import * as loading from '../../../assets/loading.gif';

const successClasses = {
    content: style({
        width: 750,
        height: 570,
        padding: 24,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'space-around' as any,
        alignItems: 'center' as any,
    }),
    headlineTypography: style({
        textAlign: 'center' as any,
        color: theme.palette.text.primary,
        height: 30,
    }),
    illustration: style({
        width: 600,
        height: 400,
        border: '2px dashed #CFD4DB' as any,
        borderImageSource: `${borderImage}` as any,
        borderRadius: '3px' as any,
    }),
    actionElement: style({
        textAlign: 'center' as any,
        cursor: 'pointer' as any,
        textDecoration: 'none' as any,
    }),
    button: style({
        textTransform: 'none' as any,
        // display: 'inline-block' as any,
        background: 'linear-gradient(45deg, #1f877d 30%, #26A69A 90%)',
        $nest: {
            '&:hover': {
                background: 'linear-gradient(45deg, #1c7c73 30%, #239b90 90%)',
            }
        }
    }),
};

export interface SuccessProps {
    open: boolean;
    successful: boolean;

    toggle();
}


export class Success extends Component<SuccessProps, {}> {

    constructor(props) {
        super(props);
    }

    render() {
        const {successful, open, toggle} = this.props;

        return (
            <Dialog
                maxWidth="md"
                open={open}
                onClose={() => toggle()}
                style={{overflow: 'visible', zIndex: theme.zIndex.dialog,}}
            >
                {successful ?
                    <div className={successClasses.content}>
                        <Typography className={successClasses.headlineTypography}
                                    type="title">
                            Deine Kampagne ist jetzt online!
                        </Typography>
                        <div className={successClasses.illustration}>

                        </div>
                        <div className={successClasses.actionElement}>
                            <Link style={{textDecoration: 'none', color: 'inherit'}} to={CAMPAIGNS_PATH}>
                                <Button className={successClasses.button}
                                        raised color="primary"
                                        type="submit"
                                        onClick={() => toggle()}
                                >
                                    <Typography type="caption" color="inherit" noWrap={true}>
                                        Zur Übersicht
                                    </Typography>
                                </Button>
                            </Link>
                        </div>
                    </div>
                    :
                    <div className={successClasses.content}>
                        <div style={{height: 100, width: 100}}>
                            <img src={loading}/>
                        </div>
                    </div>
                }

            </Dialog>
        )
    }
}

