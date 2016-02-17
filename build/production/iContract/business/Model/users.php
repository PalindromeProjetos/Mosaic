<?php

namespace iContract\Model;

/**
 * 
 * @Entity {"name":"users", "cache":"\\iContract\\Cache\\users", "event":"\\iContract\\Event\\users"}
 */
class users extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":true}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "default":"", "length":80}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $username;

    /**
     * @Policy {"nullable":true, "default":"", "length":80}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $password;

    /**
     * @Policy {"nullable":true, "default":"", "length":4294967295}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $filedata;

    /**
     * @Policy {"nullable":true, "default":"", "length":65535}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $fileinfo;

    /**
     * @Policy {"nullable":true, "default":"b'0'"}
     * @Column {"description":"", "type":"boolean", "policy":true}
     */
    private $isactive;

    /**
     * @Policy {"nullable":false, "default":"", "length":80}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $fullname;

    /**
     * @Policy {"nullable":false, "default":"", "length":80}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $mainmail;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"date", "policy":true}
     */
    private $birthdate;

    /**
     * @Policy {"nullable":true, "default":"b'0'"}
     * @Column {"description":"", "type":"boolean", "policy":true}
     */
    private $notifyuser;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iContract\Model\users
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type string
     */
    public function getUsername() {
        return $this->username;
    }

    /**
     * @param type $username
     * @return \iContract\Model\users
     */
    public function setUsername($username) {
        $this->username = $username;
        return $this;
    }

    /**
     * @return type string
     */
    public function getPassword() {
        return $this->password;
    }

    /**
     * @param type $password
     * @return \iContract\Model\users
     */
    public function setPassword($password) {
        $this->password = $password;
        return $this;
    }

    /**
     * @return type string
     */
    public function getFiledata() {
        return $this->filedata;
    }

    /**
     * @param type $filedata
     * @return \iContract\Model\users
     */
    public function setFiledata($filedata) {
        $this->filedata = $filedata;
        return $this;
    }

    /**
     * @return type string
     */
    public function getFileinfo() {
        return $this->fileinfo;
    }

    /**
     * @param type $fileinfo
     * @return \iContract\Model\users
     */
    public function setFileinfo($fileinfo) {
        $this->fileinfo = $fileinfo;
        return $this;
    }

    /**
     * @return type boolean
     */
    public function getIsactive() {
        return $this->isactive;
    }

    /**
     * @param type $isactive
     * @return \iContract\Model\users
     */
    public function setIsactive($isactive) {
        $this->isactive = $isactive;
        return $this;
    }

    /**
     * @return type string
     */
    public function getFullname() {
        return $this->fullname;
    }

    /**
     * @param type $fullname
     * @return \iContract\Model\users
     */
    public function setFullname($fullname) {
        $this->fullname = $fullname;
        return $this;
    }

    /**
     * @return type string
     */
    public function getMainmail() {
        return $this->mainmail;
    }

    /**
     * @param type $mainmail
     * @return \iContract\Model\users
     */
    public function setMainmail($mainmail) {
        $this->mainmail = $mainmail;
        return $this;
    }

    /**
     * @return type date
     */
    public function getBirthdate() {
        return $this->birthdate;
    }

    /**
     * @param type $birthdate
     * @return \iContract\Model\users
     */
    public function setBirthdate($birthdate) {
        $this->birthdate = $birthdate;
        return $this;
    }

    /**
     * @return type boolean
     */
    public function getNotifyuser() {
        return $this->notifyuser;
    }

    /**
     * @param type $notifyuser
     * @return \iContract\Model\users
     */
    public function setNotifyuser($notifyuser) {
        $this->notifyuser = $notifyuser;
        return $this;
    }

}