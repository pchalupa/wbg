import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.scss';

function ContactForm(props) {
	const [isSent, setSent] = useState(false);
	const [data, setData] = useState(new Map());

	const handleInputChange = ({ target }) => {
		setData(data.set(target.name, target.value));
	};

	const handleSendForm = async (event) => {
		event.preventDefault();
		sendEmail();
		const formData = new FormData();
		for (const [key, value] of data.entries()) {
			formData.append(key, value);
		}
		try {
			const request = await fetch('https://wbg.cz/register.php', {
				method: 'post',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				body: formData,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const sendEmail = () => {
		setSent(true);
	};

	return (
		<section id="registrace" className={styles.container}>
			<h2>{props.title}</h2>
			<form className={styles.form}>
				<label>
					<span>Jméno</span>
					<input type="text" name="firstaname" onChange={handleInputChange} />
				</label>
				<label>
					<span>Přijmení</span>
					<input type="text" name="surname" onChange={handleInputChange} />
				</label>
				<label>
					<span>E-mail</span>
					<input type="text" name="email" onChange={handleInputChange} />
				</label>
				<label>
					<span>Telefon</span>
					<input type="text" name="telephone" onChange={handleInputChange} />
				</label>
				<label>
					<span>Zpráva</span>
					<textarea rows="10" name="message" onChange={handleInputChange}></textarea>
				</label>
				<input type="submit" id={styles.submit} onClick={handleSendForm} value="Registrovat" />
			</form>
		</section>
	);
}

ContactForm.propTypes = {
	title: PropTypes.string,
};

ContactForm.defaultProps = {
	title: 'Kontaktní formulář',
};

export default ContactForm;
