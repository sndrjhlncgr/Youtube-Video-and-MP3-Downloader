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
                                    {/* <li className="nav-item">
                                        <div className={`nav-link ${this.state.eventkey === "nothing" && 'active'}`} id="nothing" onClick={e => this.setState({eventkey: e.target.id})}>
                                            <FontAwesomeIcon icon={faPlay} id="nothing"/>
                                            <strong id="nothing" className="ml-2">N/A</strong>
                                        </div>
                                    </li> */}
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className={`tab-pane fade show ${this.state.eventkey === "video" ? 'active': ''}`} role="tabpanel" aria-labelledby="home-tab">
                                        <ul class="list-group mt-3">
                                            <li class="list-group-item">
                                                <div className="row text-center">
                                                    <div className="col-sm-3">
                                                        ewqeqeqw
                                                    </div>
                                                    <div className="col-sm-3">
                                                        ewqeqeq
                                                    </div>
                                                    <div className="col-sm-3">
                                                        ewqeqeqw
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <button type="button" class="btn btn-success btn-sm">Download</button>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={`tab-pane fade show ${this.state.eventkey === "mp3" ? 'active': ''}`} role="tabpanel" aria-labelledby="profile-tab">
                                    <ul class="list-group mt-3">
                                            <li class="list-group-item">
                                                <div className="row text-center">
                                                    <div className="col-sm-3">
                                                        ewqeqeqw
                                                    </div>
                                                    <div className="col-sm-3">
                                                        ewqeqeq
                                                    </div>
                                                    <div className="col-sm-3">
                                                        ewqeqeqw
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <button type="button" class="btn btn-success btn-sm">Download</button>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={`tab-pane fade show ${this.state.eventkey === "audio" ? 'active': ''}`} role="tabpanel" aria-labelledby="contact-tab">
                                    <ul class="list-group mt-3">
                                            <li class="list-group-item">
                                                <div className="row text-center">
                                                    <div className="col-sm-3">
                                                        ewqeqeqw
                                                    </div>
                                                    <div className="col-sm-3">
                                                        ewqeqeq
                                                    </div>
                                                    <div className="col-sm-3">
                                                        ewqeqeqw
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <button type="button" class="btn btn-success btn-sm">Download</button>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* <div className={`tab-pane fade show ${this.state.eventkey === "nothing" ? 'active': ''}`} role="tabpanel" aria-labelledby="contact-tab">
                                        Nothing
                                    </div> */}
                                </div>
                            </div>
                        </div>
            </div>
        )
    }
}

export default ConvertPanel
