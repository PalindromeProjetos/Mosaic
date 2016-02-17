<?php

namespace iContract\Model;

/**
 * 
 * @Entity {"name":"personphone", "cache":"\\iContract\\Cache\\personphone", "event":"\\iContract\\Event\\personphone"}
 */
class personphone extends \Smart\Data\Model {

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
     * @Policy {"nullable":true, "default":"", "length":65535}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $description;

    /**
     * @Policy {"nullable":false, "default":"", "length":1}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $phonetype;

    /**
     * @Policy {"nullable":false, "default":"", "length":1}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $linetype;

    /**
     * @Policy {"nullable":false, "default":"", "length":3}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $ddd;

    /**
     * @Policy {"nullable":false, "default":"", "length":30}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $phonenumber;

    /**
     * @Policy {"nullable":false, "default":"", "length":3}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $phoneoperator;

    /**
     * @Policy {"nullable":true, "default":"b'0'"}
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
     * @return \iContract\Model\personphone
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
     * @return \iContract\Model\personphone
     */
    public function setPersonid($personid) {
        $this->personid = $personid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getDescription() {
        return $this->description;
    }

    /**
     * @param type $description
     * @return \iContract\Model\personphone
     */
    public function setDescription($description) {
        $this->description = $description;
        return $this;
    }

    /**
     * @return type string
     */
    public function getPhonetype() {
        return $this->phonetype;
    }

    /**
     * @param type $phonetype
     * @return \iContract\Model\personphone
     */
    public function setPhonetype($phonetype) {
        $this->phonetype = $phonetype;
        return $this;
    }

    /**
     * @return type string
     */
    public function getLinetype() {
        return $this->linetype;
    }

    /**
     * @param type $linetype
     * @return \iContract\Model\personphone
     */
    public function setLinetype($linetype) {
        $this->linetype = $linetype;
        return $this;
    }

    /**
     * @return type string
     */
    public function getDdd() {
        return $this->ddd;
    }

    /**
     * @param type $ddd
     * @return \iContract\Model\personphone
     */
    public function setDdd($ddd) {
        $this->ddd = $ddd;
        return $this;
    }

    /**
     * @return type string
     */
    public function getPhonenumber() {
        return $this->phonenumber;
    }

    /**
     * @param type $phonenumber
     * @return \iContract\Model\personphone
     */
    public function setPhonenumber($phonenumber) {
        $this->phonenumber = $phonenumber;
        return $this;
    }

    /**
     * @return type string
     */
    public function getPhoneoperator() {
        return $this->phoneoperator;
    }

    /**
     * @param type $phoneoperator
     * @return \iContract\Model\personphone
     */
    public function setPhoneoperator($phoneoperator) {
        $this->phoneoperator = $phoneoperator;
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
     * @return \iContract\Model\personphone
     */
    public function setIsdefault($isdefault) {
        $this->isdefault = $isdefault;
        return $this;
    }

}