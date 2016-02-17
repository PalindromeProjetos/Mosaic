<?php

namespace iContract\Model;

/**
 * 
 * @Entity {"name":"legalentity", "cache":"\\iContract\\Cache\\legalentity", "event":"\\iContract\\Event\\legalentity"}
 */
class legalentity extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":true}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "default":"", "length":14}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $cnpjnumber;

    /**
     * @Policy {"nullable":false, "default":"", "length":11}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $countyregistration;

    /**
     * @Policy {"nullable":true, "default":"", "length":80}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $maincontact;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iContract\Model\legalentity
     */
    public function setId($id) {
        $this->id = $id;
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
     * @return \iContract\Model\legalentity
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
     * @return \iContract\Model\legalentity
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
     * @return \iContract\Model\legalentity
     */
    public function setMaincontact($maincontact) {
        $this->maincontact = $maincontact;
        return $this;
    }

}