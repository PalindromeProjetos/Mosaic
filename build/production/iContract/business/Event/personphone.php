<?php

namespace iContract\Event;

class personphone extends \Smart\Data\Event {

    /**
     * @param \iContract\Model\personphone $model
     */
    public function preInsert( \iContract\Model\personphone &$model ) {
        $this->setOldIsDefault($model);
    }

    /**
     * @param \iContract\Model\personphone $model
     */
    public function posInsert( \iContract\Model\personphone &$model ) {

    }

    /**
     * @param \iContract\Model\personphone $model
     */
    public function preUpdate( \iContract\Model\personphone &$model ) {
        $this->setNewIsDefault($model);
    }

    public function setOldIsDefault($model) {
        $personid = $model->getPersonid();

        if($model->getIsdefault() == true) {
            $this->getProxy()->exec("update personphone set isdefault = false where personid = $personid");
        }
    }

    public function setNewIsDefault($model) {
        $id = $model->getId();
        $personid = $model->getPersonid();

        if($model->getIsdefault() == true) {
            $this->getProxy()->exec("update personphone set isdefault = false where id != $id and personid = $personid");
        }
    }

    /**
     * @param \iContract\Model\personphone $model
     */
    public function posUpdate( \iContract\Model\personphone &$model ) {

    }

    /**
     * @param \iContract\Model\personphone $model
     */
    public function preDelete( \iContract\Model\personphone &$model ) {

    }

    /**
     * @param \iContract\Model\personphone $model
     */
    public function posDelete( \iContract\Model\personphone &$model ) {

    }

}