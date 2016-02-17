<?php

namespace iContract\Model;

/**
 * 
 * @Entity {"name":"additiveshift", "cache":"\\iContract\\Cache\\additiveshift", "event":"\\iContract\\Event\\additiveshift"}
 */
class additiveshift extends \Smart\Data\Model {

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
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $contractorsubunitid;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $shifttypeid;

    /**
     * @Policy {"nullable":true, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $amountsun;

    /**
     * @Policy {"nullable":true, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $amountmon;

    /**
     * @Policy {"nullable":true, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $amounttue;

    /**
     * @Policy {"nullable":true, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $amountwed;

    /**
     * @Policy {"nullable":true, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $amountthu;

    /**
     * @Policy {"nullable":true, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $amountfri;

    /**
     * @Policy {"nullable":true, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $amountsat;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iContract\Model\additiveshift
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
     * @return \iContract\Model\additiveshift
     */
    public function setAdditiveid($additiveid) {
        $this->additiveid = $additiveid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getContractorsubunitid() {
        return $this->contractorsubunitid;
    }

    /**
     * @param type $contractorsubunitid
     * @return \iContract\Model\additiveshift
     */
    public function setContractorsubunitid($contractorsubunitid) {
        $this->contractorsubunitid = $contractorsubunitid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getShifttypeid() {
        return $this->shifttypeid;
    }

    /**
     * @param type $shifttypeid
     * @return \iContract\Model\additiveshift
     */
    public function setShifttypeid($shifttypeid) {
        $this->shifttypeid = $shifttypeid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getAmountsun() {
        return $this->amountsun;
    }

    /**
     * @param type $amountsun
     * @return \iContract\Model\additiveshift
     */
    public function setAmountsun($amountsun) {
        $this->amountsun = $amountsun;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getAmountmon() {
        return $this->amountmon;
    }

    /**
     * @param type $amountmon
     * @return \iContract\Model\additiveshift
     */
    public function setAmountmon($amountmon) {
        $this->amountmon = $amountmon;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getAmounttue() {
        return $this->amounttue;
    }

    /**
     * @param type $amounttue
     * @return \iContract\Model\additiveshift
     */
    public function setAmounttue($amounttue) {
        $this->amounttue = $amounttue;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getAmountwed() {
        return $this->amountwed;
    }

    /**
     * @param type $amountwed
     * @return \iContract\Model\additiveshift
     */
    public function setAmountwed($amountwed) {
        $this->amountwed = $amountwed;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getAmountthu() {
        return $this->amountthu;
    }

    /**
     * @param type $amountthu
     * @return \iContract\Model\additiveshift
     */
    public function setAmountthu($amountthu) {
        $this->amountthu = $amountthu;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getAmountfri() {
        return $this->amountfri;
    }

    /**
     * @param type $amountfri
     * @return \iContract\Model\additiveshift
     */
    public function setAmountfri($amountfri) {
        $this->amountfri = $amountfri;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getAmountsat() {
        return $this->amountsat;
    }

    /**
     * @param type $amountsat
     * @return \iContract\Model\additiveshift
     */
    public function setAmountsat($amountsat) {
        $this->amountsat = $amountsat;
        return $this;
    }

}