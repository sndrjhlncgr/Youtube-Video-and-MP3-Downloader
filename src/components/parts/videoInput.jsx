import React, {Component} from 'react'
import {convertLink} from '../../_utils/api.js'
import { Link } from 'react-router-dom'
import ConvertPanel from './convertPanel.jsx'

class VideoInput extends Component {
    state = {
        checkLink: false,
        url: '',
        videoInfo: {}
    }
    componentDidMount() {
        // this.setState({url: 'https://youtu.be/r2nyvDJO9hk'})
        // this.convertLink() 
        // for test
    }

    convertLink = () => {
        convertLink(this.state.url, (res) => {
            this.setState({videoInfo: res.data})
        })
    }
    autoPaste = (e) => {
        navigator.clipboard.readText()
        .then(text => {
            this.setState({url: text})
            this.convertLink()
        });
    }

    render() {
        return (
            <div>
                <div className="input-group mb-1 whole-input">
                    <input
                        type="text"
                        className={`form-control download-url`}
                        required
                        value={this.state.url}
                        placeholder="Click this or paste link here..."
                        onChange={(e) => {
                            e.preventDefault();
                            this.setState({url: e.target.value})
                        }}
                        onClick={e => {
                            e.preventDefault();
                            this.autoPaste(e)
                        }}
                    />
                    <div className="input-group-append">
                        <button
                            type="button"
                            className={`btn btn-light form-control convert-button`}
                            disabled={this.state.url.length === 0}
                            onClick={(e) => {
                                e.preventDefault()
                                this.convertLink()
                            }}
                        >
                            Convert
                        </button>
                    </div>
                </div>
                <small className="form-text text-muted terms-of-use">By using our service you are accepting our <Link to="/terms-of-service" target="_blank">terms of use.</Link></small>
                <div className="mb-3 mt-5 whole-panel">
                    <ConvertPanel data={this.state.videoInfo} url={this.state.url}/>
                </div>
            </div>
        )
    }
}

export default VideoInput
