import React from 'react';

import Player from '../modules/Player';
import Ayat from '../modules/Ayat';

const AudioPlayerPage = () => {
    return (
        <div className="audio-player">
            <Ayat />
            <Player />
        </div>
    );
};

export default AudioPlayerPage;
