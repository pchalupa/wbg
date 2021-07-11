<?php
class Mailer {
	private $recepient;
	private $subject;
	private $body = '';
	private $headers = '';

	function __construct() {
		$this->setHeaders();
	}

	public function setHeaders() {
	 	$from = 'WBG <info@wbg.cz>';
		$rply = 'Lezu v Mezu <lezuvmezu@gmail.com>';
		$dev = 'Petr Chalupa <chalupa.petr93@gmail.com>';
	 	$headers = "From: " .($from) . "\r\n";
		$headers .= "Cc: ".($rply) . "\r\n";
		$headers .= "Cc: ".($dev) . "\r\n";
		$headers .= "Reply-To: ".($rply) . "\r\n";
		$headers .= "Return-Path: ".($from) . "\r\n";;
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
		$headers .= "X-Priority: 3\r\n";
		$headers .= "X-Mailer: PHP". phpversion() ."\r\n";
		$this->headers = $headers;
	}

	public function setRecepient(string $recepient) {
		$this->recepient = strip_tags($recepient);
	}

	public function setSubject(string $subject) {
		$this->subject = $subject;
	}

	public function setBody(string $body) {
		$this->body .= wordwrap($body."\r\n", 70);
	}

	public function resetBody() {
		$this->body = '';
	}

	public function send() {
		if(isset($this->recepient) && isset($this->subject) && isset($this->body) && isset($this->headers)) {
			$retval = mail($this->recepient, $this->subject, $this->body, $this->headers);

			return $retval == true ? true : false;
		} else {
			throw new InvalidArgumentException('Data are not complete!');
		}

		return false;
	}


}