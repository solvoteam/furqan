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
                        target={
                            <span className="surah-menu__label">
                                {currentSurah.name}
                                <Icon name="arrow" />
                            </span>
                        }>
                        <ul>
                            {surahs.map(item => (
                                <li
                                    key={item.number}
                                    className={currentSurah.name === item.name ? 'active' : ''}>
                                    <Link to={`/surah/${item.number}`}>
                                        <i>{item.number}</i>
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </PopupMenu>
                    <PopupMenu
                        target={
                            <span className="surah-menu__label">
                                {currentAyatNumber + 1}
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
            <div className="header__logo">
                <img src="/assets/img/logo.png" />
            </div>
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
