<?php

namespace iContract\Cache;

use iContract\Model\modulemenu as Model;

class modulemenu extends \Smart\Data\Cache {

    public function selectTree(array $data) {
        $module = $data["module"];

        $sql = "
            select
                mm.id,
                mn.router,
                mm.parentid,
                coalesce(mm.name,mn.name) as text,
                coalesce(mn.glyph,mm.glyph) as glyph,
                case coalesce(length(mn.router),0) when 0 then 0 else 1 end as leaf
            from
                module m
                inner join modulemenu mm on ( mm.moduleid = m.id )
                left join  menu mn on ( mn.id = mm.menuid )
            where m.name = :module
                order by mm.orderby";

        try {
            $pdo = $this->getStore()->getProxy()->prepare($sql);
            $pdo->bindValue(":module", $module, \PDO::PARAM_STR);

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