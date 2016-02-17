<?php

namespace iContract\Event;

class contractor extends \Smart\Data\Event {

    /**
     * @param \iContract\Model\contractor $model
     */
    public function preInsert( \iContract\Model\contractor &$model ) {
        $person = new \iContract\Coach\person();
        $person->getStore()->getModel()->setTypeperson('C');
        $person->getStore()->getModel()->getSubmit()->setRowValue('typeperson','C');
        $person->update();
        $id = $person->getStore()->getModel()->getId();

        $model->setId($id);
        $model->getSubmit()->setRowValue('id',$id);

    }

    /**
     * @param \iContract\Model\contractor $model
     */
    public function posInsert( \iContract\Model\contractor &$model ) {

    }

    /**
     * @param \iContract\Model\contractor $model
     */
    public function preUpdate( \iContract\Model\contractor &$model ) {
        $person = new \iContract\Coach\person();
        $person->update();
    }

    /**
     * @param \iContract\Model\contractor $model
     */
    public function posUpdate( \iContract\Model\contractor &$model ) {

    }

    /**
     * @param \iContract\Model\contractor $model
     */
    public function preDelete( \iContract\Model\contractor &$model ) {

    }

    /**
     * @param \iContract\Model\contractor $model
     */
    public function posDelete( \iContract\Model\contractor &$model ) {

    }

}