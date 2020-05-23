import React from 'react';
import styles from './Hero.module.scss';
import logo from '../../Images/logo.svg';
import { FaRegPlayCircle } from 'react-icons/fa';
import climber from '../../Images/climber.png';

function Hero() {
	return (
		<section id="domu" className={styles.container}>
			<div className={styles.wrapper}>
				<img src={logo} alt="Logo" id={styles.logo} loading="lazy" />
				<h1>Zažij jediné závody v lezení nad vodou v ČR!</h1>
				<a href="https://www.facebook.com/waterbouldergames/videos/413009075775419/" className={styles.video}>
					<span>Přehrát video</span>
					<FaRegPlayCircle />
				</a>
			</div>
			<img src={climber} alt="climber" id={styles.hero} loading="lazy" />
		</section>
	);
}

export default Hero;
