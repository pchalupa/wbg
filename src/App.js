import React from 'react';
import Hero from './components/Hero/Hero';
import About from './components/Article/About';
import Instagram from './components/Gallery/Instagram';
import ContactForm from './components/Form/Contactform';
import GoogleMaps from './components/Map/GoogleMaps';
import MainMenu from './components/Menu/MainMenu';
import Logos from './components/Gallery/Logos';
import { links, socialSites } from './constants';
import styles from './App.module.scss';

function App() {
	return (
		<div className={styles.container}>
			<MainMenu links={links} socialSites={socialSites} />
			<main className={styles.wrapper}>
				<Hero />
				<About />
				<Instagram count={0} />
				<ContactForm />
				<GoogleMaps />
				<Logos />
			</main>
		</div>
	);
}

export default App;
