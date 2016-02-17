<?php

namespace iContract\Model;

/**
 * 
 * @Entity {"name":"menu", "cache":"\\iContract\\Cache\\menu", "event":"\\iContract\\Event\\menu"}
 */
class menu extends \Smart\Data\Model {

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
     * @Policy {"nullable":false, "default":"", "length":60}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $name;

    /**
     * @Policy {"nullable":true, "default":"", "length":65535}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $description;

    /**
     * @Policy {"nullable":true, "default":"", "length":20}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $router;

    /**
     * @Policy {"nullable":false, "default":"", "length":30}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $glyph;

    /**
     * @Policy {"nullable":true, "default":"0.00"}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $orderby;

    /**
     * @Policy {"nullable":false, "default":"b'0'"}
     * @Column {"description":"", "type":"boolean", "policy":true}
     */
    private $isactive;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iContract\Model\menu
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
     * @return \iContract\Model\menu
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
     * @return \iContract\Model\menu
     */
    public function setName($name) {
        $this->name = $name;
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
     * @return \iContract\Model\menu
     */
    public function setDescription($description) {
        $this->description = $description;
        return $this;
    }

    /**
     * @return type string
     */
    public function getRouter() {
        return $this->router;
    }

    /**
     * @param type $router
     * @return \iContract\Model\menu
     */
    public function setRouter($router) {
        $this->router = $router;
        return $this;
    }

    /**
     * @return type string
     */
    public function getGlyph() {
        return $this->glyph;
    }

    /**
     * @param type $glyph
     * @return \iContract\Model\menu
     */
    public function setGlyph($glyph) {
        $this->glyph = $glyph;
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
     * @return \iContract\Model\menu
     */
    public function setOrderby($orderby) {
        $this->orderby = $orderby;
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
     * @return \iContract\Model\menu
     */
    public function setIsactive($isactive) {
        $this->isactive = $isactive;
        return $this;
    }

}