import { compose, withHandlers, withState, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
        { ...actions, ...surahsListActions },
    ),
    withState('isPlaying', 'setIsPlaying', false),
    withState('progress', 'setProgress', 0),
    withState('time', 'setTime', { duration: 0, currentTime: 0 }),
    withState('audioElem', 'setAudioElem', null),
    withHandlers({
        handlePlaying: ({ setIsPlaying }) => bool => {
            setIsPlaying(bool);
        },
        onFinisAyat: ({ nextAyat }) => () => {
            nextAyat();
        },
        updateProgress: ({ audioElem, setProgress, setTime }) => () => {
            const { duration, currentTime } = audioElem;
            const progress = (currentTime * 100) / duration;
            setProgress(progress);
            setTime({ duration: duration || 0, currentTime: currentTime || 0 });
        },
    }),
    lifecycle({
        componentDidMount() {
            const { setAudioElem, updateProgress, setTime } = this.props;
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
            if (prevProps.match.params.id !== match.params.id) {
                window.axios.get(`/surah/${match.params.id}`).then(({ data }) => {
                    setAyats(data);
                    setSurah(window.surahs[match.params.id - 1]);
                });
            }
            // if (match.params.ayat && prevProps.match.params.ayat !== match.params.ayat) {
            //     setCurAyatNumber(match.params.ayat);
            // }
        },
    }),
)(Player);
