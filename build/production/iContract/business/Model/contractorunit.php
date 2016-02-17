<?php

namespace iContract\Model;

/**
 * 
 * @Entity {"name":"contractorunit", "cache":"\\iContract\\Cache\\contractorunit", "event":"\\iContract\\Event\\contractorunit"}
 */
class contractorunit extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":true}
     */
    private $id;

    /**
     * @Policy {"nullable":true, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $position;

    /**
     * @Policy {"nullable":false, "default":"", "length":14}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $cnpjnumber;

    /**
     * @Policy {"nullable":true, "default":"", "length":11}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $countyregistration;

    /**
     * @Policy {"nullable":true, "default":"", "length":80}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $maincontact;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $positionmon;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $positiontue;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $positionwed;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $positionthu;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $positionfri;

    /**
     * @Policy {"nullable":true, "default":"", "length":10}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $quickname;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iContract\Model\contractorunit
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getPosition() {
        return $this->position;
    }

    /**
     * @param type $position
     * @return \iContract\Model\contractorunit
     */
    public function setPosition($position) {
        $this->position = $position;
        return $this;
    }

    /**
     * @return type string
     */
    public function getCnpjnumber() {
        return $this->cnpjnumber;
    }

    /**
     * @param type $cnpjnumber
     * @return \iContract\Model\contractorunit
     */
    public function setCnpjnumber($cnpjnumber) {
        $this->cnpjnumber = $cnpjnumber;
        return $this;
    }

    /**
     * @return type string
     */
    public function getCountyregistration() {
        return $this->countyregistration;
    }

    /**
     * @param type $countyregistration
     * @return \iContract\Model\contractorunit
     */
    public function setCountyregistration($countyregistration) {
        $this->countyregistration = $countyregistration;
        return $this;
    }

    /**
     * @return type string
     */
    public function getMaincontact() {
        return $this->maincontact;
    }

    /**
     * @param type $maincontact
     * @return \iContract\Model\contractorunit
     */
    public function setMaincontact($maincontact) {
        $this->maincontact = $maincontact;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getPositionmon() {
        return $this->positionmon;
    }

    /**
     * @param type $positionmon
     * @return \iContract\Model\contractorunit
     */
    public function setPositionmon($positionmon) {
        $this->positionmon = $positionmon;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getPositiontue() {
        return $this->positiontue;
    }

    /**
     * @param type $positiontue
     * @return \iContract\Model\contractorunit
     */
    public function setPositiontue($positiontue) {
        $this->positiontue = $positiontue;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getPositionwed() {
        return $this->positionwed;
    }

    /**
     * @param type $positionwed
     * @return \iContract\Model\contractorunit
     */
    public function setPositionwed($positionwed) {
        $this->positionwed = $positionwed;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getPositionthu() {
        return $this->positionthu;
    }

    /**
     * @param type $positionthu
     * @return \iContract\Model\contractorunit
     */
    public function setPositionthu($positionthu) {
        $this->positionthu = $positionthu;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getPositionfri() {
        return $this->positionfri;
    }

    /**
     * @param type $positionfri
     * @return \iContract\Model\contractorunit
     */
    public function setPositionfri($positionfri) {
        $this->positionfri = $positionfri;
        return $this;
    }

    /**
     * @return type string
     */
    public function getQuickname() {
        return $this->quickname;
    }

    /**
     * @param type $quickname
     * @return \iContract\Model\contractorunit
     */
    public function setQuickname($quickname) {
        $this->quickname = $quickname;
        return $this;
    }

}