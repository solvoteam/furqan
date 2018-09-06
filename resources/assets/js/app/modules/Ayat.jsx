import React from 'react';
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';
import classNames from 'classnames';

const Ayat = ({ ayat }) => {
    const size = () => {
        if (ayat.translation.text.length > 320) {
            return 2;
        } else if (ayat.translation.text.length > 120) {
            return 3;
        } else {
            return 0;
        }
    };
    return (
        <div className="container">
            <div className="ayat-block">
                <p
                    className={classNames(
                        'ayat-block__arabic',
                        `ayat-block__arabic--size-${size()}`,
                    )}>
                    {ayat.text}
                </p>
                <p
                    className={classNames(
                        'ayat-block__translate',
                        `ayat-block__translate--size-${size()}`,
                    )}>
                    {ayat.number}. {ayat.translation.text}
                </p>
            </div>
        </div>
    );
};

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
