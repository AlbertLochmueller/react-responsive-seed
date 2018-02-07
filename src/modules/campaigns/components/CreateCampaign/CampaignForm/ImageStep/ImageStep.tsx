import * as React from 'react';
import * as classNames from 'classnames';
import {style} from 'typestyle';
import Typography from 'material-ui/Typography';
import {theme} from '../../../../../../components/App/ui-theme';
import {Component} from 'react';
import {Campaign} from '../../../../interfaces/Campaign';
import {StepperActionArea} from '../../StepperActionArea/StepperActionArea';
import {Base64Image} from '../../../../interfaces/Base64Image';
import * as borderImage from '../../../../assets/borderImage.png';
import {darken, lighten} from 'material-ui/styles/colorManipulator';
import {ImageCarousel} from './ImageCarousel/ImageCarousel';
import {CampaignImages} from '../../../../interfaces/CampaignSteps/CampaignImages';
import {FileUploadButton} from './FileUploadButton/FileUploadButton';

export const IMAGE_STEP = 'images';

export interface ImageStepProps {
    back();

    next(name: string, step?: Partial<Campaign>);

    initial: boolean;
    imageValues: CampaignImages;
    finish: boolean;
    activeStep: number;
}

export interface ImageStepState {
    images: CampaignImages;
    currentIndex: number;
}

const imageStepClasses = {
    imageStep: style({
        width: '100%' as any,
    }),
    content: style({
        height: 315,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'space-between' as any,
    }),
    headlineTypography: style({
        textAlign: 'left' as any,
        color: theme.palette.text.primary,
        marginBottom: 24,
        height: 40,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'center' as any,
    }),
    typography: style({
        color: theme.palette.secondary.A400,
    }),
    unit: style({
        margin: theme.spacing.unit
    }),
    clickable: style({
        cursor: 'pointer' as any,
        transition: 'color 0.25s linear',
        fontWeight: 'bold' as any,
        $nest: {
            '&:hover': {
                color: darken(theme.palette.secondary.A400, 0.5)
            }
        }
    }),
    imageUpload: style({
        height: 200,
        marginBottom: 24,
        border: `2px dashed ${theme.palette.primary.A400}` as any,
        borderImageSource: borderImage,
        background: lighten(theme.palette.primary.A400, 0.95),
        borderRadius: '3px' as any,
        display: 'flex' as any,
        flexDirection: 'column' as any,
        justifyContent: 'center' as any,
        alignItems: 'center' as any,
    }),
    imageCarousel: style({
        height: 120,
        display: 'flex' as any,
        justifyContent: 'space-between' as any,
        alignItems: 'center' as any,
    }),
    form: style({
        position: 'relative',
        width: 600,
        height: 'inherit' as any,
    }),
};

export class ImageStep extends Component<ImageStepProps, ImageStepState> {
    constructor(props) {
        super(props);

        this.state = {
            images: {
                images: []
            },
            currentIndex: 0,
        }
    }

    componentWillMount() {
        const {imageValues} = this.props;

        this.setState({
            images: imageValues,
        })
    }

    handleSubmit() {
        const {next} = this.props;

        if (this.checkState()) {
            return next(IMAGE_STEP, {images: this.state.images});
        }

        return next(IMAGE_STEP,);
    }

    checkState() {
        // const {images} = this.state;
        return true;
    }

    uploadItem(files?: any) {
        let {currentIndex} = this.state;
        const currentImages = this.state.images;

        if (files) {

            if (currentImages.images && currentImages.images.length > 0) {
                Object.keys(files).map((key) => {
                    const reader = new FileReader();
                    reader.onloadend = () => this
                        .setState({
                            images: {
                                header: this.state.images.header,
                                images: this.state.images.images ?
                                    this.state.images.images.concat(
                                        [{index: currentIndex, base64Image: reader.result}])
                                    :
                                    [{index: currentIndex, base64Image: reader.result}]
                                ,
                            },
                            currentIndex: currentIndex++
                        });
                    reader.readAsDataURL(files[key]);
                });
            } else {
                if (currentImages.header) {
                    Object.keys(files).map((key) => {
                        const reader = new FileReader();
                        reader.onloadend = () => this
                            .setState({
                                images: {
                                    header: this.state.images.header,
                                    images: this.state.images.images ?
                                        this.state.images.images.concat(
                                            [{index: currentIndex, base64Image: reader.result}])
                                        :
                                        [{index: currentIndex, base64Image: reader.result}]
                                    ,
                                },
                                currentIndex: currentIndex++
                            });
                        reader.readAsDataURL(files[key]);
                    })
                } else {
                    Object.keys(files).map((key, index) => {
                        const reader = new FileReader();

                        if (index == 0) {
                            reader.onloadend = () => this
                                .setState({
                                    images: {
                                        header: {index: currentIndex, base64Image: reader.result}
                                    },
                                    currentIndex: currentIndex++
                                });
                            reader.readAsDataURL(files[key]);
                        } else {
                            reader.onloadend = () => this
                                .setState({
                                    images: {
                                        header: this.state.images.header,
                                        images: this.state.images.images ?
                                            this.state.images.images.concat(
                                                [{index: currentIndex, base64Image: reader.result}])
                                            :
                                            [{index: currentIndex, base64Image: reader.result}]
                                        ,
                                    },
                                    currentIndex: currentIndex++
                                });
                            reader.readAsDataURL(files[key]);
                        }
                    });
                }
            }
        }
    }

    addItem() {

    }

    switchIntoHeader(image: Base64Image) {
        const {images} = this.state;
        const currentHeader = images.header;
        const newImages = images.images
            .map((subImage) => {
                if (subImage == image) {
                    return currentHeader
                }
                return subImage
            });

        if (images.images && images.images.length > 0) {
            this.setState({
                images: {
                    header: image,
                    images: newImages,
                }
            })
        }

    }

    removeItem(image: Base64Image) {
        const {images} = this.state;

        if (images.header == image) {
            this.setState({
                images: {
                    header: images.images.length > 0 ? images.images[0] : undefined,
                    images: images.images.length > 0 ?
                        images.images.filter((subImage, index) => index !== 0)
                        : undefined
                }
            })
        } else {
            this.setState({
                images: {
                    header: this.state.images.header,
                    images: images.images.filter((subImage) => subImage !== image)
                }
            })
        }

    }

    render() {
        const {activeStep, finish, back} = this.props;
        const {images} = this.state;

        return (
            <div className={imageStepClasses.form}>
                <div style={{
                    maxHeight: 450,
                    width: '100%' as any,
                    overflow: 'hidden' as any,
                    position: 'absolute',
                    padding: theme.spacing.unit * 3,
                    top: 0,
                }}>
                    <div className={imageStepClasses.imageStep}>
                        <Typography className={imageStepClasses.headlineTypography} type="title">
                            Bilder hochladen
                        </Typography>
                        <div className={imageStepClasses.content}>
                            <div className={imageStepClasses.imageUpload}>
                                <Typography className={classNames(imageStepClasses.typography, imageStepClasses.unit)}
                                            type="caption" noWrap={true}>
                                    {'Bilder per Drag \& Drop einfügen oder'}
                                </Typography>
                                <div className={imageStepClasses.unit}>
                                    <FileUploadButton onFilesChanged={files => this.uploadItem(files)}/>
                                </div>
                            </div>
                            <div className={imageStepClasses.imageCarousel}>
                                <ImageCarousel images={images}
                                               onAdd={() => this.addItem()}
                                               onDelete={(image) => this.removeItem(image)}
                                               onMakeHeader={(image) => this.switchIntoHeader(image)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <StepperActionArea activeStep={activeStep}
                                   finish={finish}
                                   back={() => back()}
                                   next={() => this.handleSubmit()}/>
            </div>

        );
    }
}