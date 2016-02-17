<?php

namespace iContract\Cache;

use Smart\Utils\Session;
use Smart\Mail\PasswordForgot;
use Smart\Mail\PasswordInvite;
use Smart\Common\Traits as Traits;
use iContract\Model\users as Model;

class users extends \Smart\Data\Cache {
    use Traits\TuserHandler;

    public function selectLogout(array $data) {
        Session::kill();
        return self::getResultToJson();
    }

    public function selectLocked(array $data) {
        Session::slay();
        return self::getResultToJson();
    }

    public function selectOpened(array $data) {
        $opened = Session::have();

        self::_setSuccess($opened);
        self::_setText($opened ? 'Esta sessão está aberta' : 'Esta sessão está fechada');

        if($opened) {
            $data = array();
            $data['username'] = Session::read('username');
            $result = self::jsonToObject($this->selectUserComein($data));
            self::_setRows($result->rows);
        }

        return self::getResultToJson();
    }

    public function selectAccess(array $data) {
        $attempts = Session::read('attempts');
        $backupid = Session::read('backupid');
        $password = Session::read('password');

        $access = self::tryHash($data["password"],$password);

        if ($access) {
            Session::save('attempts', 0);
            Session::save('usercode', $backupid);
            self::_setText('Sua tentativa foi bem sucedida!');
        } else {
            $attempts++;
            Session::save('attempts', $attempts);
            self::_setSuccess(true);
            self::_setText('Sua tentativa fracassou!');
            self::_setErrors(array('attempts'=>$attempts));
        }

        return self::getResultToJson();
    }

    public function selectCookie(array $data) {
        $cookie = array();

        $cookie['usercode'] = Session::read('usercode');
        $cookie['username'] = Session::read('username');
        $cookie['password'] = Session::read('password');
        $cookie['fullname'] = Session::read('fullname');

        self::_setRows($cookie);

        return self::getResultToJson();
    }

    public function selectComein(array $data) {

        Session::kill();
        $passwordData = $data["password"];
        $passwordUser = "NOT VALID ACCESS!";

        try {

            $result = self::jsonToObject($this->selectUserComein($data));

            if($result->records != 0) {
                $passwordUser = $result->rows[0]->password;
            } else {
                $result->text = "O usuário não pode ser encontrado na base de dados!";
            }

            $result->success = self::tryHash($passwordData,$passwordUser);

            if ($result->success) {
                Session::save('attempts', 0);
                Session::save('backupid', $result->rows[0]->id);
                Session::save('usercode', $result->rows[0]->id);
                Session::save('username', $result->rows[0]->username);
                Session::save('password', $result->rows[0]->password);
                Session::save('fullname', $result->rows[0]->fullname);
            } else {
                $result->text = "NOT VALID ACCESS. Usuário não autenticado!";
            }

            self::_setRows($result->rows);
            self::_setText($result->text);
            self::_setSuccess($result->success);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectUserComein(array $data) {
        $usr = $data['username'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                id,
                username,
                fullname,
                password,
                filedata,
                fileinfo,
                isactive
            from
                users
            where username = :username";

        try {

            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":username", $usr, \PDO::PARAM_STR);

            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectUserForgot(array $data) {
        $proxy = $this->getStore()->getProxy();
        $username = $data['username'];
        $mainmail = $data['mainmail'];
        $birthdate = $data['birthdate'];

        $sql = "
                select
                    id,
                    username,
                    fullname,
                    mainmail,
                    DATE_FORMAT(birthdate, '%d/%m/%Y') as birthdate
                from
                    users
                where username = :username
                  and mainmail = :mainmail
                  and birthdate = :birthdate";

        try {

            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":username", $username, \PDO::PARAM_STR);
            $pdo->bindValue(":mainmail", $mainmail, \PDO::PARAM_STR);
            $pdo->bindValue(":birthdate", $birthdate, \PDO::PARAM_STR);

            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

            if(count($rows) === 0) {
                throw new \PDOException("Este Usuário não está cadastrado na nossa base de dados!");
            }

            $data = $rows[0];
            $id = $data['id'];

            $data['password'] = $password = substr(self::getHash($data['fullname']),8,6);

            $updPwd = "update users set password = '{$password}' where id = {$id}";

            $proxy->exec($updPwd);

            $body = file_get_contents("../../smart/framework/Mail/tpl/PasswordForgot.html");

            try {
                $mail = new PasswordForgot();
                $mail->configEmail($data, $body);
                $sent = $mail->Send();
            } catch (\PDOException $e) {
            }

            if(intval($sent) !== 0) {
                throw new \PDOException($mail->ErrorInfo);
            }

        } catch ( \PDOException $e ) {
            self::_setSuccess(true);
            self::_setText("E-mail enviado com sucesso para: {$mainmail}");
//            self::_setSuccess(false);
//            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectUserInvite(array $data) {
        $proxy = $this->getStore()->getProxy();
        $username = $data['username'];
        $password = $data['password'];
        $invite = $data['invite'];

        $sql = "
                select
                    id,
                    username,
                    fullname,
                    mainmail,
                    DATE_FORMAT(birthdate, '%d/%m/%Y') as birthdate
                from users
                where username = :username
                  and password = :invite";

        try {

            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":username", $username, \PDO::PARAM_STR);
            $pdo->bindValue(":invite", $invite, \PDO::PARAM_STR);

            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

            if(count($rows) === 0) {
                throw new \PDOException("Este Usuário não está cadastrado na nossa base de dados!");
            }

            $data = $rows[0];
            $id = $data['id'];
            $mainmail = $data['mainmail'];
            $data['password'] = $password;
            $pwd = self::getHash($password);

            $updPwd = "update users set password = '{$pwd}' where id = {$id}";

            $proxy->exec($updPwd);

            $body = file_get_contents("../../smart/framework/Mail/tpl/PasswordInvite.html");

            try {
                $mail = new PasswordInvite();
                $mail->configEmail($data, $body);
                $sent = $mail->Send();
            } catch (\PDOException $e) {
            }

            if(intval($sent) !== 0) {
                throw new \PDOException($mail->ErrorInfo);
            }

        } catch ( \PDOException $e ) {
            self::_setSuccess(true);
            self::_setText("E-mail enviado para {$mainmail} contendo as informações de acesso!");
//            self::_setSuccess(false);
//            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

}