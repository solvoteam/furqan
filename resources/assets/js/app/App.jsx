import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Header from './modules/Header';
import SurahsPage from './pages/SurahsPage';
import AudioPlayerPage from './pages/AudioPlayerPage';

const App = () => (
    <div>
        <Header />
        <Route exact path="/" component={SurahsPage} />
        <Route exact path="/surah/:id" component={AudioPlayerPage} />
        <Route exact path="/surah/:id/ayat/:ayat" component={AudioPlayerPage} />
    </div>
);

export default App;
