import * as React from 'react';
import {Base64Image} from '../../../../../interfaces/Base64Image';
import {CarouselElement} from './CarouselElement/CarouselElement';
import {BlankElement} from './BlankElement/BlankElement';
import {CampaignImages} from '../../../../../interfaces/CampaignSteps/CampaignImages';
import {style} from 'typestyle';
import Divider from 'material-ui/Divider';

export interface ImageCarouselProps {
    images: CampaignImages;

    onDelete(image: Base64Image);

    onAdd();

    onMakeHeader(image: Base64Image);
}

const imageCarouselClasses = {
    imageCarousel: style({
        display: 'flex' as any,
        justifyContent: 'flex-start' as any,
        alignItems: 'center' as any,
        overflow: 'auto' as any,
        borderRadius: '2px' as any,
    }),
    divider: style({
        height: 100,
        width: 1,
    })
};

export const ImageCarousel = ({images, onDelete, onAdd, onMakeHeader}: ImageCarouselProps) => (
    <div className={imageCarouselClasses.imageCarousel}>
        {images.header &&
        <CarouselElement image={images.header}
                         isHeader={true}
                         onDelete={() => onDelete(images.header)}
        />
        }
        {images.images && images.images.length > 0 ?
            <div className={imageCarouselClasses.imageCarousel}>
                <Divider className={imageCarouselClasses.divider}/>
                {images.images.map((image, index) => {
                return (
                <CarouselElement image={image}
                key={index}
                isHeader={false}
                makeHeader={() => onMakeHeader(image)}
                onDelete={() => onDelete(image)}/>
                )})}
            </div>
            :
            !images.header &&
            <BlankElement onAdd={() => onAdd()}/>
        }
    </div>
);