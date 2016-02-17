<?php

namespace iContract\Model;

/**
 * 
 * @Entity {"name":"additive", "cache":"\\iContract\\Cache\\additive", "event":"\\iContract\\Event\\additive"}
 */
class additive extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":true}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $contractid;

    /**
     * @Policy {"nullable":true, "default":"", "length":80}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $description;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"date", "policy":true}
     */
    private $datesign;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"date", "policy":true}
     */
    private $periodof;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"date", "policy":true}
     */
    private $periodto;

    /**
     * @Policy {"nullable":true, "default":"", "length":16777215}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $note;

    /**
     * @Policy {"nullable":false, "default":"", "length":3}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $additivenumber;

    /**
     * @Policy {"nullable":true, "default":"", "length":4294967295}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $filedata;

    /**
     * @Policy {"nullable":true, "default":"", "length":16777215}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $fileinfo;

    /**
     * @Policy {"nullable":false, "default":"P", "length":1}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $additivestatus;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iContract\Model\additive
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getContractid() {
        return $this->contractid;
    }

    /**
     * @param type $contractid
     * @return \iContract\Model\additive
     */
    public function setContractid($contractid) {
        $this->contractid = $contractid;
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
     * @return \iContract\Model\additive
     */
    public function setDescription($description) {
        $this->description = $description;
        return $this;
    }

    /**
     * @return type date
     */
    public function getDatesign() {
        return $this->datesign;
    }

    /**
     * @param type $datesign
     * @return \iContract\Model\additive
     */
    public function setDatesign($datesign) {
        $this->datesign = $datesign;
        return $this;
    }

    /**
     * @return type date
     */
    public function getPeriodof() {
        return $this->periodof;
    }

    /**
     * @param type $periodof
     * @return \iContract\Model\additive
     */
    public function setPeriodof($periodof) {
        $this->periodof = $periodof;
        return $this;
    }

    /**
     * @return type date
     */
    public function getPeriodto() {
        return $this->periodto;
    }

    /**
     * @param type $periodto
     * @return \iContract\Model\additive
     */
    public function setPeriodto($periodto) {
        $this->periodto = $periodto;
        return $this;
    }

    /**
     * @return type string
     */
    public function getNote() {
        return $this->note;
    }

    /**
     * @param type $note
     * @return \iContract\Model\additive
     */
    public function setNote($note) {
        $this->note = $note;
        return $this;
    }

    /**
     * @return type string
     */
    public function getAdditivenumber() {
        return $this->additivenumber;
    }

    /**
     * @param type $additivenumber
     * @return \iContract\Model\additive
     */
    public function setAdditivenumber($additivenumber) {
        $this->additivenumber = $additivenumber;
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
     * @return \iContract\Model\additive
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
     * @return \iContract\Model\additive
     */
    public function setFileinfo($fileinfo) {
        $this->fileinfo = $fileinfo;
        return $this;
    }

    /**
     * @return type string
     */
    public function getAdditivestatus() {
        return $this->additivestatus;
    }

    /**
     * @param type $additivestatus
     * @return \iContract\Model\additive
     */
    public function setAdditivestatus($additivestatus) {
        $this->additivestatus = $additivestatus;
        return $this;
    }

}