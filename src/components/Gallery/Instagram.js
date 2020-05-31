import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LazyImage from '../Image/LazyImage';
import styles from './Instagram.module.scss';
import rings from '../../Images/rings.svg';

function Instagram(props) {
	const [isLoaded, setLoaded] = useState(false);
	const [images, setImages] = useState([]);

	useEffect(() => {
		fetch(`https://www.instagram.com/${props.accountName}/?__a=1`)
			.then((res) => res.json())
			.then(
				(result) => {
					setImages(result.graphql.user.edge_owner_to_timeline_media.edges);
					setLoaded(true);
				},
				(error) => {
					console.log(error);
				}
			);
	}, [props.accountName]);

	const getCount = () => {
		return props.count > 0 ? props.count : Math.round(window.innerWidth / 320) * 2;
	};

	return (
		<section id="fotogalerie" className={styles.container}>
			{isLoaded ? (
				<div className={styles.grid}>
					{images.slice(0, getCount()).map((image, index) => (
						<a href="https://www.instagram.com/waterbouldergames/" className={styles.wrapper} key={index}>
							<LazyImage
								srcset={image.node.thumbnail_resources}
								thumbnail={image.node.thumbnail_src}
								className={styles.image}
								alt={image.node.accessibility_caption}
								key={index}
							/>
						</a>
					))}
				</div>
			) : (
				<img src={rings} className={styles.loader} alt="Loader" />
			)}
		</section>
	);
}

Instagram.propTypes = {
	accountName: PropTypes.string,
	count: PropTypes.number,
	title: PropTypes.string,
};

Instagram.defaultProps = {
	accountName: 'waterbouldergames',
	count: 0,
	title: 'Fotogalerie',
};

export default Instagram;
