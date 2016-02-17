<?php

namespace iContract\Cache;

use iContract\Model\profilemenu as Model;

class profilemenu extends \Smart\Data\Cache {

    public function selectCode(array $data) {
        $usersid = $data["usersid"];
        $modulemenuid = $data["modulemenuid"];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                mn.id,
                :usersid as usersid,
                mm.id as modulemenuid,
                mn.expireto,
                m.name
            from
                modulemenu mm
                inner join menu m on ( m.id = mm.menuid )
                left join usersmenu mn on ( mn.modulemenuid = mm.id )
            where mm.id = :modulemenuid";

        try {

            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":usersid", $usersid, \PDO::PARAM_INT);
            $pdo->bindValue(":modulemenuid", $modulemenuid, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectTree(array $data) {
        $module = $data["module"];
        $usersid = $data["usersid"];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                mn.id,
                mn.parentid,
                mn.name as text,
                mn.router,
                mn.glyph,
                :usersid as usersid,
                um.id as usersmenuid,
                mm.id as modulemenuid,
                um.expireto,
                case coalesce(length(mn.router),0) when 0 then 0 else 1 end as leaf
            from
                menu mn
                inner join modulemenu mm on ( mm.menuid = mn.id )
                inner join module md on ( md.id = mm.moduleid )
                left join usersmenu um on ( um.modulemenuid = mm.id and um.usersid = :usersid )
            where md.name = :module;";

        try {

            $pdo = $proxy->prepare($sql);
            $pdo->bindValue(":module", $module, \PDO::PARAM_STR);
            $pdo->bindValue(":usersid", $usersid, \PDO::PARAM_INT);
            $pdo->execute();
            $rows = $pdo->fetchAll();

            $root = self::buildRoot($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            return self::getResultToJson();
        }

        return self::objectToJson($root);
    }

}