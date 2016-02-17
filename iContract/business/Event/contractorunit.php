<?php

namespace iContract\Event;

class contractorunit extends \Smart\Data\Event {

    /**
     * @param \iContract\Model\contractorunit $model
     */
    public function preInsert( \iContract\Model\contractorunit &$model ) {
        $person = new \iContract\Coach\person();
        $person->getStore()->getModel()->setTypeperson('U');
        $person->getStore()->getModel()->getSubmit()->setRowValue('typeperson','U');
        $person->update();
        $id = $person->getStore()->getModel()->getId();

        $model->setId($id);
        $model->getSubmit()->setRowValue('id',$id);
    }

    /**
     * @param \iContract\Model\contractorunit $model
     */
    public function posInsert( \iContract\Model\contractorunit &$model ) {

    }

    /**
     * @param \iContract\Model\contractorunit $model
     */
    public function preUpdate( \iContract\Model\contractorunit &$model ) {
        $person = new \iContract\Coach\person();
        $person->update();
    }

    /**
     * @param \iContract\Model\contractorunit $model
     */
    public function posUpdate( \iContract\Model\contractorunit &$model ) {

    }

    /**
     * @param \iContract\Model\contractorunit $model
     */
    public function preDelete( \iContract\Model\contractorunit &$model ) {

    }

    /**
     * @param \iContract\Model\contractorunit $model
     */
    public function posDelete( \iContract\Model\contractorunit &$model ) {

    }

}