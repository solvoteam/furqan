import React from 'react';

import Icon from '../../../components/Icon';
import timeToSeconds from '../../../utils/timeToSeconds';

class Player extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {
            handlePlaying,
            onFinisAyat,
            nextAyat,
            prevAyat,
            progress,
            ayat,
            surah,
            isPlaying,
            time,
        } = this.props;
        const leftTime = timeToSeconds(time.currentTime);
        const fullTime = timeToSeconds(time.duration);
        return (
            <div className="player">
                <div className="container">
                    <div className="player__surah-info">
                        <b>
                            Сура {surah.name_transcription} ({surah.name})
                        </b>
                        <span>Abu Bakr Ash-Shatri</span>
                    </div>
                    <div id="main-progress" className="player__progress-bar">
                        <span>{leftTime}</span>
                        <div className="player__progress-bar-line">
                            <i />
                            <div style={{ width: `${progress}%` }}>
                                <i />
                            </div>
                        </div>
                        <span>{fullTime}</span>
                    </div>
                    <div className="player__controllers">
                        <div className="player__controllers-buttons">
                            <Icon width={20} height={20} name="skip" className="mirror" />
                            <Icon onClick={prevAyat} name="next" className="mirror" />
                            <Icon name={isPlaying ? 'pause' : 'play'} />
                            <Icon onClick={nextAyat} name="next" />
                            <Icon width={20} height={20} name="skip" />
                        </div>
                        <div className="player__controllers-volume">
                            <Icon width={16} height={16} name="volume" className="mirror" />
                            <div className="player__progress-bar-line">
                                <div>
                                    <i />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <audio
                    id="audio-player-media"
                    preload="auto"
                    onPlay={handlePlaying.bind(this, true)}
                    onPause={onFinisAyat}
                    src={ayat.audio}
                />
            </div>
        );
    }
}

export default Player;
