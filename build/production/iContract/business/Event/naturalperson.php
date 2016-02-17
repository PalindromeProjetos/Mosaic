<?php

namespace iContract\Event;

class naturalperson extends \Smart\Data\Event {

    /**
     * @param \iContract\Model\naturalperson $model
     */
    public function preInsert( \iContract\Model\naturalperson &$model ) {
        $person = new \iContract\Coach\person();
        $person->getStore()->getModel()->setTypeperson('N');
        $person->getStore()->getModel()->getSubmit()->setRowValue('typeperson','N');
        $person->update();
        $id = $person->getStore()->getModel()->getId();

        $model->setId($id);
        $model->getSubmit()->setRowValue('id',$id);
    }

    /**
     * @param \iContract\Model\naturalperson $model
     */
    public function posInsert( \iContract\Model\naturalperson &$model ) {

    }

    /**
     * @param \iContract\Model\naturalperson $model
     */
    public function preUpdate( \iContract\Model\naturalperson &$model ) {
        $person = new \iContract\Coach\person();
        $person->update();
    }

    /**
     * @param \iContract\Model\naturalperson $model
     */
    public function posUpdate( \iContract\Model\naturalperson &$model ) {

    }

    /**
     * @param \iContract\Model\naturalperson $model
     */
    public function preDelete( \iContract\Model\naturalperson &$model ) {

    }

    /**
     * @param \iContract\Model\naturalperson $model
     */
    public function posDelete( \iContract\Model\naturalperson &$model ) {

    }

}