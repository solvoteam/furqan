import React from 'react';
import { compose, mapProps } from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames';
import find from 'lodash/find';
import { connect } from 'react-redux';

import PopupMenu from '../components/PopupMenu';
import Icon from '../components/Icon';

const Header = ({ inPlayer, surahs, ayats, currentAyatNumber, currentSurah }) => (
    <div className={classNames('header', { 'header--player': inPlayer })}>
        <div className="container">
            {inPlayer && (
                <div className="surah-menu">
                    <PopupMenu
                        id="surahs-popup"
                        onOpened={() => {
                            setTimeout(() => {
                                document.querySelector('.popover-body ul').scrollTop =
                                    document.querySelector(
                                        '.popover-body ul #surah-' + currentSurah.number,
                                    ).offsetTop -
                                    document.querySelector(
                                        '.popover-body ul #surah-' + currentSurah.number,
                                    ).offsetHeight *
                                        2;
                            });
                        }}
                        target={
                            <span className="surah-menu__label">
                                {currentSurah.number}. {currentSurah.name}
                                <Icon name="arrow" />
                            </span>
                        }>
                        <ul>
                            {surahs.map(item => (
                                <li
                                    id={`surah-${item.number}`}
                                    key={item.number}
                                    className={currentSurah.name === item.name ? 'active' : ''}>
                                    <Link to={`/surah/${item.number}/ayat/1`}>
                                        <i>{item.number}</i>
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </PopupMenu>
                    <PopupMenu
                        id="ayats-popup"
                        target={
                            <span className="surah-menu__label">
                                {parseInt(currentAyatNumber) + 1}
                                <Icon name="arrow" />
                            </span>
                        }>
                        <ul>
                            {ayats.map(item => (
                                <li
                                    key={item.number}
                                    className={
                                        currentAyatNumber + 1 === item.number ? 'active' : ''
                                    }>
                                    <Link to={`/surah/${currentSurah.number}/ayat/${item.number}`}>
                                        {item.number}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </PopupMenu>
                </div>
            )}
            <Link className="header__logo" to="/">
                <img src="/assets/img/logo.png" />
            </Link>
        </div>
    </div>
);

export default compose(
    withRouter,
    mapProps(props => ({
        ...props,
        surahs: window.surahs,
        currentSurah: find(window.surahs, {
            number: parseInt(props.location.pathname.split('surah/')[1]),
        }),
        inPlayer: props.location.pathname.indexOf('surah') >= 0,
    })),
    connect(({ surah }) => ({
        ayats: surah.ayats,
        currentAyatNumber: surah.curAyat,
    })),
)(Header);
