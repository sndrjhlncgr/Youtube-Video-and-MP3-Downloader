import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'
import { faFileAudio } from '@fortawesome/free-solid-svg-icons'
import VideoList from '../types/videoList'
import Mp3List from '../types/mp3List'
import AudioList from '../types/audioList'
import ColumnTypes from '../helpers/columnTypes'

class ConvertPanel extends Component {
    state = {
        info: {},
        eventkey: 'video',
        videoLength: 0,
        mp3Length: 0,
        audioLength: 0,
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (prevProps.data.video_id != this.props.data.video_id) {
            this.openPanel();
        }
    }


    openPanel = () => {
        this.setState({info: this.props.data}, () => {
            this.getResultLength(this.state.info,(videoLength,mp3Length,audioLength) => {
                this.setState({videoLength: videoLength, mp3Length: mp3Length,audioLength: audioLength})
            })
        })
    }

    getResultLength = (info, res) => {
        const {formats} = info
        const videoLength = formats ? formats.filter(data =>  data.codecs.includes('H.264') || data.codecs.includes('av01') && data.mimeType.includes('video/mp4')).length : 0 
        const mp3Length = formats ? formats.filter(data => data.mimeType.includes('audio') && data.audioBitrate === 128).length : 0
        const audioLength = formats ? formats.filter(data => data.mimeType.includes('audio')).length : 0
        res(videoLength,mp3Length,audioLength)
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-5">
                        <div className={`embed-responsive embed-responsive-4by3 youtube-video-embed mb-3 ${!this.state.info.video_id ? 'youtube-video-embed-empty' : ''}`}>
                            <iframe
                                className={`embed-responsive-item ${!this.state.info.video_id ? 'embed-responsive-item-empty' : ''}`}
                                src={`https://www.youtube.com/embed/${
                                    this.state.info.video_id
                                        && this.state.info.video_id
                                     
                                }`}
                            ></iframe>
                        </div>
                        {this.state.info.title && 
                        <blockquote className="blockquote">
                            
                                {this.state.info.title}
            
                            <footer className="blockquote-footer">Title</footer>
                        </blockquote>
                        }

                    </div>
                    <div className="col-sm-7">
                        <ul className="nav nav-tabs youtube-categories">
                            <li className="nav-item">
                                <div  
                                    className={`nav-link ${this.state.eventkey === "video" && 'active'}`} id="video" onClick={e => this.setState({eventkey: e.target.id})}>
                                    <FontAwesomeIcon icon={faPlay} id="video" />  
                                    <strong id="video" className="ml-2">Videos</strong>
                                    <span id="video" className="badge badge-pill badge-light float-right mr-1 mt-1">{this.state.videoLength}</span>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className={`nav-link ${this.state.eventkey === "mp3" && 'active'}`} id="mp3" onClick={e => this.setState({eventkey: e.target.id})} >
                                    <FontAwesomeIcon icon={faHeadphones} id="mp3"/>
                                    <strong id="mp3" className="ml-2">Mp3</strong>
                                    <span id="mp3" className="badge badge-pill badge-light float-right mr-1 mt-1">{this.state.mp3Length}</span>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className={`nav-link ${this.state.eventkey === "audio" && 'active'}`} id="audio" onClick={e => this.setState({eventkey: e.target.id})} >
                                    <FontAwesomeIcon icon={faFileAudio} id="audio" />
                                    <strong id="audio" className="ml-2">Audio</strong>
                                    <span id="audio"  className="badge badge-pill badge-light float-right mr-1 mt-1">{this.state.audioLength}</span>
                                </div>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className={`tab-pane fade show ${this.state.eventkey === "video" ? 'active': ''}`} role="tabpanel" aria-labelledby="home-tab">
                                <table className="table table-borderless mt-2 ml-2">
                                    <thead>
                                        <ColumnTypes/>
                                    </thead>
                                        <VideoList info={this.state.info}  url={this.props.url}/>
                                </table>
                            </div>
                            <div className={`tab-pane fade show ${this.state.eventkey === "mp3" ? 'active': ''}`} role="tabpanel" aria-labelledby="profile-tab">
                                <table className="table table-borderless mt-2 ml-2">
                                    <thead>
                                        <ColumnTypes/>
                                    </thead>
                                        <Mp3List info={this.state.info} url={this.props.url}/>
                                </table>
                            </div>
                            <div className={`tab-pane fade show ${this.state.eventkey === "audio" ? 'active': ''}`} role="tabpanel" aria-labelledby="contact-tab">
                                <table className="table table-borderless mt-2 ml-2">
                                    <thead>
                                        <ColumnTypes/>
                                    </thead>
                                    <AudioList info={this.state.info}  url={this.props.url}/>
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
