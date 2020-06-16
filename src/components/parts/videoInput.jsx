import React, {Component} from 'react'
import convertLink from '../../_utils/api.js'
import { Link } from 'react-router-dom'
import ConvertPanel from './convertPanel.jsx'

class VideoInput extends Component {
    state = {
        checkLink: false,
        url: '',
        videoInfo: {}
    }

    convertLink = () => {
        convertLink(this.state.url, (res) => {
            this.setState({videoInfo: res.data})
        })
    }

    render() {
        return (
            <div>
                <div className="input-group mb-1">
                    <input
                        type="text"
                        className={`form-control download-url`}
                        required
                        value={this.state.url}
                        placeholder="Search or paste link here..."
                        onChange={(e) => {
                            this.setState({url: e.target.value})
                        }}
                    />
                    <div className="input-group-append">
                        <button
                            type="button"
                            className="btn btn-light"
                            className="download-button"
                            className="btn btn-primary"
                            onClick={(e) => {
                                e.preventDefault()
                                this.convertLink()
                            }}
                        >
                            Convert
                        </button>
                    </div>
                </div>
                <small className="form-text text-muted terms-of-use">By using our service you are accepting our <Link to="/">terms of use.</Link></small>
                <div className="mb-3 mt-5">
                    <ConvertPanel data={this.state.videoInfo}/>
                </div>
            </div>
        )
    }
}

export default VideoInput
