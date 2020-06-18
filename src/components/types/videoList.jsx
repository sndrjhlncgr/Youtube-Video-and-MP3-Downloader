import React, { Component } from 'react';
import {resoType} from '../helpers/resolutionTypes'
import {downloadMp4} from '../../_utils/api'
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class VideoList extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <tbody>
                {this.props.info && this.props.info.formats && this.props.info.formats.filter(data => data.codecs.includes('avc1') && data.mimeType.includes('video/mp4')).map((format, index) => {
                        if(index == 0) {
                            return false
                        }
                        return (
                            <tr key={index}>
                                <td>
                                    {format.qualityLabel} 
                                    {resoType.filter(reso => reso.resolution === format.qualityLabel).map((res,index) => {
                                        return (
                                            <span key={index} className="badge badge-danger badge-danger-resolution ml-2">{res.alsoKnown}</span> 
                                        )
                                    })}
                                </td>
                                <td>
                                    .{format.container}
                                </td>
                                <td> 
                                    <button type="button" className="btn btn-success btn-sm download-button" onClick={e => {
                                        e.preventDefault();
                                        const {url, info} = this.props
                                        downloadMp4(url,format,info)
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

export default VideoList;