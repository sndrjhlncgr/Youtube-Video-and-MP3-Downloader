import React, { Component } from 'react';
import {resoType} from '../helpers/resolutionTypes'
import {downloadMp4,downloadVideo} from '../../_utils/api'
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from 'react-bootstrap/Spinner'


class VideoList extends Component {
    constructor(props) {
        super(props)
    }


    state = {
        link: '',
        filename:'',
        type:'',
        size: 0,
        quality: '',
        processing: false,
        processingVideoType: ''
    }
    
    render() {
        return (
            <tbody>
                {/* <tr>
                    <td colSpan="6">
                        <button className="form-control btn btn-sm btn-light processing-view">
                            <Spinner animation="border" className="convert-spinner" variant="secondary" />
                             <small className="ml-2">Converting video</small>
                        </button>
                    </td>
                </tr>  */}
                {this.props.info && this.props.info.formats && this.props.info.formats.filter(data =>  data.codecs.includes('H.264') || data.codecs.includes('av01') && data.mimeType.includes('video/mp4')).map((format, index) => {
                        if(this.state.quality !== format.qualityLabel && this.state.processingVideoType !== format.qualityLabel )  {
                            return (
                                <tr key={index} className="video-formats">
                                    <td className="resolution-types">
                                        {format.qualityLabel} 
                                        {resoType.filter(reso => reso.resolution === format.qualityLabel).map((res,index) => {
                                            return (
                                                <span key={index} className="badge badge-danger badge-danger-resolution ml-1">{res.alsoKnown}</span> 
                                            )
                                        })}
                                    </td>
                                    <td className="extension-types">
                                        .{format.container}
                                    </td>
                                    <td className="convert-button-types"> 
                                        <button type="button" className="btn btn-success btn-sm download-button" onClick={e => {
                                                    e.preventDefault();
                                                    const {url, info} = this.props
                                                    this.setState({processing: true, processingVideoType:format.qualityLabel})
                                                    downloadMp4(url,format,info, (res) => {
                                                        switch(res.data.type) {
                                                            case 'MERGE_AUDIO_AND_VIDEO_SUCCESSFULLY':
                                                                this.setState({
                                                                    link: res.data.link,
                                                                    filename:res.data.filename,
                                                                    type: res.data.type,
                                                                    size: res.data.size,
                                                                    quality: res.data.quality,
                                                                    processing: false,
                                                                    processingVideoType: ''
                                                                })
                                                                break;
                                                            default:
                                                                return
                                                        }
                                                    })
                                            }}>Convert <FontAwesomeIcon className="ml-1" icon={faChevronCircleDown}/></button>
                                    </td>
                                </tr>
                            )
                        }

                        if(this.state.processingVideoType === format.qualityLabel)   {
                            return (
                                <tr key={index}>
                                    <td colSpan="6">
                                        <button className="form-control btn btn-sm btn-light processing-view">
                                            <Spinner animation="border" className="convert-spinner" variant="secondary" />
                                            <small className="ml-2">Converting video</small>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }

                        return (
                            <tr key={index}>
                                <td colSpan="6">
                                    <button className="form-control btn btn-sm btn-success direct-download-link" onClick={(e) => {
                                        e.preventDefault()
                                        const { link } = this.state
                                        downloadVideo(link)
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
