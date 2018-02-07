import * as React from 'react';
import {ChangeEvent, Component} from 'react';
import './FileSelectButton.scss';
import {style} from 'typestyle';

interface FileSelectButtonProps {
    onFilesChanged(files: File[]);
}

const fileUploadButtonClasses = {
    button: style({
        cursor: 'pointer' as any,
        color: 'white' as any,
        padding: '12px 24px',
        borderRadius: 2,
        textTransform: 'none' as any,
        background: 'linear-gradient(45deg, #1f877d 30%, #26A69A 90%)',
        $nest: {
            '&:hover': {
                background: 'linear-gradient(45deg, #1c7c73 30%, #239b90 90%)',
            }
        }
    })
};

export class FileUploadButton extends Component<FileSelectButtonProps, {}> {

    handleChange(e: ChangeEvent<any>) {
        e.preventDefault();

        const {onFilesChanged} = this.props;
        onFilesChanged(e.target.files);
    }

    render() {
        return (
            <label className={fileUploadButtonClasses.button}>
                <input type="file"
                       multiple={true}
                       style={{display: 'none'}}
                       onChange={(e) => this.handleChange(e)}/>
                <span style={{color: 'inherit'}}>Hochladen</span>
            </label>
        );
    }
}