<?php

namespace iSchedule\Model;

/**
 * 
 * @Entity {"dependency": "id", "name":"contractingentity", "cache":"\\iSchedule\\Cache\\contractingentity", "event":"\\iSchedule\\Event\\contractingentity"}
 */
class contractingentity extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"NONE", "type":"integer", "policy":true}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "length":14}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $cnpjnumber;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iSchedule\Model\contractingentity
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
     * @return \iSchedule\Model\contractingentity
     */
    public function setCnpjnumber($cnpjnumber) {
        $this->cnpjnumber = $cnpjnumber;
        return $this;
    }

}