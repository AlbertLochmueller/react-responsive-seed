import * as React from 'react';
import {style} from 'typestyle';
import {CampaignImages} from '../../../interfaces/CampaignSteps/CampaignImages';
import {Component} from 'react';
import {Base64Image} from '../../../interfaces/Base64Image';
import {CampaignDetailsCarouselElement} from './CampaignDetailsCarouselElement/CampaignDetailsCarouselElement';
import Typography from 'material-ui/Typography';
import {theme} from '../../../../../components/App/ui-theme';
import {lighten} from 'material-ui/styles/colorManipulator';
import Divider from 'material-ui/Divider';

export interface CampaignDetailsImageCarouselProps {
    images: CampaignImages;
}

export interface CampaignDetailsImageCarouselState {
    activeImage: Base64Image;
    empty: boolean;
}

const campaignDetailsImageCarouselClasses = {
    campaignDetailsImageCarousel: style({
       width: 400,
       height: 370,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'space-between' as any,
        alignItems: 'center' as any,
        border: `1px solid ${lighten(theme.palette.secondary.A400, 0.5)}`,
        borderRadius: '2px' as any
    }),
    imageView: style({
        background: lighten(theme.palette.background.default, 0.5),
        width: '100%' as any,
        height: 250,
        display: 'flex' as any,
        justifyContent: 'center' as any,
        alignItems: 'center' as any,
    }),
    imageCarouselContainer: style({
        background: lighten(theme.palette.background.default, 0.5),
        width: '100%' as any,
        height: 120,
        display: 'flex' as any,
        justifyContent: 'flex-start' as any,
        alignItems: 'center' as any,
        overflow: 'auto' as any,
        borderRadius: '2px' as any,
    }),
    imageCarousel: style({
        display: 'flex' as any,
        justifyContent: 'flex-start' as any,
        alignItems: 'center' as any,
        overflow: 'auto' as any,
        borderRadius: '2px' as any,
    }),
    aligningDiv: style({
        display: 'flex' as any,
        justifyContent: 'center' as any,
        alignItems: 'center' as any,
    }),
    image: style({
        maxHeight: 200,
        maxWidth: '100%' as any,
        objectFit: 'contain' as any,
        borderRadius: '2px' as any,
    }),
    contentTypography: style({
        color: theme.palette.text.secondary,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'center' as any,
        height: 'inherit' as any,

    }),
    divider: style({
        height: 1,
        width: '100%' as any,
    })
};

export class CampaignDetailsImageCarousel extends Component<CampaignDetailsImageCarouselProps, CampaignDetailsImageCarouselState> {

    componentWillMount() {
        const {images} = this.props;
        if (images.header) {
            this.setState({
                activeImage: images.header,
                empty: false,
            })
        } else {
            this.setState({
                empty: true
            })
        }
    }

    changeSelection(image: Base64Image) {
        this.setState({
            activeImage: image,
        })
    }

    render() {
        const {images} = this.props;
        const {activeImage, empty} = this.state;

        return (
            <div className={campaignDetailsImageCarouselClasses.campaignDetailsImageCarousel}>
                <div className={campaignDetailsImageCarouselClasses.imageView}>
                    {empty ?
                        <div>
                            <div className="empty-icon">
                                <i className="icon icon-photo" style={{fontSize: 40}}></i>
                            </div>
                        </div>
                        :
                        <div className={campaignDetailsImageCarouselClasses.aligningDiv}>
                            <img className={campaignDetailsImageCarouselClasses.image}
                                 src={activeImage.base64Image}>
                            </img>
                        </div>
                    }

                </div>
                <Divider className={campaignDetailsImageCarouselClasses.divider}/>
                {empty ?
                    <div className={campaignDetailsImageCarouselClasses.imageCarouselContainer}>
                        <Typography
                            className={campaignDetailsImageCarouselClasses.contentTypography}
                            type={'caption'}
                        style={{width: '100%', textAlign: 'center'}}
                        >
                            {'Kein Bild verfügbar'}
                        </Typography>
                    </div>
                    :
                    <div className={campaignDetailsImageCarouselClasses.imageCarouselContainer}>

                        <div className={campaignDetailsImageCarouselClasses.imageCarousel}>
                            {images.header &&
                            <CampaignDetailsCarouselElement
                                image={images.header}
                                onSelect={() => this.changeSelection(images.header)}
                                isActive={images.header == activeImage}
                            />
                            }
                            {images.images && images.images.length > 0 &&
                            images.images.map((image, index) => {
                                return (
                                    <CampaignDetailsCarouselElement
                                        image={image}
                                        key={index}
                                        onSelect={() => this.changeSelection(image)}
                                        isActive={image == activeImage}
                                    />
                                )
                            })}
                        </div>

                    </div>
                }

            </div>

        )
    }
}