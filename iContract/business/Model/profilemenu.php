<?php

namespace iContract\Model;

/**
 * 
 * @Entity {"name":"profilemenu", "cache":"\\iContract\\Cache\\profilemenu", "event":"\\iContract\\Event\\profilemenu"}
 */
class profilemenu extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":true}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $profileid;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $modulemenuid;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"date", "policy":true}
     */
    private $expireto;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iContract\Model\profilemenu
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getProfileid() {
        return $this->profileid;
    }

    /**
     * @param type $profileid
     * @return \iContract\Model\profilemenu
     */
    public function setProfileid($profileid) {
        $this->profileid = $profileid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getModulemenuid() {
        return $this->modulemenuid;
    }

    /**
     * @param type $modulemenuid
     * @return \iContract\Model\profilemenu
     */
    public function setModulemenuid($modulemenuid) {
        $this->modulemenuid = $modulemenuid;
        return $this;
    }

    /**
     * @return type date
     */
    public function getExpireto() {
        return $this->expireto;
    }

    /**
     * @param type $expireto
     * @return \iContract\Model\profilemenu
     */
    public function setExpireto($expireto) {
        $this->expireto = $expireto;
        return $this;
    }

}