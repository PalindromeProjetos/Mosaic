<?php

namespace iContract\Model;

/**
 * 
 * @Entity {"name":"enumtypelist", "cache":"\\iContract\\Cache\\enumtypelist", "event":"\\iContract\\Event\\enumtypelist"}
 */
class enumtypelist extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":true}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $enumtypeid;

    /**
     * @Policy {"nullable":false, "default":"", "length":5}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $code;

    /**
     * @Policy {"nullable":false, "default":"", "length":80}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $description;

    /**
     * @Policy {"nullable":true, "default":"", "length":16777215}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $observation;

    /**
     * @Policy {"nullable":true, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $orderby;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iContract\Model\enumtypelist
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getEnumtypeid() {
        return $this->enumtypeid;
    }

    /**
     * @param type $enumtypeid
     * @return \iContract\Model\enumtypelist
     */
    public function setEnumtypeid($enumtypeid) {
        $this->enumtypeid = $enumtypeid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getCode() {
        return $this->code;
    }

    /**
     * @param type $code
     * @return \iContract\Model\enumtypelist
     */
    public function setCode($code) {
        $this->code = $code;
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
     * @return \iContract\Model\enumtypelist
     */
    public function setDescription($description) {
        $this->description = $description;
        return $this;
    }

    /**
     * @return type string
     */
    public function getObservation() {
        return $this->observation;
    }

    /**
     * @param type $observation
     * @return \iContract\Model\enumtypelist
     */
    public function setObservation($observation) {
        $this->observation = $observation;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getOrderby() {
        return $this->orderby;
    }

    /**
     * @param type $orderby
     * @return \iContract\Model\enumtypelist
     */
    public function setOrderby($orderby) {
        $this->orderby = $orderby;
        return $this;
    }

}