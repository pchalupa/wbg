import React from 'react';
import styles from './Hero.module.scss';
import logo from '../../Images/logo.svg';
import climber from '../../Images/climber.png';

function Hero() {
	return (
		<section className={styles.container}>
			<div className={styles.wrapper}>
				<img src={logo} alt="Logo" id={styles.logo} />
				<h1>Zažij jediné závody v lezení nad vodou v ČR!</h1>
			</div>
			<img src={climber} alt="climber" id={styles.hero} />
		</section>
	);
}

export default Hero;
