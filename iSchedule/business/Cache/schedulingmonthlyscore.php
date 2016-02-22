<?php

namespace iSchedule\Cache;

use iSchedule\Model\schedulingmonthlyscore as Model;

class schedulingmonthlyscore extends \Smart\Data\Cache {

    private $sqlMaster = "
        select
            tp.id,
            n.shortname as naturalperson,
            tp.shift,
            '000' as scoretype
        from
            schedulingmonthly sm
            inner join schedulingmonthlypartners tp on ( tp.schedulingmonthlyid = sm.id )
            inner join person n on ( n.id = tp.naturalpersonid )
        where sm.dutydate = :datescore
          and tp.subunit = :subunit
          and sm.contractorunitid = :contractorunitid
        order by tp.shift, tp.position";

    private $sqlDetail = "
        select
            s.id,
            n.shortname as naturalperson,
            tp.shift,
            case s.scoretype
                when 'R' then '001'
                when 'P' then '002'
            end as scoretype,
            s.schedulingmonthlypartnersid
        from
            schedulingmonthlyscore s
            inner join person n on ( n.id = s.naturalpersonid )
            inner join schedulingmonthlypartners tp on ( tp.id = s.schedulingmonthlypartnersid )
            inner join schedulingmonthly sm on ( sm.id = tp.schedulingmonthlyid )
        where sm.dutydate = :datescore
          and tp.subunit = :subunit
          and sm.contractorunitid = :contractorunitid
        order by s.schedulingmonthlypartnersid, tp.shift, tp.position";

    public function selectCode(array $data) {
        $query = $data['query'];
        $scoretype = $data['scoretype'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                smc.id,
                smc.schedulingmonthlypartnersid,
                smc.naturalpersonid,
                p.shortname as naturalperson,
                smc.scoretype,
                smc.changedate,
                smc.username,
                smc.observation,
                smc.dutyfraction
            from
                schedulingmonthlyscore smc
                inner join person p on ( p.id = smc.naturalpersonid )
            where smc.schedulingmonthlypartnersid = :id
              and smc.scoretype = :scoretype";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":id", $query, \PDO::PARAM_INT);
            $pdo->bindValue(":scoretype", $scoretype, \PDO::PARAM_STR);

            $pdo->execute();
            $rows = $pdo->fetchAll();

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectDate(array $data) {
        $i = 1;
        $j = 0;
        $d = 0;
        $n = 0;
        $list = array();
        $proxy = $this->getStore()->getProxy();

        $contractorunitid = $data['contractorunitid'];
        $datescore = $data['datescore'];
        $subunit = $data['subunit'];

        try {

            $pdo = $proxy->prepare($this->sqlMaster);

            $pdo->bindValue(":contractorunitid", $contractorunitid, \PDO::PARAM_INT);
            $pdo->bindValue(":datescore", $datescore, \PDO::PARAM_STR);
            $pdo->bindValue(":subunit", $subunit, \PDO::PARAM_STR);

            $pdo->execute();
            $rows = self::encodeUTF8($pdo->fetchAll());

            foreach($rows as $item) {

                if($item['shift'] == 'D') {
                    $list[$d]['idshiftd'] = $item['id'];
                    $list[$d]['shiftd'] = $item['naturalperson'];
                    $d++;
                }

                if($item['shift'] == 'N') {
                    $list[$n]['idshiftn'] = $item['id'];
                    $list[$n]['shiftn'] = $item['naturalperson'];
                    $n++;
                }

                $list[$j]['id'] = $i;

                $j++;
                $i++;
            }

            self::_setRows($list);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

}