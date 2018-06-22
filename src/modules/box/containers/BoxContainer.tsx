import * as React from 'react';
import {Component} from "react";
import {Switcheridoo} from "../components/Switcheridoo/Switcheridoo";
import {style} from "typestyle";
import {BlankElement} from "../components/BlankElement/BlankElement";


interface BoxContainerState {
    color: any,
    position: { x: number, y: number };
}

const boxContainerClasses = {
    root: style({
       width: '100%',
       height: '100%',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
    }),
    row: style({
        display: 'flex',
    })
};

const red = style({
    background: 'red'
});

const dimensions = 10;

export class BoxContainer extends Component<{}, BoxContainerState> {
    field = Array.from({length: dimensions}, () => '');

    constructor(props) {
        super(props);

        this.state = {
            color: red,
            position: {x: Math.floor(dimensions / 2), y: Math.floor(dimensions / 2)}
        };

    }

    updateColor() {
        // const {color} = this.state;

        // this.setState({
        //     color: switchColor(color)
        // });

        // this.switch();

    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    randomPosition() {
        const {position: {x, y}} = this.state;
        const newX = this.getRandomInt(dimensions);
        const newY = this.getRandomInt(dimensions);

        if (newX == x && newY == y && dimensions > 1) {
            this.randomPosition();
        } else {
            this.setState({
                position: {
                    x: newX,
                    y: newY
                }
            })
        }

    }

    render() {
        const {color, position} = this.state;
        const {field} = this;

        return (
            <div className={boxContainerClasses.root}>
                <div>
                    {
                        field.map((a, horizontalIndex) => (
                            <div className={boxContainerClasses.row} key={horizontalIndex}>
                                {
                                    field.map((a, verticalIndex) => (

                                        (horizontalIndex == position.x && verticalIndex == position.y) ?

                                            <div onClick={() => this.randomPosition()}
                                                 key={verticalIndex}>
                                                <Switcheridoo color={red}/>
                                            </div>
                                            :
                                            <BlankElement key={verticalIndex}/>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>

            </div>
        )
    }

}