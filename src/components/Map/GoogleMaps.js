import React from 'react';
import styles from './GoogleMaps.module.scss';

function GoogleMaps() {
	return (
		<section id="mapa" className={styles.container}>
			<iframe
				title="map"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5196.796501023779!2d16.02591615216064!3d49.36353695210647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470d6fa3383fe537%3A0x18bcd9ee205927bd!2sWater%20Boulder%20Games!5e0!3m2!1sen!2scz!4v1588528172766!5m2!1sen!2scz"></iframe>
		</section>
	);
}

export default GoogleMaps;
