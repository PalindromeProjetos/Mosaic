<?php

namespace iContract\Model;

/**
 * 
 * @Entity {"name":"additivetable", "cache":"\\iContract\\Cache\\additivetable", "event":"\\iContract\\Event\\additivetable"}
 */
class additivetable extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":true}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $additiveid;

    /**
     * @Policy {"nullable":false, "default":"", "length":3}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $shifttype;

    /**
     * @Policy {"nullable":false, "default":"0.00"}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $shiftvalue;

    /**
     * @Policy {"nullable":false, "default":"0.00"}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $shiftamount;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iContract\Model\additivetable
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getAdditiveid() {
        return $this->additiveid;
    }

    /**
     * @param type $additiveid
     * @return \iContract\Model\additivetable
     */
    public function setAdditiveid($additiveid) {
        $this->additiveid = $additiveid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getShifttype() {
        return $this->shifttype;
    }

    /**
     * @param type $shifttype
     * @return \iContract\Model\additivetable
     */
    public function setShifttype($shifttype) {
        $this->shifttype = $shifttype;
        return $this;
    }

    /**
     * @return type string
     */
    public function getShiftvalue() {
        return $this->shiftvalue;
    }

    /**
     * @param type $shiftvalue
     * @return \iContract\Model\additivetable
     */
    public function setShiftvalue($shiftvalue) {
        $this->shiftvalue = $shiftvalue;
        return $this;
    }

    /**
     * @return type string
     */
    public function getShiftamount() {
        return $this->shiftamount;
    }

    /**
     * @param type $shiftamount
     * @return \iContract\Model\additivetable
     */
    public function setShiftamount($shiftamount) {
        $this->shiftamount = $shiftamount;
        return $this;
    }

}