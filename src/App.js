import React from 'react';
import Hero from './components/Hero/Hero';
import About from './components/Article/About';
import Instagram from './components/Gallery/Instagram';
import GoogleMaps from './components/Map/GoogleMaps';
import MainMenu from './components/Menu/MainMenu';
import Logos from './components/Gallery/Logos';
import Bar from './components/Loader/Bar';
import { links, socialSites, winners } from './constants';
import styles from './App.module.scss';
import Timeline from './components/Timeline/Timeline';

function App() {
	return (
		<>
			<main className={styles.container}>
				<Hero />
				<About />
				<Instagram count={8} />
				<Timeline title="Vítězové 🏆" data={winners} />
				<GoogleMaps />
				<Logos title="" />
			</main>
			<MainMenu links={links} socialSites={socialSites} />
			<Bar />
		</>
	);
}

export default App;
