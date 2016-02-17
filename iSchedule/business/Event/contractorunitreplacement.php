<?php

namespace iSchedule\Event;

class contractorunitreplacement extends \Smart\Data\Event {

    /**
     * @param \iSchedule\Model\contractorunitreplacement $model
     */
    public function preInsert( \iSchedule\Model\contractorunitreplacement &$model ) {

        $model->setSun( strlen($model->getSun()) == 0 ? 0 : $model->getSun() );
        $model->setMon( strlen($model->getMon()) == 0 ? 0 : $model->getMon() );
        $model->setTue( strlen($model->getTue()) == 0 ? 0 : $model->getTue() );
        $model->setWed( strlen($model->getWed()) == 0 ? 0 : $model->getWed() );
        $model->setThu( strlen($model->getThu()) == 0 ? 0 : $model->getThu() );
        $model->setFri( strlen($model->getFri()) == 0 ? 0 : $model->getFri() );
        $model->setSat( strlen($model->getSat()) == 0 ? 0 : $model->getSat() );

        $model->getSubmit()->setRow($model->getRecord());
    }

    /**
     * @param \iSchedule\Model\contractorunitreplacement $model
     */
    public function posInsert( \iSchedule\Model\contractorunitreplacement &$model ) {

    }

    /**
     * @param \iSchedule\Model\contractorunitreplacement $model
     */
    public function preUpdate( \iSchedule\Model\contractorunitreplacement &$model ) {

    }

    /**
     * @param \iSchedule\Model\contractorunitreplacement $model
     */
    public function posUpdate( \iSchedule\Model\contractorunitreplacement &$model ) {

    }

    /**
     * @param \iSchedule\Model\contractorunitreplacement $model
     */
    public function preDelete( \iSchedule\Model\contractorunitreplacement &$model ) {

    }

    /**
     * @param \iSchedule\Model\contractorunitreplacement $model
     */
    public function posDelete( \iSchedule\Model\contractorunitreplacement &$model ) {

    }

}