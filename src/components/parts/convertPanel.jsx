import React, {Component} from 'react'

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
                <div className="card">
                    <div className="card-body">
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
                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <a className={`nav-link ${this.state.eventkey === "video" ? 'active': ''}`} id="video"onClick={e => this.setState({eventkey: e.target.id})}>
                                            Video
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link ${this.state.eventkey === "mp3" ? 'active': ''}`} id="mp3"onClick={e => this.setState({eventkey: e.target.id})} >
                                            Mp3
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link ${this.state.eventkey === "audio" ? 'active': ''}`} id="audio" onClick={e => this.setState({eventkey: e.target.id})} >
                                            Audio
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={`nav-link ${this.state.eventkey === "nothing" ? 'active': ''}`} id="nothing"onClick={e => this.setState({eventkey: e.target.id})}>
                                            Coming soon
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className={`tab-pane fade show ${this.state.eventkey === "video" ? 'active': ''}`} role="tabpanel" aria-labelledby="home-tab">
                                        Video
                                    </div>
                                    <div className={`tab-pane fade show ${this.state.eventkey === "mp3" ? 'active': ''}`} role="tabpanel" aria-labelledby="profile-tab">
                                        Mp3
                                    </div>
                                    <div className={`tab-pane fade show ${this.state.eventkey === "audio" ? 'active': ''}`} role="tabpanel" aria-labelledby="contact-tab">
                                        Audio
                                    </div>
                                    <div className={`tab-pane fade show ${this.state.eventkey === "nothing" ? 'active': ''}`} role="tabpanel" aria-labelledby="contact-tab">
                                        Nothing
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ConvertPanel
