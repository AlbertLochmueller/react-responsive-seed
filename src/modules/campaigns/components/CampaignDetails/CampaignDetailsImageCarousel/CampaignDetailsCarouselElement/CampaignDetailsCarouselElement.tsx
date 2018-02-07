import * as React from 'react';
import * as classNames from 'classnames';
import {style} from 'typestyle';
import {Component} from 'react';
import Button from 'material-ui/Button';
import SearchIcon from 'material-ui-icons/Search';
import {Base64Image} from '../../../../interfaces/Base64Image';
import {theme} from '../../../../../../components/App/ui-theme';

export interface CampaignDetailsCarouselElementProps {
    image: Base64Image;
    isActive: boolean;

    onSelect();
}

interface CampaignDetailsCarouselElementState {
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
        borderRadius: '2px' as any,
    }),
    overlay: style({
        background: `rgba(1,1,1, 0.4)` as any,
        height: '100%' as any,
        width: '100%' as any,
        zIndex: 2,
        position: 'absolute' as any,
        display: 'flex' as any,
        borderRadius: '2px' as any,
        justifyContent: 'space-around' as any,
        alignItems: 'center' as any,
    }),
    header: style({
        boxShadow: `0 0 2pt 1pt ${theme.palette.primary.A400}` as any,
        borderRadius: '1px' as any,
    }),
    aligningDiv: style({
        display: 'flex' as any,
        justifyContent: 'center' as any,
        alignItems: 'center' as any,
    })
};

export class CampaignDetailsCarouselElement extends Component<CampaignDetailsCarouselElementProps, CampaignDetailsCarouselElementState> {
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
        const {image, isActive, onSelect} = this.props;
        const {hoverActive} = this.state;

        return (
            <div className={carouselElementClasses.root}
                 onMouseEnter={() => this.toggle(false)}
                 onMouseLeave={() => this.toggle(true)}
            >

                <div className={carouselElementClasses.aligningDiv}>
                    {hoverActive && <div className={carouselElementClasses.overlay}>
                        {!isActive &&
                        <Button fab mini
                                color="contrast"
                                aria-label="delete"
                                onClick={() => onSelect()}>
                            <SearchIcon/>
                        </Button>
                        }
                    </div>}
                    <img className={classNames(isActive && carouselElementClasses.header, carouselElementClasses.image)}
                         src={image.base64Image}>
                    </img>
                </div>
            </div>

        )

    }
}