import React, { Component } from 'react';
import {downloadAudio} from '../../_utils/api'

class AudioList extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <tbody>
                {this.props.info && this.props.info.formats && this.props.info.formats.filter(data => data.mimeType.includes('audio') && data.audioBitrate > 128).map((format, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    {format.audioBitrate}
                                    <span className="badge badge-success badge-success-resolution ml-2">Kbps</span>
                                </td>
                                <td>
                                    .flac
                                </td>
                                <td> 
                                    <button type="button" className="btn btn-success download-button btn-sm" onClick={e => {
                                        e.preventDefault();
                                        const {title} = this.props.info
                                        downloadAudio(this.props.url,title)
                                    }}>Download</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        )
    }
}

export default AudioList;