import React from 'react';
import Hero from './components/Hero/Hero';
import About from './components/Article/About';
import Instagram from './components/Gallery/Instagram';
import GoogleMaps from './components/Map/GoogleMaps';
import MainMenu from './components/Menu/MainMenu';
import Logos from './components/Gallery/Logos';
import SrollPosition from './components/Scroll/SrollPosition';
import Timeline from './components/Timeline/Timeline';
import ContactForm from './components/Form/Contactform';
import { links, socialSites, winners } from './constants';
import styles from './App.module.scss';

function App() {
	return (
		<>
			<main className={styles.container}>
				<Hero />
				<About />
				<Instagram count={9} />
				<Timeline title="Vítězové 🏆" data={winners} />
				<GoogleMaps />
				<Logos title="" />
			</main>
			<MainMenu links={links} socialSites={socialSites} />
			<SrollPosition />
		</>
	);
}

export default App;
