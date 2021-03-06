import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './ContactForm.module.scss';
import { FaSync } from 'react-icons/fa';
import ReCAPTCHA from 'react-google-recaptcha';

class ContactForm extends React.Component {
	constructor(props) {
		super();
		this.state = {
			formStateValues: ['emtpy', 'fill', 'sending', 'sent', 'error'],
			formState: '',
			data: new Map(),
			validate: false,
		};
		this.header = React.createRef();
	}

	componentDidMount() {
		let user = window.localStorage.getItem('wbg');
		if (user) {
			user = JSON.parse(user);
			this.setState({ data: this.state.data.set('name', user.name) });
			this.setState({ data: this.state.data.set('surname', user.surname) });
			this.setState({ formState: this.state.formStateValues[3] });
		} else {
			this.setState({ formState: this.state.formStateValues[0] });
		}
	}

	handleInputChange = ({ target }) => {
		if (this.state.formState !== this.state.formStateValues[2]) {
			this.setState({
				data: this.state.data.set(target.name, target.value),
				formState: this.state.formStateValues[1],
			});
		}
	};

	handleSendForm = (event) => {
		event.preventDefault();
		if (this.state.validate) {
			this.setState({ formState: this.state.formStateValues[2] });
			const formData = new FormData();
			this.state.data.forEach((value, key) => {
				formData.append(key, value);
			});
			try {
				fetch('https://wbg.cz/register/', {
					method: 'POST',
					body: formData,
				})
					.then((response) => response.json())
					.then((result) => this.handleFormSent(result));
			} catch (error) {
				console.log(error);
				this.handleFormSent(error);
			}
		} else {
			alert('Potvrďtě validaci pomocí ReCaptchy!');
		}
	};

	handleFormSent = (result) => {
		if (result.status && result.status === 'success') {
			this.saveToStorage();
			setTimeout(() => {
				this.setState({ formState: this.state.formStateValues[3] });
				this.header.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
			}, 1000);
		} else {
			this.setState({ formState: this.state.formStateValues[4] });
		}
	};

	handleResetForm = () => {
		this.setState({ formState: this.state.formStateValues[0] });
		window.localStorage.clear();
	};

	saveToStorage = () => {
		window.localStorage.setItem(
			'wbg',
			JSON.stringify({
				name: this.state.data.get('name'),
				surname: this.state.data.get('surname'),
				timestamp: Date.now(),
			})
		);
	};

	render() {
		const formClass = classNames(
			styles.form,
			this.state.formState === this.state.formStateValues[2] ? styles.sending : undefined,
			this.state.formState === this.state.formStateValues[3] ? styles.sended : undefined
		);

		const registerButtonClass = classNames(
			this.state.formState === this.state.formStateValues[2] ? styles.loading : undefined
		);

		const resetButtonClass = classNames(styles.reset);

		return (
			<section id="registrace" className={styles.container} ref={this.header}>
				<h2>{this.props.title}</h2>
				<form onSubmit={this.handleSendForm} className={formClass}>
					<label>
						<span>Jméno</span>
						<input
							type="text"
							name="name"
							onChange={this.handleInputChange}
							disabled={this.state.formState === this.state.formStateValues[2] ? true : false}
							required
						/>
					</label>
					<label>
						<span>Přijmení</span>
						<input
							type="text"
							name="surname"
							onChange={this.handleInputChange}
							disabled={this.state.formState === this.state.formStateValues[2] ? true : false}
							required
						/>
					</label>
					<label>
						<span>Datum narození</span>
						<input
							type="date"
							name="birthday"
							onChange={this.handleInputChange}
							disabled={this.state.formState === this.state.formStateValues[2] ? true : false}
							required
						/>
					</label>
					<label>
						<span>Pohlaví</span>
						<select
							name="sex"
							onChange={this.handleInputChange}
							disabled={this.state.formState === this.state.formStateValues[2] ? true : false}
							defaultValue="noselect"
							required>
							<option disabled value="noselect">
								Nevybráno
							</option>
							<option value="muž">Muž</option>
							<option value="žena">Žena</option>
						</select>
					</label>
					<label>
						<span>Kategorie</span>
						<select
							name="category"
							onChange={this.handleInputChange}
							disabled={this.state.formState === this.state.formStateValues[2] ? true : false}
							defaultValue="noselect"
							required>
							<option disabled value="noselect">
								Nevybráno
							</option>
							<option value="muži">Muži</option>
							<option value="ženy">Ženy</option>
							<option value="děti 2011 a mladší">Děti 2011 a mladší</option>
							<option value="děti 2009 - 2010">Děti 2009 - 2010</option>
							<option value="děti 2007 - 2008">Děti 2007 - 2008</option>
							<option value="děti 2005 - 2006">Děti 2005 - 2006</option>
						</select>
					</label>
					<h3>Adresa</h3>
					<label>
						<span>Ulice a č.p.</span>
						<input
							type="text"
							name="street"
							onChange={this.handleInputChange}
							disabled={this.state.formState === this.state.formStateValues[2] ? true : false}
							required
						/>
					</label>
					<label>
						<span>Město</span>
						<input
							type="text"
							name="city"
							onChange={this.handleInputChange}
							disabled={this.state.formState === this.state.formStateValues[2] ? true : false}
							required
						/>
					</label>
					<h3>Kontakt</h3>
					<label>
						<span>E-mail</span>
						<input
							type="email"
							name="email"
							onChange={this.handleInputChange}
							disabled={this.state.formState === this.state.formStateValues[2] ? true : false}
							required
						/>
					</label>
					<label>
						<span>Telefon</span>
						<input
							type="tel"
							name="telephone"
							onChange={this.handleInputChange}
							disabled={this.state.formState === this.state.formStateValues[2] ? true : false}
						/>
					</label>
					<label>
						<span>Zpráva</span>
						<textarea
							rows="10"
							name="message"
							onChange={this.handleInputChange}
							disabled={this.state.formState === this.state.formStateValues[2] ? true : false}></textarea>
					</label>
					<label className={styles.checkbox}>
						<span>
							Souhlasím s podmínkami soutěže uvedené v{' '}
							<a
								href="https://drive.google.com/file/d/11DHNPJ_QGxsr51vu8-fYLxZzxkMmGGU0/view">
								propozicích závodu
							</a>
						</span>
						<input
							type="checkbox"
							name="gdpr"
							value="Souhlasím s podmínkami soutěže uvedené v propozicích závodu"
							onChange={this.handleInputChange}
							disabled={this.state.formState === this.state.formStateValues[2] ? true : false}
							required
						/>
					</label>
					<label className={styles.checkbox}>
						<span>
							<a
								href="https://drive.google.com/file/d/1svJ4F5mU52FmPnzJTvx_6mPXwMAVzcaN/view">
								Souhlasím s prohlášením závodníka a se zpracováním osobních údajů
							</a>
						</span>
						<input
							type="checkbox"
							name="gdpr"
							value="Souhlasím s prohlášením závodníka a se zpracováním osobních údajů"
							onChange={this.handleInputChange}
							disabled={this.state.formState === this.state.formStateValues[2] ? true : false}
							required
						/>
					</label>
					<div className={styles.reCaptchaContainer}>
						<div>
							<ReCAPTCHA
								sitekey="6LfFmv4UAAAAANRcZEpMMEqGInvpVtbi6Yh7Qq_E"
								onChange={() => this.setState({ validate: true })}
							/>
						</div>
					</div>
					{this.state.formState === this.state.formStateValues[4] && (
						<div className={styles.errorWrapper}>
							<p>
								Při registraci nastala chyba. Kontaktujte nás prosím přes e-mail:{' '}
								<a href="mailto:lezuvmezu@gmail.com">lezuvmezu@gmail.com</a>.
							</p>
						</div>
					)}
					<button className={registerButtonClass}>
						{this.state.formState === this.state.formStateValues[2] ? 'Probíhá registrace' : 'Registrovat'}
					</button>
				</form>
				{this.state.formState === this.state.formStateValues[3] && (
					<div className={styles.infoWrapper}>
						<p>
							Jste zaregistován jako:
							<b>{` ${this.state.data.get('name')} ${this.state.data.get('surname')}`}</b>.
						</p>
						<p>
							{' '}
							Na zadanou e-mailovou adresu jsme Vám zaslali registrační e-mail. Pokud jej nevidíte,{' '}
							<b>zkontrolujte si prosím SPAM</b>.
						</p>
						<button className={resetButtonClass} onClick={this.handleResetForm}>
							<span>Nová registrace</span>
							<FaSync className={styles.icon} />
						</button>
					</div>
				)}
			</section>
		);
	}
}

ContactForm.propTypes = {
	title: PropTypes.string,
};

ContactForm.defaultProps = {
	title: 'Kontaktní formulář',
};

export default ContactForm;
