<?php

namespace iSchedule\Event;

use Smart\Utils\Session;
use Smart\Setup\Start;

class tmp_turningmonthly extends \Smart\Data\Event {

    /**
     * @param \iSchedule\Model\tmp_turningmonthly $model
     */
    public function preInsert( \iSchedule\Model\tmp_turningmonthly &$model ) {
        Start::setTimeZone();
        $date = date("d/m/Y H:i");
        $proxy = $this->getProxy();
        $username = Session::read('username');
        $shift = $model->getSubmit()->getRowValue('shift');
        $subunit = $model->getSubmit()->getRowValue('subunit');
        $dutydate = $model->getSubmit()->getRowValue('dutydate');
        $contractorunitid = $model->getSubmit()->getRowValue('contractorunitid');


        $sqlIdentify = "
            select
                sm.id as schedulingmonthlyid
            from
                schedulingmonthly sm
            where sm.dutydate = :dutydate
              and sm.contractorunitid = :contractorunitid
              and sm.shift = :shift";

        $pdo = $proxy->prepare($sqlIdentify);
        $pdo->bindValue(":shift", $shift, \PDO::PARAM_STR);
        $pdo->bindValue(":dutydate", $dutydate, \PDO::PARAM_STR);
        $pdo->bindValue(":contractorunitid", $contractorunitid, \PDO::PARAM_INT);
        $pdo->execute();

        $rows = $pdo->fetchAll();
        $schedulingmonthlyid = $rows[0]['schedulingmonthlyid'];

        $sqlPosition = "
            select
                max(tmp.position)+1 as position
            from
                tmp_turningmonthly tmp
            where tmp.shift = :shift
              and tmp.subunit = :subunit
              and tmp.schedulingmonthlyid = :schedulingmonthlyid";

        $pdo = $proxy->prepare($sqlPosition);
        $pdo->bindValue(":shift", $shift, \PDO::PARAM_STR);
        $pdo->bindValue(":subunit", $subunit, \PDO::PARAM_STR);
        $pdo->bindValue(":schedulingmonthlyid", $schedulingmonthlyid, \PDO::PARAM_INT);
        $pdo->execute();

        $rows = $pdo->fetchAll();

        $observation = $model->getObservation();
        $position = (strlen($rows[0]['position'])) != 0 ? $rows[0]['position'] : 1;

        $model->setReleasetype('M');
        $model->setUsername($username);
        $model->setPosition($position);
        $model->setSchedulingmonthlyid($schedulingmonthlyid);
        $model->setObservation("$observation <br/> $date - $username");

        $model->getSubmit()->setRow($model->getRecord());
    }

    /**
     * @param \iSchedule\Model\tmp_turningmonthly $model
     */
    public function posInsert( \iSchedule\Model\tmp_turningmonthly &$model ) {

    }

    /**
     * @param \iSchedule\Model\tmp_turningmonthly $model
     */
    public function preUpdate( \iSchedule\Model\tmp_turningmonthly &$model ) {
        Start::setTimeZone();

        $id = $model->getId();
        $date = date("d/m/Y H:i");
        $username = Session::read('username');

        $rows = $this->getProxy()->query("select observation from tmp_turningmonthly where id = $id")->fetchAll();

        $observationOld = $rows[0]['observation'];
        $observationNew = $model->getObservation();

        $observation = "$observationNew <br/> $date - $username <br/> <br/> $observationOld";

        $model->setReleasetype('M');
        $model->setObservation($observation);
    }

    /**
     * @param \iSchedule\Model\tmp_turningmonthly $model
     */
    public function posUpdate( \iSchedule\Model\tmp_turningmonthly &$model ) {

    }

    /**
     * @param \iSchedule\Model\tmp_turningmonthly $model
     */
    public function preDelete( \iSchedule\Model\tmp_turningmonthly &$model ) {

    }

    /**
     * @param \iSchedule\Model\tmp_turningmonthly $model
     */
    public function posDelete( \iSchedule\Model\tmp_turningmonthly &$model ) {

    }

}