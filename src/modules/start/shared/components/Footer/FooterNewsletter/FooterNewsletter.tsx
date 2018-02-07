import * as React from 'react';
import Typography from 'material-ui/Typography';
import {style} from 'typestyle';
import IconButton from 'material-ui/IconButton';
import SendIcon from 'material-ui-icons/Send';
import {Component} from 'react';
import Input from 'material-ui/TextField';
import {theme} from '../../../../../../components/App/ui-theme';

export interface FooterNewsletterProps {
    submit(email: string);
}

export interface FooterNewsletterState {
    email: string;
    hasError: boolean;
}

const footerNewsletterClasses = {
    form: style({
        borderRadius: 5,
        border: `1px solid ${theme.palette.primary.A400}`,
        padding: '0px 0px 0px 10px',
        textAlign: 'center' as any,
    }),
    typography: style({
        textAlign: 'left' as any,
        color: theme.palette.text.primary,
        marginBottom: 15,
    }),
    button: style({
        cursor: 'pointer',
        $nest: {
            '&:hover': {
                color: theme.palette.primary.A400
            }
        }
    }),
};

export class FooterNewsletter extends Component<FooterNewsletterProps, FooterNewsletterState> {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            hasError: false,
        }

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.validate(name));
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.validate()) {
            this.props.submit(this.state.email);
        }
    }

    validate(value?: string) {
        const isValid = this.state.hasError;
        if (!value || !(value.indexOf('@') >= 0)) this.setState({hasError: !isValid});

        return isValid;
    }

    render() {
        return (
            <div>
                <Typography className={footerNewsletterClasses.typography}>
                    {'Für den Newsletter anmelden:'}
                </Typography>
                <div className={footerNewsletterClasses.form}>
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <div className="input-group">
                            <Input type="text" name="email" style={{margin: 'auto'}} className="form-input" placeholder="name@email.de"
                                   onChange={e => this.handleInputChange(e)}/>
                            <IconButton className="input-group-btn" type="submit">
                                <SendIcon className={footerNewsletterClasses.button}/>
                            </IconButton>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}