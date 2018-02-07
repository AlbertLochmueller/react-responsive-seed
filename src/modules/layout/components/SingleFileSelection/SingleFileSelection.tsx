import * as React from "react";
import {Component} from "react";
import {FileSelectButton} from "../FileSelectButton/FileSelectButton";
import './SingleFileSelection.scss';

interface ISingleFileSelectionState {
  fileName: string;
}

interface ISingleFileSelectionProps {
  onFileChanged(file: File|undefined);
}

export class SingleFileSelection extends Component<ISingleFileSelectionProps, ISingleFileSelectionState> {

  constructor() {
    super();

    this.state = {fileName: ''};
  }

  handleFileChanged(file?: File) {
    const {onFileChanged} = this.props;
    this.setState({fileName: file ? file.name : ''});

    onFileChanged(file);
  }

  render() {
    const {fileName} = this.state;
    return (
      <div className="single-file-selection input-group">
        <input type="text"
               className="form-input"
               value={fileName}/>
        <FileSelectButton onFilesChanged={files => this.handleFileChanged(files[0])}/>
      </div>
    );
  }
}
