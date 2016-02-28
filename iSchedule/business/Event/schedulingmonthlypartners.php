<?php

namespace iSchedule\Event;

use Smart\Utils\Session;
use Smart\Setup\Start;

class schedulingmonthlypartners extends \Smart\Data\Event {

    /**
     * @param \iSchedule\Model\schedulingmonthlypartners $model
     */
    public function preInsert( \iSchedule\Model\schedulingmonthlypartners &$model ) {
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
                schedulingmonthlypartners tmp
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

        $model->setShifthours(12);
        $model->setReleasetype('M');
        $model->setUsername($username);
        $model->setPosition($position);
        $model->setSchedulingmonthlyid($schedulingmonthlyid);
        $model->setObservation("$observation <br/> $date - $username");

        $model->getSubmit()->setRow($model->getRecord());
    }

    /**
     * @param \iSchedule\Model\schedulingmonthlypartners $model
     */
    public function posInsert( \iSchedule\Model\schedulingmonthlypartners &$model ) {
        Start::setTimeZone();
        $date = date("Y-m-d H:i");
        $proxy = $this->getProxy();
        $username = Session::read('username');
        $id = $model->getId();
        $observation = $model->getObservation();
        $naturalpersonid = $model->getNaturalpersonid();

        $sqlInsert = "
            insert into schedulingmonthlyscore
              ( schedulingmonthlypartnersid, naturalpersonid, scoretype, changedate, username, observation, releasetype )
            values
              ( :id, :naturalpersonid, 'R', :changedate, :username, :observation, 'L' ),
              ( :id, :naturalpersonid, 'P', :changedate, :username, :observation, 'L' );";

        $pdo = $proxy->prepare($sqlInsert);
        $pdo->bindValue(":id", $id, \PDO::PARAM_INT);
        $pdo->bindValue(":changedate", $date, \PDO::PARAM_STR);
        $pdo->bindValue(":username", $username, \PDO::PARAM_STR);
        $pdo->bindValue(":observation", $observation, \PDO::PARAM_STR);
        $pdo->bindValue(":naturalpersonid", $naturalpersonid, \PDO::PARAM_INT);
        $pdo->execute();
    }

    /**
     * @param \iSchedule\Model\schedulingmonthlypartners $model
     */
    public function preUpdate( \iSchedule\Model\schedulingmonthlypartners &$model ) {

    }

    /**
     * @param \iSchedule\Model\schedulingmonthlypartners $model
     */
    public function posUpdate( \iSchedule\Model\schedulingmonthlypartners &$model ) {

    }

    /**
     * @param \iSchedule\Model\schedulingmonthlypartners $model
     */
    public function preDelete( \iSchedule\Model\schedulingmonthlypartners &$model ) {

    }

    /**
     * @param \iSchedule\Model\schedulingmonthlypartners $model
     */
    public function posDelete( \iSchedule\Model\schedulingmonthlypartners &$model ) {

    }

}