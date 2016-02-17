<?php

namespace iContract\Model;

/**
 * 
 * @Entity {"name":"modulemenu", "cache":"\\iContract\\Cache\\modulemenu", "event":"\\iContract\\Event\\modulemenu"}
 */
class modulemenu extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":true}
     */
    private $id;

    /**
     * @Policy {"nullable":true, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $parentid;

    /**
     * @Policy {"nullable":true, "default":"", "length":80}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $name;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $moduleid;

    /**
     * @Policy {"nullable":true, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $menuid;

    /**
     * @Policy {"nullable":true, "default":"b'1'"}
     * @Column {"description":"", "type":"boolean", "policy":true}
     */
    private $isactive;

    /**
     * @Policy {"nullable":false, "default":"0.00"}
     * @Column {"description":"", "type":"string", "policy":true}
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
     * @return \iContract\Model\modulemenu
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getParentid() {
        return $this->parentid;
    }

    /**
     * @param type $parentid
     * @return \iContract\Model\modulemenu
     */
    public function setParentid($parentid) {
        $this->parentid = $parentid;
        return $this;
    }

    /**
     * @return type string
     */
    public function getName() {
        return $this->name;
    }

    /**
     * @param type $name
     * @return \iContract\Model\modulemenu
     */
    public function setName($name) {
        $this->name = $name;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getModuleid() {
        return $this->moduleid;
    }

    /**
     * @param type $moduleid
     * @return \iContract\Model\modulemenu
     */
    public function setModuleid($moduleid) {
        $this->moduleid = $moduleid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getMenuid() {
        return $this->menuid;
    }

    /**
     * @param type $menuid
     * @return \iContract\Model\modulemenu
     */
    public function setMenuid($menuid) {
        $this->menuid = $menuid;
        return $this;
    }

    /**
     * @return type boolean
     */
    public function getIsactive() {
        return $this->isactive;
    }

    /**
     * @param type $isactive
     * @return \iContract\Model\modulemenu
     */
    public function setIsactive($isactive) {
        $this->isactive = $isactive;
        return $this;
    }

    /**
     * @return type string
     */
    public function getOrderby() {
        return $this->orderby;
    }

    /**
     * @param type $orderby
     * @return \iContract\Model\modulemenu
     */
    public function setOrderby($orderby) {
        $this->orderby = $orderby;
        return $this;
    }

}