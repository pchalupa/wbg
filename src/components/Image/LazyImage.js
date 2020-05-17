import React, { useState } from 'react';
import GradientLoader from '../Loader/Gradient';
import styles from './LazyImage.module.scss';

function LazyImage(props) {
	const [isLoaded, setLoaded] = useState(false);

	const image = new Image();
	image.onload = () => {
		setTimeout(setLoaded(true), 500);
	};
	image.src = props.thumbnail;

	const getSrcset = () => {
		return props.srcset.reduce(
			(accumulator, item) => accumulator.concat(`${item.src} ${item.config_width}w, `),
			''
		);
	};

	return (
		<>
			{isLoaded ? (
				<img className={styles.item} srcSet={getSrcset()} src={image.src} alt={props.alt} loading="lazy" />
			) : (
				<GradientLoader />
			)}
		</>
	);
}

export default LazyImage;
