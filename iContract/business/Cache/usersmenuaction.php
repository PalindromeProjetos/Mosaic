<?php

namespace iContract\Cache;

use iContract\Model\usersmenuaction as Model;

class usersmenuaction extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $usersmenuid = $data["usersmenuid"];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                uma.id,
                um.id as usersmenuid,
                ma.id as menuactionid,
                uma.expireto,
                a.directive,
                a.description
            from
                usersmenu um
                inner join modulemenu mm on ( mm.id = um.modulemenuid )
                inner join menuaction ma on ( ma.menuid = mm.menuid )
                inner join action a on ( a.id = ma.actionid )
                left join usersmenuaction uma on ( uma.menuactionid = ma.id )
            where um.id = :usersmenuid
            order by a.directive";

        try {

            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":usersmenuid", $usersmenuid, \PDO::PARAM_INT);
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