import React, { Component } from 'react';
import {resoType} from '../helpers/resolutionTypes'
import {downloadMp4,downloadVideo} from '../../_utils/api'
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class VideoList extends Component {
    constructor(props) {
        super(props)
    }


    state = {
        link: '',
        filename:'',
        type:'',
        size: 0,
        quality: ''
    }

    render() {
        return (
            <tbody>
                {/* <tr> testing
                    <td colSpan="6">
                        <button className="form-control btn btn-sm btn-success direct-download-link">Click to Download</button>
                    </td>
                </tr> */}
                {this.props.info && this.props.info.formats && this.props.info.formats.filter(data =>  data.codecs.includes('H.264') || data.codecs.includes('av01') && data.mimeType.includes('video/mp4')).map((format, index) => {
                        if(this.state.quality !== format.qualityLabel)  {
                            return (
                                <tr key={index}>
                                        <td>
                                            {format.qualityLabel} 
                                            {resoType.filter(reso => reso.resolution === format.qualityLabel).map((res,index) => {
                                                return (
                                                    <span key={index} className="badge badge-danger badge-danger-resolution ml-1">{res.alsoKnown}</span> 
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
                                                        downloadMp4(url,format,info, (res) => {
                                                            switch(res.data.type) {
                                                                case 'MERGE_AUDIO_AND_VIDEO_SUCCESSFULLY':
                                                                    this.setState({
                                                                        link: res.data.link,
                                                                        filename:res.data.filename,
                                                                        type: res.data.type,
                                                                        size: res.data.size,
                                                                        quality: res.data.quality
                                                                    })
                                                                    break;
                                                                default:
                                                                    return ''
                                                            }
                                                        })
                                                }}>Convert <FontAwesomeIcon className="ml-1" icon={faChevronCircleDown}/></button>
                                        </td>
                                </tr>
                            )
                        }

                        return (
                            <tr key={index}>
                                <td colSpan="6">
                                    <button className="form-control btn btn-sm btn-success direct-download-link" onClick={(e) => {
                                        e.preventDefault()
                                        const {link } = this.state
                                        downloadVideo(link)
                                        // window.location.href= `http://localhost:3000/api/download/video/${this.state.filename}`
                                    }}>Click to Download</button>
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
