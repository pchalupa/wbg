import React from 'react';
import PropTypes from 'prop-types';
import styles from './Logos.module.scss';
import autocolor from '../../Images/Sponsors/autocolor.png';
import emontana from '../../Images/Sponsors/emontana.png';
import grep from '../../Images/Sponsors/grep.png';
import rafiki from '../../Images/Sponsors/rafiki.png';
import rockPoint from '../../Images/Sponsors/rock_point.png';

function Logos(props) {
	return (
		<section id="sponzori" className={styles.container}>
			<h2>{props.title}</h2>
			<div className={styles.wrapper}>
				<figure>
					<img src={rafiki} alt="Rafiki" />
				</figure>
				<figure>
					<img src={emontana} alt="Emontana" />
				</figure>
				<figure>
					<img src={rockPoint} alt="Rock-point" />
				</figure>
				<figure>
					<img src={grep} alt="Grep" />
				</figure>
				<figure>
					<img src={autocolor} alt="Autocolor" />
				</figure>
			</div>
		</section>
	);
}

Logos.propTypes = {
	title: PropTypes.string,
};

Logos.defaultProps = {
	title: 'Sponzoři',
};

export default Logos;
