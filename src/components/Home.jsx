import React, {Component} from 'react'
import VideoInput from './parts/videoInput.jsx'

class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="main-input">
                    <VideoInput />
                </div>
            </div>
        )
    }
}

export default Home
