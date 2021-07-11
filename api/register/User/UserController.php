<?php
require_once 'UserView.php';
require_once 'UserModel.php';
require_once './Helper/Translator.php';


class UserController {
	private $model;
	private $view;
	private $mailer;
	public $data;
	private $uniqid;

	function __construct($mailer, $data){
		$this->view = new UserView;
		$this->model = new UserModel;
		$this->mailer = $mailer;
		$this->data = $data;
		$this->uniqid = mt_rand(1000000,9999999);
		try {
			if(!isset($data['name']) || !isset($data['surname'])) {
				throw new Exception('Not enought data!');
			}
			$this->notifyUser();
			$this->model->insert($this->data);
		} catch(Exception $e){
			$this->sendResponse('ERR');
			return true;
		}

		$this->sendResponse('SUCCESS');
	}

	function notifyUser() {
		if (isset($this->data['email']) && $this->data['email']) {
			$this->mailer->setRecepient($this->data['email']);
		} else {
			$this->mailer->setRecepient('chalupa.petr93@gmail.com');
		}
		$price = (isset($this->data['category']) && $this->data['category'] === 'muži' || $this->data['category'] === 'ženy') ? '500 Kč' : '300 Kč';
		$this->mailer->setSubject('Registrace v závodě Water Boudler Games!');
		$this->mailer->resetBody();
		$this->mailer->setBody('<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>');
		$this->mailer->setBody('<body>');
		$this->mailer->setBody('<table style="text-align: left; font-size: 100%; font-family: Roboto, Arial, Tahoma, sans-serif;" cellspacing="0" cellpadding="0">');
		$this->mailer->setBody('<tr><td colspan="3"><h1>Vaše registrace proběhla úspěšně! 🧗</h1><td></tr>');
		$this->mailer->setBody('<tr><td colspan="3"><h2>Registrační údaje</h2><td></tr>');
		foreach($this->data as $key => $item) {
			$this->mailer->setBody('<tr><td>'.Translator::translate($key).'</td><td style="width: 12px" width="12"></td><td>'.$item.'</td></tr>');
		}
		$this->mailer->setBody('<tr><td colspan="3" style="height: 35px" height="35"><td></tr>');
		$this->mailer->setBody('<tr><td colspan="3"><h2>Platební údaje</h2><td></tr>');
		$this->mailer->setBody('<tr><td>Číslo účtu</td><td style="width: 12px" width="12"></td><td>225400558/0600</td></tr>');
		$this->mailer->setBody('<tr><td>IBAN</td><td style="width: 12px" width="12"></td><td>CZ6506000000000225400558, BIC/SWIFT: AGBACZPP</td></tr>');
		$this->mailer->setBody('<tr><td>Konstantní symbol</td><td style="width: 12px" width="12"></td><td>0379</td></tr>');
		$this->mailer->setBody('<tr><td>Variabilni symbol</td><td style="width: 12px" width="12"></td><td>'.$this->uniqid.'</td></tr>');
		$this->mailer->setBody('<tr><td>Částka</td><td style="width: 12px" width="12"></td><td><b>'.$price.'</b></td></tr>');
		$this->mailer->setBody('<tr><td colspan="3" style="height: 35px" height="35"><td></tr>');
		$this->mailer->setBody('<tr><td colspan="3"><p><b>V den závodu si prosím připravte podepsanou kopii <a href="https://drive.google.com/file/d/1svJ4F5mU52FmPnzJTvx_6mPXwMAVzcaN/view?usp=sharing">Prohlášení účastníka WBG 2020.pdf</a></b>. Závodníci mladší 18 let, musí mít prohlášení podepsané od zákoného zástupce.</p><td></tr>');
		$this->mailer->setBody('<tr><td colspan="3" style="height: 45px" height="45"><td></tr>');
		$this->mailer->setBody('<tr><td colspan="3"><h2>Sledujte nás na sociálních sítích!</h2><td></tr>');
		$this->mailer->setBody('<tr><td><a href="https://www.facebook.com/waterbouldergames/?eid=ARA07en_fZ2QqL2GZIJXOJ0SxCqacKKxgVtft0L-Ax6T8vixOfV3s4w17jHAD9h5tOp_a3T_NOdaWgVg">');
		$this->mailer->setBody('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABpElEQVRIie3WO2tUQRjG8Z/iBexsVEyy3hstUoil2CvqitirkEoS/ToqSpo0QQvBD2BhGXuTKl7Au+AqGkPCWuwJToY9k3fPhlR5YOBw5n3m/74zc84M29oi7RggtoWruISjGK3ev8cinuMZ3m1WciO4jxV0N2irmK0SG0pt/AwA89bBlabQu3oVDApNq58aFNoeEPoDf2rg4cpHxab3M25hf+Ldi5dZXAeHI+BHAehvnKnxv+gT/3AjaEts9z7IfLsxjrN41Sd+xf/Pr68mA9AubiSefVgIeO6koJ0Z+GIpq0QfkucLOBXwrBs7Bx8Pgv8mzweCnhMlcGj3ZYr+dkdKnb/Ur9H5IKBuvTtpUF7xp+DgddqDYzV9H0vg+SHBJ7Grpm+hZLynfqpfY65qpxPP5eT9fME/WQIfwXLBvNbOJZ6bgfhljKWgfKrfYKaUWUNNC1wQWvhu8yr+ps/vMq8Y3mKiMg2rLm7rXY/CmlB/JkcqXq3GaKTr+NoA/AXXmkLXdAiPsRQAL+md5weHheYJTOGp9ZeANp7o3dGiB8a2tk7/ALB6+MZLhtiUAAAAAElFTkSuQmCC" alt="Facebook"/></a>');
		$this->mailer->setBody('</td><td style="width: 12px" width="12"></td><td><a href="https://www.instagram.com/waterbouldergames/">');
		$this->mailer->setBody('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABe0lEQVRIie2WPUoDQRTHf9qaYJOk0jqFgjGFUcQjCBo8hjlE8ARRcwhDwMLKwiNoLqGdyu6aIimiFvMWhiE7H+wIFvnDY7O8j9+82TdDYKV/oAZwBUyAKfDjaVPgRXLrodALIAuAFVkKdEOg3xGguS184I1InZqWYGz7ugHuAVXX6jx0DJxo75vApQ18GgGa110Lqe3a5hkwADrAhlgHuAHmjtzMBrYlvgJ7ltyWxNhqBINnGnQbGEsHGXAPNMW37+g8GDzQoB9L/J/iA7iNCT4Q/9gSM5KYw5jgivhtw5dKTNUHbB6nMrJ2ZMoXvCPPJ0vMozx3QxaQq2iLrsXfRA2S6X8HtiRmaKkTDJ6hzimo6R2hvmkK3GnQNpGPU36BtIpTaQNvjhqFcl2Zc9T1eISa9Ir8Hjo61ad+qSaO5DL2rIPMqX6wraqkrLXrqC2J3W0C1Fwr66L+rsSCLoAzF1SHJ5E6PfeF5qoBfdRQfAXAMsnp47G9K/25fgH7R22w5ouqlAAAAABJRU5ErkJggg==" alt="Instagram"/></a>');
		$this->mailer->setBody('</td></tr>');
		$this->mailer->setBody('</table></body></html>');
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