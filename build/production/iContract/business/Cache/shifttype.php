<?php

namespace iContract\Cache;

use iContract\Model\shifttype as Model;

class shifttype extends \Smart\Data\Cache {

    public function selectLike(array $data) {
        $query = $data['query'];
        $start = $data['start'];
        $limit = $data['limit'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                st.*,
                getEnum('shift', st.shift) as shiftdescription,
                getEnum('dutytype', st.dutytype) as dutytypedescription
            from
                shifttype st
            where getEnum('shift', st.shift) like :shift
            order by st.shift";

        try {
            $pdo = $proxy->prepare($sql);

            $query = '%' . $query . '%';

            $pdo->bindValue(":shift", $query, \PDO::PARAM_STR);

            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);
            self::_setPage($start,$limit);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectCode(array $data) {
        $proxy = $this->getStore()->getProxy();
        $query = $this->getStore()->getModel()->getId();

        $sql = "
            SELECT
              st.*,
              getEnum('shift', st.shift) as shiftdescription,
              getEnum('dutytype', st.dutytype) as dutytypedescription
            FROM
                shifttype st
            WHERE st.id = :id";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":id", $query, \PDO::PARAM_INT);

            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

}