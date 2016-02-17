<?php

namespace iSchedule\Event;

class allocationschema extends \Smart\Data\Event {

    /**
     * @param \iSchedule\Model\allocationschema $model
     */
    public function preInsert( \iSchedule\Model\allocationschema &$model ) {

    }

    /**
     * @param \iSchedule\Model\allocationschema $model
     */
    public function posInsert( \iSchedule\Model\allocationschema &$model ) {

    }

    /**
     * @param \iSchedule\Model\allocationschema $model
     */
    public function preUpdate( \iSchedule\Model\allocationschema &$model ) {

    }

    /**
     * @param \iSchedule\Model\allocationschema $model
     */
    public function posUpdate( \iSchedule\Model\allocationschema &$model ) {
        $id = $model->getId();
        $submit = $model->getSubmit();
        $schemaweek = $submit->getRowValue('schemaweek');

        if(strlen($schemaweek) == 0) {
            $sql = "update allocationschemamap set schemamap = null where allocationschemaid = :allocationschemaid";

            $pdo = $this->getProxy()->prepare($sql);

            $pdo->bindValue(":allocationschemaid", $id, \PDO::PARAM_INT);

            $pdo->execute();

            unset($pdo);
        }
    }

    /**
     * @param \iSchedule\Model\allocationschema $model
     */
    public function preDelete( \iSchedule\Model\allocationschema &$model ) {

    }

    /**
     * @param \iSchedule\Model\allocationschema $model
     */
    public function posDelete( \iSchedule\Model\allocationschema &$model ) {

    }

}