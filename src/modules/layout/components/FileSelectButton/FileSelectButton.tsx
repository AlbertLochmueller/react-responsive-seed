import * as React from "react";
import {ChangeEvent, Component} from "react";
import './FileSelectButton.scss';

interface IFileSelectButtonProps {
  onFilesChanged(files: File[]);
}

export class FileSelectButton extends Component<IFileSelectButtonProps, {}> {

  handleChange(e: ChangeEvent<any>) {
    e.preventDefault();

    const {onFilesChanged} = this.props;
    onFilesChanged(e.target.files);
  }

  render() {
    return (
      <label className="file-select-button btn btn-primary">
        <input type="file"
               onChange={(e) => this.handleChange(e)}/>
        <span>Select file</span>
      </label>
    );
  }
}
