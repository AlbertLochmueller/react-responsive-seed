import * as React from 'react';
import Card, {CardContent, CardMedia} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import {style} from 'typestyle';
import {Link} from 'react-router-dom';
import {theme} from '../../../../../../components/App/ui-theme';

export interface BaseCallToActionCardProps {
    image: string;
    imageTitle: string;
    children: any;
    submitText: string;
    target: string;
    additionalInfo?: {
        text: string;
        target: string;
    };
}

const baseCallToActionCardClasses = {
    card: style({
        margin: theme.spacing.unit,
        width: 600,
        height: 650,
        position: 'relative' as any,
        display: 'inline-block' as any,
        boxShadow: 'none' as any,
    }),
    actionGroup: style({
        position: 'absolute' as any,
        bottom: 0,
        marginBottom: 25,
        display: 'flex' as any,
        alignItems: 'center' as any,
        justifyContent: 'left' as any,
    }),
    actionGroupItem: style({
        display: 'block' as any,
        paddingRight: 20,
    }),
    media: style({
        margin: 20,
        height: 400,
        backgroundSize: 'contain' as any,
    }),
    cardContent: style({
        padding: '0 45px 35px 45px' as any,
    }),
    content: style({
        color: theme.palette.secondary.A400,
        textAlign: 'justify' as any,
    }),
    actionElement: style({
        textAlign: 'center' as any,
        cursor: 'pointer' as any,
        textDecoration: 'none' as any,
    }),
    button: style({
        textTransform: 'none' as any,
        display: 'inline-block' as any,
        background: 'linear-gradient(45deg, #1f877d 30%, #26A69A 90%)',
        $nest: {
            '&:hover': {
                background: 'linear-gradient(45deg, #1c7c73 30%, #239b90 90%)',
            }
        }
    }),
    typography: style({
        color: theme.palette.secondary.A400,
        transition: 'color 0.25s linear',
        $nest: {
            '&:hover': {
                color: theme.palette.primary.A400
            }
        }
    }),
};

export const BaseCallToActionCard = ({image, imageTitle, children, submitText, target, additionalInfo}: BaseCallToActionCardProps) => (
    <Card className={baseCallToActionCardClasses.card}>
        <CardMedia
            className={baseCallToActionCardClasses.media}
            image={image}
            title={imageTitle}
        />
        <CardContent className={baseCallToActionCardClasses.cardContent}>
            <Typography className={baseCallToActionCardClasses.content} component="p">
                {...children}
            </Typography>
            {additionalInfo ? (
                <div className={baseCallToActionCardClasses.actionGroup}>
                    <Typography className={baseCallToActionCardClasses.actionGroupItem} type="title" color="inherit">
                        <div className={baseCallToActionCardClasses.actionElement}>
                            <Link style={{textDecoration: 'none', color: 'inherit'}} to={target}>
                                <Button className={baseCallToActionCardClasses.button} raised color="primary"
                                        type="submit">{submitText}
                                </Button>
                            </Link>
                        </div>
                    </Typography>
                    <Typography className={baseCallToActionCardClasses.actionGroupItem} type="title">
                        <div className={baseCallToActionCardClasses.actionElement}>
                            <Link style={{textDecoration: 'none', color: 'inherit'}} to={additionalInfo.target}>
                                <Typography className={baseCallToActionCardClasses.typography} type="subheading"
                                            noWrap={true}>
                                    {additionalInfo.text}
                                </Typography>
                            </Link>
                        </div>
                    </Typography>
                </div>

            ) : (
                <div className={baseCallToActionCardClasses.actionGroup}>
                    <Typography className={baseCallToActionCardClasses.actionGroupItem} type="title" color="inherit">
                        <div className={baseCallToActionCardClasses.actionElement}>
                            <Link style={{textDecoration: 'none', color: 'inherit'}} to={target}>
                                <Button className={baseCallToActionCardClasses.button} raised color="primary"
                                        type="submit">{submitText}
                                </Button>
                            </Link>
                        </div>
                    </Typography>
                </div>
            )}
        </CardContent>
    </Card>
);