<?php

namespace iSchedule\Event;

use Smart\Setup\Start;
use Smart\Utils\Session;

class schedulingmonthlyscore extends \Smart\Data\Event {

    /**
     * @param \iSchedule\Model\schedulingmonthlyscore $model
     */
    public function preInsert( \iSchedule\Model\schedulingmonthlyscore &$model ) {
        Start::setTimeZone();
        $date = date("Y-m-d H:i");
        $username = Session::read('username');

        $proxy = $this->getProxy();
        $scoretype = $model->getScoretype();
        $dutyfraction = floatval($model->getDutyfraction());
        $schedulingmonthlypartnersid = $model->getSchedulingmonthlypartnersid();

        $sql = "
            select
                sum(coalesce(dutyfraction,0)) as dutyfraction
            from
                schedulingmonthlyscore
            where schedulingmonthlypartnersid = :schedulingmonthlypartnersid
              and scoretype = :scoretype";

        if($scoretype == 'P') {
            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":schedulingmonthlypartnersid", $schedulingmonthlypartnersid, \PDO::PARAM_INT);
            $pdo->bindValue(":scoretype", $scoretype, \PDO::PARAM_STR);
            $pdo->execute();

            $rows = $pdo->fetchAll();
            $dutyfraction += floatval($rows[0]['dutyfraction']);

            if($dutyfraction > 1) {
//                throw new \PDOException('O valor total da fracao nao pode ser maior que 1!');
            }
        }

        $model->setChangedate($date);
        $model->setUsername($username);
        $model->getSubmit()->setRow($model->getRecord());
    }

    /**
     * @param \iSchedule\Model\schedulingmonthlyscore $model
     */
    public function posInsert( \iSchedule\Model\schedulingmonthlyscore &$model ) {

    }

    /**
     * @param \iSchedule\Model\schedulingmonthlyscore $model
     */
    public function preUpdate( \iSchedule\Model\schedulingmonthlyscore &$model ) {
        $proxy = $this->getProxy();
        $id =$model->getId();
        $scoretype = $model->getScoretype();
        $dutyfraction = floatval($model->getDutyfraction());
        $naturalpersonid = intval($model->getNaturalpersonid());
        $schedulingmonthlypartnersid = $model->getSchedulingmonthlypartnersid();

        $sqlP = "
            select
                sum(coalesce(dutyfraction,0)) as dutyfraction
            from
                schedulingmonthlyscore
            where schedulingmonthlypartnersid = :schedulingmonthlypartnersid
              and scoretype = 'P'
              and id != :id";

        $sqlR = "
            set SQL_SAFE_UPDATES = 0;

            set @naturalpersonid = (
                        select
                            naturalpersonid
                        from
                            schedulingmonthlyscore
                        where id = :id
                          and scoretype = 'R'
                        limit 1
                );

            update
                schedulingmonthlyscore
                set naturalpersonid = :naturalpersonid
            where schedulingmonthlypartnersid = :schedulingmonthlypartnersid
              and scoretype = 'P'
              and naturalpersonid = @naturalpersonid;

            set SQL_SAFE_UPDATES = 1;";

        if($scoretype == 'R') {
            $pdo = $proxy->prepare($sqlR);
            $pdo->bindValue(":schedulingmonthlypartnersid", $schedulingmonthlypartnersid, \PDO::PARAM_INT);
            $pdo->bindValue(":naturalpersonid", $naturalpersonid, \PDO::PARAM_INT);
            $pdo->bindValue(":id", $id, \PDO::PARAM_INT);
            $pdo->execute();
        }

        if($scoretype == 'P') {
            $pdo = $proxy->prepare($sqlP);
            $pdo->bindValue(":schedulingmonthlypartnersid", $schedulingmonthlypartnersid, \PDO::PARAM_INT);
            $pdo->bindValue(":id", $id, \PDO::PARAM_INT);
            $pdo->execute();

            $rows = $pdo->fetchAll();
            $dutyfraction += floatval($rows[0]['dutyfraction']);

            if($dutyfraction > 1) {
//                throw new \PDOException('O valor total da fracao nao pode ser maior que 1!');
            }
        }
    }

    /**
     * @param \iSchedule\Model\schedulingmonthlyscore $model
     */
    public function posUpdate( \iSchedule\Model\schedulingmonthlyscore &$model ) {

    }

    /**
     * @param \iSchedule\Model\schedulingmonthlyscore $model
     */
    public function preDelete( \iSchedule\Model\schedulingmonthlyscore &$model ) {

    }

    /**
     * @param \iSchedule\Model\schedulingmonthlyscore $model
     */
    public function posDelete( \iSchedule\Model\schedulingmonthlyscore &$model ) {

    }

}