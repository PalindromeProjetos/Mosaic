<?php

namespace iSchedule\Model;

/**
 * 
 * @Entity {"name":"schedulingmonthlyscore", "cache":"\\iSchedule\\Cache\\schedulingmonthlyscore", "event":"\\iSchedule\\Event\\schedulingmonthlyscore"}
 */
class schedulingmonthlyscore extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":true}
     */
    private $id;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $schedulingmonthlypartnersid;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $naturalpersonid;

    /**
     * @Policy {"nullable":false, "length":1}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $scoretype;

    /**
     * @Policy {"nullable":false, "length":1}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $releasetype;

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $changedate;

    /**
     * @Policy {"nullable":false, "length":80}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $username;

    /**
     * @Policy {"nullable":true, "length":65535}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $observation;

    /**
     * @Policy {"nullable":true}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $dutyfraction;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iSchedule\Model\schedulingmonthlyscore
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getSchedulingmonthlypartnersid() {
        return $this->schedulingmonthlypartnersid;
    }

    /**
     * @param type $schedulingmonthlypartnersid
     * @return \iSchedule\Model\schedulingmonthlyscore
     */
    public function setSchedulingmonthlypartnersid($schedulingmonthlypartnersid) {
        $this->schedulingmonthlypartnersid = $schedulingmonthlypartnersid;
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
     * @return \iSchedule\Model\schedulingmonthlyscore
     */
    public function setNaturalpersonid($naturalpersonid) {
        $this->naturalpersonid = $naturalpersonid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getScoretype() {
        return $this->scoretype;
    }

    /**
     * @param type $scoretype
     * @return \iSchedule\Model\schedulingmonthlyscore
     */
    public function setScoretype($scoretype) {
        $this->scoretype = $scoretype;
        return $this;
    }

    /**
     * @return type string
     */
    public function getReleasetype() {
        return $this->releasetype;
    }

    /**
     * @param type $releasetype
     * @return \iSchedule\Model\schedulingmonthlyscore
     */
    public function setReleasetype($releasetype) {
        $this->releasetype = $releasetype;
        return $this;
    }

    /**
     * @return type string
     */
    public function getChangedate() {
        return $this->changedate;
    }

    /**
     * @param type $changedate
     * @return \iSchedule\Model\schedulingmonthlyscore
     */
    public function setChangedate($changedate) {
        $this->changedate = $changedate;
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
     * @return \iSchedule\Model\schedulingmonthlyscore
     */
    public function setUsername($username) {
        $this->username = $username;
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
     * @return \iSchedule\Model\schedulingmonthlyscore
     */
    public function setObservation($observation) {
        $this->observation = $observation;
        return $this;
    }

    /**
     * @return type string
     */
    public function getDutyfraction() {
        return $this->dutyfraction;
    }

    /**
     * @param type $dutyfraction
     * @return \iSchedule\Model\schedulingmonthlyscore
     */
    public function setDutyfraction($dutyfraction) {
        $this->dutyfraction = $dutyfraction;
        return $this;
    }

}