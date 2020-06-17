import React, { Component } from 'react';
import {resoType} from '../helpers/resolutionTypes'
import {downloadMp4} from '../../_utils/api'


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
                                            <span key={index} className="badge badge-danger ml-2">{res.alsoKnown}</span> 
                                        )
                                    })}
                                </td>
                                <td>
                                    .{format.container}
                                </td>
                                <td> 
                                    <button type="button" className="btn btn-success btn-sm" onClick={e => {
                                        e.preventDefault();
                                        const {title} = this.props.info
                                        downloadMp4(this.props.url,title)
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

export default VideoList;