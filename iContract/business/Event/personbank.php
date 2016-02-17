<?php

namespace iContract\Event;

class personbank extends \Smart\Data\Event {

    /**
     * @param \iContract\Model\personbank $model
     */
    public function preInsert( \iContract\Model\personbank &$model ) {
        $this->setOldIsDefault($model);
    }

    /**
     * @param \iContract\Model\personbank $model
     */
    public function posInsert( \iContract\Model\personbank &$model ) {

    }

    /**
     * @param \iContract\Model\personbank $model
     */
    public function preUpdate( \iContract\Model\personbank &$model ) {
        $this->setNewIsDefault($model);
    }

    public function setOldIsDefault($model) {
        $personid = $model->getPersonid();

        if($model->getIsdefault() == true) {
            $this->getProxy()->exec("update personbank set isdefault = false where personid = $personid");
        }
    }

    public function setNewIsDefault($model) {
        $id = $model->getId();
        $personid = $model->getPersonid();

        if($model->getIsdefault() == true) {
            $this->getProxy()->exec("update personbank set isdefault = false where id != $id and personid = $personid");
        }
    }

    /**
     * @param \iContract\Model\personbank $model
     */
    public function posUpdate( \iContract\Model\personbank &$model ) {

    }

    /**
     * @param \iContract\Model\personbank $model
     */
    public function preDelete( \iContract\Model\personbank &$model ) {

    }

    /**
     * @param \iContract\Model\personbank $model
     */
    public function posDelete( \iContract\Model\personbank &$model ) {

    }

}