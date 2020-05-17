import React from 'react';
import styles from './Gradient.module.scss';

function Gradient() {
	return (
		<div
			className={styles.container}
			style={{ animationDuration: `${Math.round((Math.random() * 10000) / 100) * 100}ms` }}></div>
	);
}

export default Gradient;
