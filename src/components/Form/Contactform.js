import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.scss';

function ContactForm(props) {
	const [isSent, setSent] = useState(false);

	const handleInputChange = (event) => {};
	const sendEmail = () => {};

	return (
		<section className={styles.container}>
			<h2>{props.title}</h2>
			<form className={styles.form}>
				<label>
					<span>Jméno</span>
					<input type="text" name="firstaname" placeholder="Jméno" />
				</label>
				<label>
					<span>Přijmení</span>
					<input type="text" name="surname" placeholder="Přijmení" />
				</label>
				<label>
					<span>E-mail</span>
					<input type="text" name="email" placeholder="E-mail" />
				</label>
				<label>
					<span>Telefon</span>
					<input type="text" name="telephone" placeholder="Telefon" />
				</label>
				<label id={styles.message}>
					<span>Zpráva</span>
					<textarea></textarea>
				</label>
				<input type="submit" id={styles.submit} />
			</form>
		</section>
	);
}

ContactForm.propTypes = {};

ContactForm.defaultProps = {
	title: 'Kontaktní formulář',
};

export default ContactForm;
