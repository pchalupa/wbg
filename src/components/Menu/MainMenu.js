import React, { useState } from 'react';
import Toggle from './Toggle';
import PropTypes from 'prop-types';
import styles from './MainMenu.module.scss';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

function MainMenu(props) {
	const [isVisible, toggleVisibility] = useState(false);

	const toggleVisibilityCallBack = () => {
		toggleVisibility(!isVisible);
	};

	const getSocialIcon = (title) => {
		let icon;
		switch (title) {
			case 'Facebook':
				icon = <FaFacebook />;
				break;
			case 'Instagram':
				icon = <FaInstagram />;
				break;
			default:
				icon = <FaFacebook />;
		}

		return icon;
	};

	return (
		<div className={styles.container}>
			<Toggle isVisible={isVisible} toggleVisibilityCallBack={toggleVisibilityCallBack} />
			<nav className={isVisible ? styles.active : ''}>
				<div className={styles.items}>
					{props.links.map((link, index) => (
						<a className={styles.item} href={link.destination} key={index}>
							{link.title}
						</a>
					))}
				</div>
				<div className={styles.footer}>
					{props.socialSites.map((site, index) => (
						<a href={site.link} key={index}>
							{getSocialIcon(site.title)}
						</a>
					))}
				</div>
			</nav>
		</div>
	);
}

MainMenu.propTypes = {
	links: PropTypes.array,
	socialSites: PropTypes.array,
};

MainMenu.defaultProps = {
	links: [{ title: 'Home', destination: '#home' }],
	socialSites: [
		{ title: 'Facebook', link: 'https://www.facebook.com/' },
		{ title: 'Instagram', link: 'https://www.instagram.com/' },
	],
};

export default MainMenu;
