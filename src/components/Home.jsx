import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import convertLink from '../_utils/api.js'

class Home extends Component {
    state = {
        checkLink: false,
        url: 'https://youtu.be/nfj3GtI4WGM?list=RDnfj3GtI4WGM',
    }

    downloadUrl = () => {
       convertLink(this.state.url, res => {
            console.log(res)
       })
    }

    render() {
        return (
            <div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className={`form-control download-url`}
                        required
                        value={this.state.url}
                    />
                    <div className="input-group-append">
                        <Button
                            className="download-button"
                            onClick={(e) => {
                                e.preventDefault()
                                this.downloadUrl()
                            }}
                        >
                            Download
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
