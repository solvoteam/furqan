import React from 'react';

import Icon from '../../../components/Icon';
import timeToSeconds from '../../../utils/timeToSeconds';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

class Player extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {
            onPlay,
            onPause,
            onFinish,
            nextAyat,
            prevAyat,
            progress,
            ayat,
            surah,
            isPlaying,
            time,
            volume,
            setVolume,
            setCurrentTime,
            togglePlay,
            duration,
            nextSurah,
            prevSurah,
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
                        <Slider
                            min={0}
                            max={duration}
                            step={1}
                            value={progress}
                            tooltip={false}
                            onChange={value => {
                                setCurrentTime((value / 100) * time.duration);
                            }}
                        />
                        <span>{fullTime}</span>
                    </div>
                    <div className="player__controllers">
                        <div className="player__controllers-buttons">
                            <Icon
                                onClick={prevSurah}
                                width={20}
                                height={20}
                                name="skip"
                                className="mirror"
                            />
                            <Icon onClick={prevAyat} name="next" className="mirror" />
                            <Icon onClick={togglePlay} name={isPlaying ? 'pause' : 'play'} />
                            <Icon onClick={nextAyat} name="next" />
                            <Icon onClick={nextSurah} width={20} height={20} name="skip" />
                        </div>
                        <div className="player__controllers-volume">
                            <Icon width={16} height={16} name="volume" className="mirror" />
                            <Slider
                                min={0}
                                max={1}
                                step={0.05}
                                value={volume}
                                tooltip={false}
                                onChange={value => {
                                    console.log(value);
                                    setVolume(value);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <audio
                    id="audio-player-media"
                    preload="auto"
                    onPlay={onPlay}
                    onPause={onPause}
                    onEnded={onFinish}
                    src={ayat.audio}
                />
            </div>
        );
    }
}

export default Player;
