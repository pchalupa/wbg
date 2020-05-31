import React, { useState } from 'react';
import styles from './SrollPosition.module.scss';

function SrollPosition() {
	const getPosition = () => {
		return Math.round((window.scrollY / (document.body.clientHeight - window.innerHeight)) * 100);
	};

	const [scrollPosition, setScrollPosition] = useState(getPosition());

	window.onscroll = () => {
		setScrollPosition(getPosition());
	};

	return <div className={styles.container} style={{ width: `${scrollPosition}%` }}></div>;
}

export default SrollPosition;
