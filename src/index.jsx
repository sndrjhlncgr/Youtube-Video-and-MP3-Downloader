import React from 'react';
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import App from './app'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/youtubedownloader.css'
import './assets/fonts/index.css'

ReactDOM.render(<AppContainer>
    <App/>
</AppContainer>,document.querySelector('#root'));
