<?php

namespace iContract\Model;

/**
 * 
 * @Entity {"name":"contractorsubunit", "cache":"\\iContract\\Cache\\contractorsubunit", "event":"\\iContract\\Event\\contractorsubunit"}
 */
class contractorsubunit extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":true}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $contractorunitid;

    /**
     * @Policy {"nullable":false, "default":"", "length":3}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $subunit;

    /**
     * @Policy {"nullable":true, "default":"b'0'"}
     * @Column {"description":"", "type":"boolean", "policy":true}
     */
    private $reserved;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iContract\Model\contractorsubunit
     */
    public function setId($id) {
        $this->id = $id;
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
     * @return \iContract\Model\contractorsubunit
     */
    public function setContractorunitid($contractorunitid) {
        $this->contractorunitid = $contractorunitid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getSubunit() {
        return $this->subunit;
    }

    /**
     * @param type $subunit
     * @return \iContract\Model\contractorsubunit
     */
    public function setSubunit($subunit) {
        $this->subunit = $subunit;
        return $this;
    }

    /**
     * @return type boolean
     */
    public function getReserved() {
        return $this->reserved;
    }

    /**
     * @param type $reserved
     * @return \iContract\Model\contractorsubunit
     */
    public function setReserved($reserved) {
        $this->reserved = $reserved;
        return $this;
    }

}