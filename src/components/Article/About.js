import React from 'react';
import styles from './About.module.scss';

function About() {
	return (
		<article className={styles.container} id="o-zavode">
			<h2>6. ročník jediného boulder závodu nad vodou v Česku je tady!</h2>
			<p className={styles.text}>
				Vyzkoušej si lezení nad vodou u Fajtova kopce nedaleko Velkého Meziříčí. Kvalifikační cesta je za 6
				UIAA, závodíme v mužské, ženské a dětské kategorii. Registrace probíhá až na místě a když s sebou sbalíš
				i plavky, máš to v suchu!
			</p>
		</article>
	);
}

export default About;
