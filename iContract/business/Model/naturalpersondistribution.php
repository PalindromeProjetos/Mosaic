<?php

namespace iContract\Model;

/**
 * 
 * @Entity {"name":"naturalpersondistribution", "cache":"\\iContract\\Cache\\naturalpersondistribution", "event":"\\iContract\\Event\\naturalpersondistribution"}
 */
class naturalpersondistribution extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":true}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $naturalpersonid;

    /**
     * @Policy {"nullable":true, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $contractorunitid;

    /**
     * @Policy {"nullable":false, "default":"", "length":3}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $weekday;

    /**
     * @Policy {"nullable":false, "default":"", "length":1}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $shift;

    /**
     * @Policy {"nullable":true, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $position;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iContract\Model\naturalpersondistribution
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getNaturalpersonid() {
        return $this->naturalpersonid;
    }

    /**
     * @param type $naturalpersonid
     * @return \iContract\Model\naturalpersondistribution
     */
    public function setNaturalpersonid($naturalpersonid) {
        $this->naturalpersonid = $naturalpersonid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getContractorunitid() {
        return $this->contractorunitid;
    }

    /**
     * @param type $contractorunitid
     * @return \iContract\Model\naturalpersondistribution
     */
    public function setContractorunitid($contractorunitid) {
        $this->contractorunitid = $contractorunitid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getWeekday() {
        return $this->weekday;
    }

    /**
     * @param type $weekday
     * @return \iContract\Model\naturalpersondistribution
     */
    public function setWeekday($weekday) {
        $this->weekday = $weekday;
        return $this;
    }

    /**
     * @return type string
     */
    public function getShift() {
        return $this->shift;
    }

    /**
     * @param type $shift
     * @return \iContract\Model\naturalpersondistribution
     */
    public function setShift($shift) {
        $this->shift = $shift;
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
     * @return \iContract\Model\naturalpersondistribution
     */
    public function setPosition($position) {
        $this->position = $position;
        return $this;
    }

}