<?php

namespace iContract\Model;

/**
 * 
 * @Entity {"name":"usersmenuaction", "cache":"\\iContract\\Cache\\usersmenuaction", "event":"\\iContract\\Event\\usersmenuaction"}
 */
class usersmenuaction extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"AUTO", "type":"integer", "policy":true}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $usersmenuid;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $menuactionid;

    /**
     * @Policy {"nullable":true, "default":""}
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
     * @return \iContract\Model\usersmenuaction
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getUsersmenuid() {
        return $this->usersmenuid;
    }

    /**
     * @param type $usersmenuid
     * @return \iContract\Model\usersmenuaction
     */
    public function setUsersmenuid($usersmenuid) {
        $this->usersmenuid = $usersmenuid;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getMenuactionid() {
        return $this->menuactionid;
    }

    /**
     * @param type $menuactionid
     * @return \iContract\Model\usersmenuaction
     */
    public function setMenuactionid($menuactionid) {
        $this->menuactionid = $menuactionid;
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
     * @return \iContract\Model\usersmenuaction
     */
    public function setExpireto($expireto) {
        $this->expireto = $expireto;
        return $this;
    }

}