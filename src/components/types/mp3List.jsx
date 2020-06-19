import React, { Component } from 'react';
import {downloadMp3} from '../../_utils/api'
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Mp3List extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <tbody>
                {this.props.info && this.props.info.formats && this.props.info.formats.filter(data => data.mimeType.includes('audio') && data.audioBitrate === 128).map((format, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    {format.audioBitrate}
                                    <span className="badge badge-success badge-success-resolution ml-2">Kbps</span>
                                </td>
                                <td>
                                    .mp3
                                </td>
                                <td> 
                                    <button type="button" className="btn btn-success download-button btn-sm" onClick={e => {
                                        e.preventDefault();
                                        const {title} = this.props.info
                                        downloadMp3(this.props.url,title)
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

export default Mp3List;