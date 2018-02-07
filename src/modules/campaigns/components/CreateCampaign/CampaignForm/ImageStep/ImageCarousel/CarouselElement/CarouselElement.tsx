import * as React from 'react';
import * as classNames from 'classnames';
import {Base64Image} from '../../../../../../interfaces/Base64Image';
import {style} from 'typestyle';
import {theme} from '../../../../../../../../components/App/ui-theme';
import {Component} from 'react';
import Button from 'material-ui/Button';
import GradeIcon from 'material-ui-icons/Grade';
import DeleteIcon from 'material-ui-icons/Delete';

export interface CarouselElementProps {
    image: Base64Image;
    isHeader: boolean;

    onDelete();
    makeHeader?();
}

interface CarouselElementState {
    hoverActive: boolean;
}

const carouselElementClasses = {
    root: style({
        position: 'relative' as any,
        margin: theme.spacing.unit,
        display: 'flex' as any,
        justifyContent: 'center' as any,
        alignItems: 'center' as any,
    }),
    image: style({
        maxHeight: 100,
        maxWidth: 120,
        zIndex: 1,
        objectFit: 'contain' as any,
        borderRadius: '4px' as any,
    }),
    overlay: style({
        background: `rgba(1,1,1, 0.4)` as any,
        height: '100%' as any,
        width: '100%' as any,
        zIndex: 2,
        position: 'absolute' as any,
        display: 'flex' as any,
        borderRadius: '4px' as any,
        justifyContent: 'space-around' as any,
        alignItems: 'center' as any,
    }),
    header: style({
        boxShadow: `0 0 3pt 2pt ${theme.palette.primary.A400}` as any,
        borderRadius: '4px' as any,
    }),
    aligningDiv: style({
        display: 'flex' as any,
        justifyContent: 'center' as any,
        alignItems: 'center' as any,
    })
};

export class CarouselElement extends Component<CarouselElementProps, CarouselElementState> {
    constructor(props) {
        super(props);

        this.state = {
            hoverActive: false
        }
    }

    toggle(active: boolean) {
        this.setState({
            hoverActive: !active
        })
    }


    render() {
        const {image, isHeader, onDelete, makeHeader} = this.props;
        const {hoverActive} = this.state;

        return (
            <div className={carouselElementClasses.root}
                 onMouseEnter={() => this.toggle(false)}
                 onMouseLeave={() => this.toggle(true)}
            >

                <div className={carouselElementClasses.aligningDiv}>
                    {hoverActive && <div className={carouselElementClasses.overlay}>
                        {!isHeader &&
                        <Button fab mini
                                color="primary"
                                aria-label="header"
                                onClick={() => makeHeader()}
                        >
                            <GradeIcon/>
                        </Button>
                        }

                        <Button fab mini
                                color="contrast"
                                aria-label="delete"
                                onClick={() => onDelete()}
                        >
                            <DeleteIcon/>
                        </Button>
                    </div>}
                    <img className={classNames(isHeader && carouselElementClasses.header, carouselElementClasses.image)}
                         src={image.base64Image}>
                    </img>
                </div>
            </div>

        )

    }
}