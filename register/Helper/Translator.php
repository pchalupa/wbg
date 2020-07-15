<?php

class Translator {
	static function translate($text) {
		switch($text){
			case 'name':
				return 'Jméno';
			break;
			case 'surname':
				return 'Přijmení';
				break;
			case 'birthday':
				return 'Datum narození';
				break;
			case 'sex':
				return 'Pohlaví';
				break;
			case 'category':
				return 'Kategorie';
				break;
			case 'email':
				return 'E-mail';
				break;
			case 'telephone':
				return 'Telefon';
				break;
			case 'street':
				return 'Ulice a č.p.';
				break;
			case 'city':
				return 'Město';
				break;
			case 'message':
				return 'Zpráva';
				break;
			case 'gdpr':
				return 'GDPR';
				break;
			default:
				return 'Neznámé';
			break;
		}
	}
}