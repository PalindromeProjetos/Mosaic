<?php

namespace iSchedule\Cache;

use iSchedule\Model\schedulingmonthlyscore as Model;

class schedulingmonthlyscore extends \Smart\Data\Cache {

    private $tblMaster;

    private $tblDetail;

    private $sqlMaster = "
        select
            tp.id,
            n.shortname as naturalperson,
            tp.shift
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
            s.scoretype,
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

    public function selectPlan (array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                tp.*,
                n.shortname as naturalperson,
                c.shortname as contractorunit,
                getEnum('subunit',tp.subunit) as subunitdescription
            from
                schedulingmonthlypartners tp
                inner join schedulingmonthly sm on ( tp.schedulingmonthlyid = sm.id )
                inner join person n on ( n.id = tp.naturalpersonid )
                inner join person c on ( c.id = sm.contractorunitid )
            where tp.id = :id";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":id", $query, \PDO::PARAM_INT);

            $pdo->execute();
            $rows = self::encodeUTF8($pdo->fetchAll());

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectItem (array $data) {
        $query = $data['query'];
        $proxy = $this->getStore()->getProxy();

        $sql = "
            select
                tp.naturalpersonid,
                n.shortname as naturalpersonshift,
                tp.shift,
                tp.shifthours,
                tp.releasetype,
                tp.observation,
                tp.id as schedulingmonthlypartnersid,
                tp.username
            from
                schedulingmonthlypartners tp
                inner join person n on ( n.id = tp.naturalpersonid )
            where tp.id = :id";

        try {
            $pdo = $proxy->prepare($sql);

            $pdo->bindValue(":id", $query, \PDO::PARAM_INT);

            $pdo->execute();
            $rows = self::encodeUTF8($pdo->fetchAll());

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function createData (array $data) {

        $proxy = $this->getStore()->getProxy();

        $contractorunitid = $data['contractorunitid'];
        $datescore = $data['datescore'];
        $subunit = $data['subunit'];

        try {

            // tblMaster
            $pdo = $proxy->prepare($this->sqlMaster);
            $pdo->bindValue(":contractorunitid", $contractorunitid, \PDO::PARAM_INT);
            $pdo->bindValue(":datescore", $datescore, \PDO::PARAM_STR);
            $pdo->bindValue(":subunit", $subunit, \PDO::PARAM_STR);

            $pdo->execute();
            $this->tblMaster = self::encodeUTF8($pdo->fetchAll());

            // tblDetail
            $pdo = $proxy->prepare($this->sqlDetail);
            $pdo->bindValue(":contractorunitid", $contractorunitid, \PDO::PARAM_INT);
            $pdo->bindValue(":datescore", $datescore, \PDO::PARAM_STR);
            $pdo->bindValue(":subunit", $subunit, \PDO::PARAM_STR);

            $pdo->execute();
            $this->tblDetail = self::encodeUTF8($pdo->fetchAll());

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResult();

    }

    public function selectCode (array $data) {
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
            $rows = self::encodeUTF8($pdo->fetchAll());

            self::_setRows($rows);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectDate (array $data) {
        $i = 1;
        $d = 0;
        $n = 0;
        $k = 0;
        $list = array();

        $this->createData($data);

        try {

            $master = $this->tblMaster;

            foreach($master as $item) {
                if($item['shift'] == 'D') {
                    $k = $d;
                }
                if($item['shift'] == 'N') {
                    $k = $n;
                }

                $shift = strtolower($item['shift']);

                $list[$k]["idshift$shift"] = $item['id'];
                $list[$k]["shift$shift"] = $item['naturalperson'];
                $list[$k]["shift$shift".'r'] = $this->selectList($item,'R');
                $list[$k]["shift$shift".'p'] = $this->selectList($item,'P');
                $k++;

                if($item['shift'] == 'D') {
                    $d = $k;
                }
                if($item['shift'] == 'N') {
                    $n = $k;
                }

                $list[count($list)-1]['id'] = $i;

                $i++;
            }

            self::_setRows($list);

        } catch ( \PDOException $e ) {
            self::_setSuccess(false);
            self::_setText($e->getMessage());
        }

        return self::getResultToJson();
    }

    public function selectList ($item,$type) {
        $id = $item['id'];
        $shift = $item['shift'];
        $detail = $this->tblDetail;

        $detail = self::searchArray($detail,'shift',$shift);
        $detail = self::searchArray($detail,'scoretype',$type);
        $detail = self::searchArray($detail,'schedulingmonthlypartnersid',$id);
        $detail = self::selectArray($detail,'naturalperson');

        return trim(implode(', ', $detail));
    }

}