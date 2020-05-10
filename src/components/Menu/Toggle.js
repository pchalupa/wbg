import React from 'react';
import styles from './Toggle.module.scss';
import { IoIosMenu, IoIosArrowBack } from 'react-icons/io';

function Toggle(props) {
	return (
		<button className={styles.wrapper} onClick={props.toggleVisibilityCallBack}>
			{props.isVisible ? <IoIosArrowBack /> : <IoIosMenu />}
		</button>
	);
}

export default Toggle;
