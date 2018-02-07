import * as React from 'react';
import * as classNames from 'classnames';
import {Component} from 'react';
import Card, {CardContent, CardActions} from 'material-ui/Card';
import {style} from 'typestyle';
import {theme} from '../../../components/App/ui-theme';

const mainClasses = {
    root: style({
       textAlign: 'center' as 'center',
    }),
    card: style({
        margin: theme.spacing.unit,
        width: 400,
        height: 300,
        textAlign: 'center' as 'center',
        display: 'inline-block' as any,
    }),
};

export interface DashboardProps {

}

interface DashboardState {

}

export class Dashboard extends Component<DashboardProps, DashboardState> {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentWillMount() {
    }


    render() {

        return (
            <div>
                <div className={mainClasses.root}>
                    <Card className={mainClasses.card}>
                        <CardContent>
                            Was
                        </CardContent>
                    </Card>
                    <Card className={mainClasses.card}>
                        <CardContent>
                            Für
                        </CardContent>
                    </Card>
                    <Card className={mainClasses.card}>
                        <CardContent>
                            1 [Dashboard]
                        </CardContent>
                    </Card>
                    <Card className={mainClasses.card}>
                        <CardContent>
                            Responsives
                        </CardContent>
                    </Card>
                    <Card className={mainClasses.card}>
                        <CardContent>
                            Layout
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}

