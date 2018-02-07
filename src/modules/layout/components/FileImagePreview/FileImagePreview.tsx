import * as React from 'react';
import {Component} from "react";
import * as classNames from 'classnames';
import './FileImagePreview.scss';

interface IFileImagePreviewProps {
  image: File | undefined;
}

interface IFileImagePreviewState {
  imageURL?: string;
}

export class FileImagePreview extends Component<IFileImagePreviewProps, IFileImagePreviewState> {

  constructor() {
    super();

    this.state = {};
  }

  componentWillReceiveProps({image}: IFileImagePreviewProps) {

    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => this.setState({imageURL: reader.result});
      reader.readAsDataURL(image);
    } else {
      this.setState({imageURL: undefined});
    }
  }

  render() {
    const {imageURL} = this.state;

    return (
      <div className={classNames('file-image-preview', {empty: !imageURL})}>
        {
          imageURL
            ?
            (<img src={imageURL}/>)
            :
            (<div>
              <div className="empty-icon">
                <i className="icon icon-photo"></i>
              </div>
              <div className="empty-title">No image selected</div>
            </div>)
        }
      </div>
    );
  }
}

/*

 TODO
 var image = new Image();
 image.src = theFile.target.result;

 image.onload = function() {
 // access image size here
 console.log(this.width);

 $('#imgresizepreview, #profilepicturepreview').attr('src', this.src);
 };

 */
