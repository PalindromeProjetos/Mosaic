<?php

namespace iContract\Event;

class contractorsubunit extends \Smart\Data\Event {

    /**
     * @param \iContract\Model\contractorsubunit $model
     */
    public function preInsert( \iContract\Model\contractorsubunit &$model ) {
        $proxy = $this->getProxy();
        $subunit = $model->getSubunit();
        $reserved = $model->getReserved();

        $sql = "select count(csu.id) as count from contractorsubunit csu where csu.subunit = :subunit";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":subunit", $subunit, \PDO::PARAM_STR);

            $pdo->execute();
            $rows = $pdo->fetchAll();

            $count = intval($rows[0]['count']);

            if( ($count != 0) && ($reserved) ) {
                throw new \PDOException('Esta SubUnidade não pode ser reservada pois já esta em uso!');
            }
        } catch ( \PDOException $e ) {
            throw new \PDOException($e->getMessage());
        }
    }

    /**
     * @param \iContract\Model\contractorsubunit $model
     */
    public function posInsert( \iContract\Model\contractorsubunit &$model ) {

    }

    /**
     * @param \iContract\Model\contractorsubunit $model
     */
    public function preUpdate( \iContract\Model\contractorsubunit &$model ) {

    }

    /**
     * @param \iContract\Model\contractorsubunit $model
     */
    public function posUpdate( \iContract\Model\contractorsubunit &$model ) {

    }

    /**
     * @param \iContract\Model\contractorsubunit $model
     */
    public function preDelete( \iContract\Model\contractorsubunit &$model ) {

    }

    /**
     * @param \iContract\Model\contractorsubunit $model
     */
    public function posDelete( \iContract\Model\contractorsubunit &$model ) {

    }

}