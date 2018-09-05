import { compose, withHandlers, withState, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';

import * as actions from '../actions';
import * as surahsListActions from '../../SurahsList/actions';
import Player from '../components/Player';

export default compose(
    withRouter,
    connect(
        ({ surah }) => ({
            ayat: surah.ayats[surah.curAyat],
            surah: surah.surah,
        }),
        { ...actions, ...surahsListActions, push },
    ),
    withState('isPlaying', 'setIsPlaying', false),
    withState('volume', 'setVolume', 0.4),
    withState('progress', 'setProgress', 0),
    withState('currentTime', 'setCurrentTime', 0),
    withState('time', 'setTime', { duration: 0, currentTime: 0 }),
    withState('audioElem', 'setAudioElem', null),
    withHandlers({
        onPlay: ({ setIsPlaying }) => () => {
            setIsPlaying(true);
        },
        onPause: ({ setIsPlaying }) => () => {
            setIsPlaying(false);
        },
        onFinish: ({ nextAyat }) => () => {
            nextAyat();
        },
        updateProgress: ({ audioElem, setProgress, setTime, setCurrentTime }) => () => {
            const { duration, currentTime } = audioElem;
            const progress = (currentTime * 100) / duration;
            setProgress(progress);
            setTime({ duration: duration || 0, currentTime: currentTime || 0 });
        },
        togglePlay: ({ setIsPlaying, isPlaying, audioElem }) => () => {
            if (isPlaying) {
                audioElem.pause();
            } else {
                audioElem.play();
            }
        },
        nextSurah: ({ push, surah }) => () => {
            push(`/surah/${surah.number + 1}/ayat/1`);
        },
        prevSurah: ({ push, surah }) => () => {
            push(`/surah/${surah.number - 1}/ayat/1`);
        },
    }),
    lifecycle({
        componentDidMount() {
            const { setAudioElem, updateProgress, setTime, setCurrentTime } = this.props;
            const audioElem = document.getElementById('audio-player-media');
            setTime({ duration: audioElem.duration || 0, currentTime: 0 });
            setAudioElem(audioElem);
            audioElem.addEventListener('timeupdate', updateProgress);
            audioElem.play();
        },
        componentWillUnmount() {
            const { updateProgress, audioElem } = this.props;
            audioElem.addEventListener('timeupdate', updateProgress, false);
        },
        componentDidUpdate(prevProps) {
            const { audioElem, match, setAyats, setSurah, setCurAyatNumber } = this.props;
            if (prevProps.ayat.id !== this.props.ayat.id) {
                audioElem.currentTime = 0;
                audioElem.play();
            }
            if (prevProps.currentTime !== this.props.currentTime) {
                audioElem.currentTime = this.props.currentTime;
                audioElem.play();
            }
            if (prevProps.match.params.id !== match.params.id) {
                window.axios.get(`/surah/${match.params.id}`).then(({ data }) => {
                    setAyats(data);
                    setCurAyatNumber(0);
                    setSurah(window.surahs[parseInt(match.params.id) - 1]);
                });
            }
            if (prevProps.match.params.ayat !== match.params.ayat) {
                setCurAyatNumber(match.params.ayat - 1);
            }
            if (prevProps.volume !== this.props.volume) {
                if (!this.props.volume) {
                    prevProps.audioElem.muted = true;
                } else {
                    prevProps.audioElem.muted = false;
                }
                this.props.audioElem.volume = this.props.volume;
            }
        },
    }),
)(Player);
