import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Instagram.module.scss';

function Instagram(props) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [images, setImages] = useState([]);

	useEffect(() => {
		fetch(`https://www.instagram.com/${props.accountName}/?__a=1`)
			.then((res) => res.json())
			.then(
				(result) => {
					setIsLoaded(true);
					setImages(result.graphql.user.edge_owner_to_timeline_media.edges);
				},
				(error) => {
					console.log(error);
					setIsLoaded(true);
				}
			);
	}, [props.accountName]);
	return (
		<section className={styles.container}>
			<h2>{props.title}</h2>
			{isLoaded ? (
				<div className={styles.grid}>
					{images.slice(0, props.count).map((image, index) => (
						<a href={image.node.display_url} className={styles.wrapper} key={index}>
							<figure>
								<img
									src={image.node.thumbnail_resources[props.thumbnailResolution].src}
									className={styles.image}
									alt={image.node.accessibility_caption}
								/>
							</figure>
						</a>
					))}
				</div>
			) : (
				<>Loading</>
			)}
		</section>
	);
}

Instagram.propTypes = {
	accountName: PropTypes.string,
	count: PropTypes.number,
	thumbnailResolution: PropTypes.number,
	title: PropTypes.string,
};

Instagram.defaultProps = {
	accountName: 'waterbouldergames',
	count: 8,
	thumbnailResolution: 1,
	title: 'Fotogalerie',
};

export default Instagram;
