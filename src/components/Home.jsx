import React, {Component} from 'react'
import {Button} from 'react-bootstrap'

class Home extends Component {
    state = {
        checkLink: false,
        url: 'd',
    }

    checkLink = (url) => {
        // validate here the url
        this.setState({checkLink: url.length > 0, url})
        console.log(this.state.checkLink, this.state.url)
    }

    downloadUrl = () => {
        window.location.href = `http://localhost:3000/download?URL=${this.state.url}`
    }

    render() {
        return (
            <div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className={`form-control download-url ${
                            this.state.checkLink && 'is-valid'
                        }`}
                        required
                        onBlurCapture={(e) => {
                            e.preventDefault()
                            this.checkLink(e.target.value)
                        }}
                    />
                    <div className="input-group-append">
                        <Button
                            className="download-button"
                            onClick={(e) => {
                                e.preventDefault()
                                this.downloadUrl()
                            }}
                            disabled={!this.state.checkLink && true}
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
