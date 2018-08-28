import React from 'react';
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';

const Ayat = ({ ayat, visibleAyat }) => (
    <div className="container">
        <div className="ayat-block">
            <p className="ayat-block__arabic">{ayat.text}</p>
            <p className="ayat-block__translate">
                {ayat.number}. {ayat.translation.text}
            </p>
        </div>
    </div>
);

export default compose(
    connect(({ surah }) => ({
        ayat: surah.ayats[surah.curAyat],
        curAyat: surah.curAyat,
    })),
    withState('visibleAyat', 'setVisibleAyat', true),
    lifecycle({
        componentWillUpdate(prevProps) {
            if (prevProps.curAyat !== this.props.curAyat) {
                this.props.setVisibleAyat(false);
            }
            setTimeout(() => {
                this.props.setVisibleAyat(true);
            }, 300);
        },
    }),
)(Ayat);
