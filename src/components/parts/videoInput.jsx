import React, {Component} from 'react'
import {convertLink} from '../../_utils/api.js'
import { Link } from 'react-router-dom'
import ConvertPanel from './convertPanel.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'

class VideoInput extends Component {
    state = {
        checkLink: true,
        url: '',
        videoInfo: {},
        refresh: false
    }

    convertLink = () => {
        convertLink(this.state.url, (res) => {
            this.setState({videoInfo: res.data, refresh: true})
        })
    }

    // autoPaste = (e) => {
    //     navigator.clipboard.readText()
    //     .then(text => {
    //         this.setState({url: text})
    //         this.convertLink()
    //     });
    // }

    refresh = () => {
        this.setState({
            refresh: false,
            checkLink: false,
            url: '',
            videoInfo: {}
        })
    }

    checkValidLink = (url) => {
        if (url != undefined ) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            const match = url.match(regExp);
            if (match && match[2].length == 11 || url === '') {
                this.setState({
                    checkLink: true,
                    url: url
                })
                return
            }
            this.setState({
                checkLink: false,
                url: ''
            })
        }
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
                            this.checkValidLink(e.target.value)
                        }}
                        onClick={e => {
                            e.preventDefault();
                            // this.autoPaste(e)
                        }}
                    />
                    <div className="input-group-append">
                       {!this.state.refresh?
                        <button
                            type="button"
                            className={`btn btn-light form-control go-button`}
                            disabled={this.state.url.length === 0}
                            onClick={(e) => {
                                e.preventDefault()
                                this.convertLink()
                            }}
                        >
                            Go
                        </button>
                    :
                        <button
                            type="button"
                            className={`btn btn-light form-control go-button`}
                            disabled={this.state.url.length === 0}
                            onClick={(e) => {
                                e.preventDefault()
                                this.refresh()
                            }}
                        >
                             <FontAwesomeIcon icon={faSyncAlt}/>  
                        </button>    
                    }
                    </div>
                </div>
                {!this.state.checkLink && <small>not yputube link</small>}
                <small className="form-text text-muted terms-of-use">By using our service you are accepting our <Link to="/terms-of-service" target="_blank">terms of use.</Link></small>
                <div className="mb-3 mt-5 whole-panel">
                    <ConvertPanel data={this.state.videoInfo} url={this.state.url}/>
                </div>
            </div>
        )
    }
}

export default VideoInput
