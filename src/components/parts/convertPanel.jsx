import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'
import { faFileAudio } from '@fortawesome/free-solid-svg-icons'

class ConvertPanel extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        info: {},
        eventkey: 'video'
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (prevProps.data.video_id != this.props.data.video_id) {
            this.openPanel()
        }
    }

    openPanel = () => {
        this.setState({info: this.props.data}, () => {
            console.log(this.state.info)
        })
    }

    render() {
        const resoType = [
            { resolution: "144p", alsoKnown: "SD" },
            { resolution: "240p", alsoKnown: "SD" },
            { resolution: "360p", alsoKnown: "SD" },
            { resolution: "480p", alsoKnown: "SD" },
            { resolution: "720p", alsoKnown: "HD" },
            { resolution: "720p60", alsoKnown: "HD 60fps" },
            { resolution: "1080p", alsoKnown: "FHD" },
            { resolution: "1080p60", alsoKnown: "FHD 60fps" },
            { resolution: "1440p", alsoKnown: "QHD" },
            { resolution: "1440p60", alsoKnown: "QHD 60fps" },
            { resolution: "2160p", alsoKnown: "UHD" },
            { resolution: "2160p60", alsoKnown: "UHD 60fps" },
            { resolution: "4320p", alsoKnown: "8K" },
            { resolution: "4320p60", alsoKnown: "8K 60fps" },
        ]
        return (
            <div>
                <div className="row">
                            <div className="col-sm-5">
                                <div className="embed-responsive embed-responsive-4by3 youtube-video-embed">
                                    <iframe
                                        className="embed-responsive-item"
                                        src={`https://www.youtube.com/embed/${
                                            this.state.info.video_id
                                                ? this.state.info.video_id
                                                : ''
                                        }`}
                                    ></iframe>
                                </div>
                                <h4>{this.state.info.title}</h4>
                            </div>
                            <div className="col-sm-7">
                                <ul className="nav nav-tabs youtube-categories">
                                    <li className="nav-item">
                                        <div className={`nav-link ${this.state.eventkey === "video" && 'active'}`} id="video" onClick={e => this.setState({eventkey: e.target.id})}>
                                            <FontAwesomeIcon icon={faPlay} id="video" />  
                                            <strong id="video" className="ml-2">Video</strong>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={`nav-link ${this.state.eventkey === "mp3" && 'active'}`} id="mp3" onClick={e => this.setState({eventkey: e.target.id})} >
                                            <FontAwesomeIcon icon={faHeadphones} id="mp3"/>
                                            <strong id="mp3" className="ml-2">Mp3</strong>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div className={`nav-link ${this.state.eventkey === "audio" && 'active'}`} id="audio" onClick={e => this.setState({eventkey: e.target.id})} >
                                            <FontAwesomeIcon icon={faFileAudio} id="audio" />
                                            <strong id="audio" className="ml-2">Audio</strong>
                                        </div>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className={`tab-pane fade show ${this.state.eventkey === "video" ? 'active': ''}`} role="tabpanel" aria-labelledby="home-tab">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                <th scope="col">Resolution</th>
                                                <th scope="col">File Type</th>
                                                <th scope="col">Download</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.info.formats && this.state.info.formats.filter(data => data.codecs.includes('avc1') && data.mimeType.includes('video/mp4')).map((format, index) => {
                                                    if(index == 0) {
                                                        return false
                                                    }
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                {format.qualityLabel} 
                                                                {resoType.filter(reso => reso.resolution === format.qualityLabel).map((res,index) => {
                                                                    return (
                                                                        <span key={index} class="badge badge-primary ml-2">{res.alsoKnown}</span> 
                                                                    )
                                                                })}
                                                            </td>
                                                            <td>
                                                                .{format.container}
                                                            </td>
                                                            <td> 
                                                                <button type="button" className="btn btn-success btn-sm" onClick={e => {
                                                                    e.preventDefault();
                                                                    window.location.href = format.url
                                                                }}>Download</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className={`tab-pane fade show ${this.state.eventkey === "mp3" ? 'active': ''}`} role="tabpanel" aria-labelledby="profile-tab">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                <th scope="col">Resolution</th>
                                                <th scope="col">File Type</th>
                                                <th scope="col">Download</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.info.formats && this.state.info.formats.filter(data => data.mimeType.includes('audio') && data.audioBitrate === 128).map((format, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    {format.audioBitrate}Kbps
                                                                </td>
                                                                <td>
                                                                    .{format.container}
                                                                </td>
                                                                <td> 
                                                                    <button type="button" className="btn btn-success btn-sm" href="dsa">Download</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className={`tab-pane fade show ${this.state.eventkey === "audio" ? 'active': ''}`} role="tabpanel" aria-labelledby="contact-tab">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                <th scope="col">Resolution</th>
                                                <th scope="col">File Type</th>
                                                <th scope="col">Download</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.info.formats && this.state.info.formats.filter(data => data.mimeType.includes('audio') && data.audioBitrate > 128).map((format, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    {format.audioBitrate}Kbps
                                                                </td>
                                                                <td>
                                                                    .{format.container}
                                                                </td>
                                                                <td> 
                                                                    <button type="button" className="btn btn-success btn-sm">Download</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
        )
    }
}

export default ConvertPanel
