<?php

namespace iContract\Cache;

use iContract\Model\menu as Model;

class menu extends \Smart\Data\Cache {

    public function selectMenuTree(array $data) {
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                mn.id,
                coalesce(mn.parentid, 10000 + mm.moduleid) as parentid,
                mn.name,
                mn.router,
                mm.isactive,
                mn.glyph,
                case coalesce(length(mn.router),0) when 0 then 0 else 1 end as leaf
            from
                menu mn
                inner join modulemenu mm on ( mm.menuid = mn.id )
                inner join module md on ( md.id = mm.moduleid )
			where md.name = 'iContract'

            union all

            select
                10000 + md.id as id,
                null as parentid,
                md.name,
                null as router,
                md.isactive,
                md.glyph,
                0 as leaf
            from
                module md
            where md.name = 'iContract'

            order by 2, 1";

        try {

            $rows = $proxy->query($sql)->fetchAll();
            $root = self::buildNode($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
            return self::getResultToJson();
        }

        return self::arrayToJson($root);
    }

}