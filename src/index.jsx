import React from 'react';
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import App from './app'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/youtubedownloader.css'

ReactDOM.render(<AppContainer>
    <App/>
</AppContainer>,document.querySelector('#root'));
