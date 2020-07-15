<?php
require_once 'RegisterView.php';


class RegisterController {
	private $model;
	private $view;
	private $mailer;
	private $data;
	private $uniqid;

	function __construct($mailer, $data){
		$this->mailer = $mailer;
		$this->view = new RegisterView;
		$this->data = $data;
		$this->uniqid = mt_rand(1000000,9999999);
		try {
			$this->notifyUser();
			$this->notifyOrganizator();
		} catch(Exception $e){
			$this->sendResponse('ERR');
		}
		$this->sendResponse('SUCCESS');
	}

	function notifyUser() {
		$this->mailer->setRecepient('chalupa.petr93@gmail.com');
		$this->mailer->setSubject('Děkujeme za registraci v závodě Water boudler games! 🧗');
		$this->mailer->resetBody();
		$this->mailer->setBody('<html><body>');
		$this->mailer->setBody('<h1>Vaše registrační údaje</h1>');
		foreach($this->data as $key => $item) {
			if ($item == reset($this->data)){
				$this->mailer->setBody('<table><tbody>');
			}

			$this->mailer->setBody('<tr><td>'.$key.'</td><td>'.$item.'</td></tr>');

			if ($item == end($this->data)) {
				$this->mailer->setBody('<tr><td>Variabilni symbol</td><td>'.$this->uniqid.'</td></tr>');
				$this->mailer->setBody('</tbody></table>');
			}
		}
		$this->mailer->setBody('</body></html>');
		if ($this->mailer->send() == false) {
			throw new Exception('Error when sending notification');
		}
	}

	function notifyOrganizator() {
		$this->mailer->setRecepient('chalupa.petr93@gmail.com');
		$this->mailer->setSubject('Registrace nového zavodníka! 🧗');
		$this->mailer->resetBody();
		$this->mailer->setBody('<html><body>');
		$this->mailer->setBody('<h1>Na webu se zaregistroval nový zavodník! 🧗</h1>');
		foreach($this->data as $key => $item) {
			if ($item == reset($this->data)){
				$this->mailer->setBody('<table><tbody>');
			}

			$this->mailer->setBody('<tr><td>'.$key.'</td><td>'.$item.'</td></tr>');

			if ($item == end($this->data)) {
				$this->mailer->setBody('<tr><td>Variabilni symbol</td><td>'.$this->uniqid.'</td></tr>');
				$this->mailer->setBody('</tbody></table>');
			}
		}
		$this->mailer->setBody('</body></html>');
		if ($this->mailer->send() == false) {
			throw new Exception('Error when sending notification');
		}
	}

	function sendResponse($status){
		if($status === 'ERR') {
			$this->view->display('error');
		} else {
			$this->view->display('success');
		}
	}
}
