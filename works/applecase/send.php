<?
if (!isset($_POST['phone']) or empty($_POST['phone'])) {
	$error1 = "Phone?<br />";
} else $error1 = NULL;

if (empty($error1)) {
	$subject = 'Заявка с сайта my-applecase.ru';
	$message = "Телефон: {$_POST['phone']}; ";
	if (mail("temper-it@yandex.ru", $subject, $message)) {
		echo "ok!";
	} else echo "error";
} else {
	echo $error1;
}
?>