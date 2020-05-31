import React from 'react';
import PropTypes from 'prop-types';
import styles from './Timeline.module.scss';

function Timeline(props) {
	return (
		<section className={styles.container} id="vitezove">
			{props.title && <h2>{props.title}</h2>}
			{props.data.map((item) => (
				<div className={styles.wrapper} key={item.title}>
					<div className={styles.title}>
						<span>{item.title}</span>
					</div>
					<div className={styles.text}>
						<ul className={styles.order}>
							{item.man.map((man, index) => (
								<li key={index}>{man}</li>
							))}
						</ul>
						<ul className={styles.order}>
							{item.woman.map((woman, index) => (
								<li key={index}>{woman}</li>
							))}
						</ul>
					</div>
				</div>
			))}
		</section>
	);
}

Timeline.propTypes = {
	title: PropTypes.string,
	data: PropTypes.array,
};

Timeline.defaultProps = {
	title: 'Title',
	data: [],
};

export default Timeline;
