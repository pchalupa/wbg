<?php


class UserView {
	public function display(string $data) {
		$msg = array('status' => $data);
		echo json_encode($msg);
	}
}