<?php

namespace iContract\Event;

class legalentity extends \Smart\Data\Event {

    /**
     * @param \iContract\Model\legalentity $model
     */
    public function preInsert( \iContract\Model\legalentity &$model ) {
        $person = new \iContract\Coach\person();
        $person->getStore()->getModel()->setTypeperson('L');
        $person->getStore()->getModel()->getSubmit()->setRowValue('typeperson','L');
        $person->update();
        $id = $person->getStore()->getModel()->getId();

        $model->setId($id);
        $model->getSubmit()->setRowValue('id',$id);
    }

    /**
     * @param \iContract\Model\legalentity $model
     */
    public function posInsert( \iContract\Model\legalentity &$model ) {

    }

    /**
     * @param \iContract\Model\legalentity $model
     */
    public function preUpdate( \iContract\Model\legalentity &$model ) {
        $person = new \iContract\Coach\person();
        $person->update();
    }

    /**
     * @param \iContract\Model\legalentity $model
     */
    public function posUpdate( \iContract\Model\legalentity &$model ) {

    }

    /**
     * @param \iContract\Model\legalentity $model
     */
    public function preDelete( \iContract\Model\legalentity &$model ) {

    }

    /**
     * @param \iContract\Model\legalentity $model
     */
    public function posDelete( \iContract\Model\legalentity &$model ) {

    }

}