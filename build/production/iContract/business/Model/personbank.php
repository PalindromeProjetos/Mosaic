<?php

namespace iContract\Model;

/**
 * 
 * @Entity {"name":"personbank", "cache":"\\iContract\\Cache\\personbank", "event":"\\iContract\\Event\\personbank"}
 */
class personbank extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":true}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $personid;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $bank;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $agency;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $accountnumber;

    /**
     * @Policy {"nullable":false, "default":"", "length":1}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $accounttype;

    /**
     * @Policy {"nullable":false, "default":"b'0'"}
     * @Column {"description":"", "type":"boolean", "policy":true}
     */
    private $isdefault;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iContract\Model\personbank
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getPersonid() {
        return $this->personid;
    }

    /**
     * @param type $personid
     * @return \iContract\Model\personbank
     */
    public function setPersonid($personid) {
        $this->personid = $personid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getBank() {
        return $this->bank;
    }

    /**
     * @param type $bank
     * @return \iContract\Model\personbank
     */
    public function setBank($bank) {
        $this->bank = $bank;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getAgency() {
        return $this->agency;
    }

    /**
     * @param type $agency
     * @return \iContract\Model\personbank
     */
    public function setAgency($agency) {
        $this->agency = $agency;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getAccountnumber() {
        return $this->accountnumber;
    }

    /**
     * @param type $accountnumber
     * @return \iContract\Model\personbank
     */
    public function setAccountnumber($accountnumber) {
        $this->accountnumber = $accountnumber;
        return $this;
    }

    /**
     * @return type string
     */
    public function getAccounttype() {
        return $this->accounttype;
    }

    /**
     * @param type $accounttype
     * @return \iContract\Model\personbank
     */
    public function setAccounttype($accounttype) {
        $this->accounttype = $accounttype;
        return $this;
    }

    /**
     * @return type boolean
     */
    public function getIsdefault() {
        return $this->isdefault;
    }

    /**
     * @param type $isdefault
     * @return \iContract\Model\personbank
     */
    public function setIsdefault($isdefault) {
        $this->isdefault = $isdefault;
        return $this;
    }

}