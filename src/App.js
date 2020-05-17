import React from 'react';
import Hero from './components/Hero/Hero';
import About from './components/Article/About';
import Instagram from './components/Gallery/Instagram';
import ContactForm from './components/Form/Contactform';
import GoogleMaps from './components/Map/GoogleMaps';
import MainMenu from './components/Menu/MainMenu';
import Logos from './components/Gallery/Logos';
import Bar from './components/Loader/Bar';
import { links, socialSites } from './constants';
import styles from './App.module.scss';

function App() {
	return (
		<>
			<main className={styles.container}>
				<Hero />
				<About />
				<Instagram count={8} />
				<ContactForm title={'Registrační formulář'} />
				<GoogleMaps />
				<Logos title="" />
			</main>
			<MainMenu links={links} socialSites={socialSites} />
			<Bar />
		</>
	);
}

export default App;
