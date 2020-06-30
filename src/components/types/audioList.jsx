import React, { Component } from 'react';
import {downloadAudio} from '../../_utils/api'
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AudioList extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <tbody>
                {this.props.info && this.props.info.formats && this.props.info.formats.filter(data => data.mimeType.includes('audio')).map((format, index) => {
                        return (
                            <tr key={index} className="video-formats">
                                <td className="resolution-types">
                                    {format.audioBitrate}
                                    <span className="badge badge-dark badge-success-resolution ml-2">Kbps</span>
                                </td>
                                <td className="extension-types">
                                    .mp3
                                </td>
                                <td className="convert-button-types"> 
                                    <button type="button" className="btn btn-success download-button btn-sm" onClick={e => {
                                        e.preventDefault();
                                        const {url, info} = this.props
                                        downloadAudio(url,info,format)
                                    }}>Download <FontAwesomeIcon className="ml-1" icon={faChevronCircleDown}/></button>
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