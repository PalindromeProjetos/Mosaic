<?php

namespace iSchedule\Quick\schedule;

use Smart\Data\Proxy;
use Smart\Setup\Start;
use Smart\Utils\Report;
use Smart\Utils\Session;

class ScheduleScore extends Report {

    private $proxy;

    private $sizeColumns = array(15,30,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15);

    public function preConstruct() {

        $this->post = (object) self::decodeUTF8($_REQUEST);

        $this->periodof = $this->post->periodof;
        $this->periodto = $this->post->periodto;
        $this->legalentityid = $this->post->legalentityid;
        $this->contractorunitid = $this->post->contractorunitid;
        $this->subunit = $this->post->subunit;

        $this->unitexclud = $this->post->unitexclud;

        $this->subexclud = $this->post->subexclud;

        if (empty($this->legalentityid) ) {
            $this->legalentityid = '06,29';
        }

        if (empty($this->contractorunitid) ) {
            $this->unit = ' ';
        } else {
            $this->unit = " and a.id = $this->contractorunitid ";
        }

        $this->subunitDesc = '(TODOS)';

        switch ($this->subunit) {
            case "000":
                $this->subunitDesc = '(PLANTOES)';
                break;
            case "003":
                $this->subunitDesc = '(CARDIACA)';
                break;
            case "004":
                $this->subunitDesc = '(HEMODINAMICA)';
                break;
            case "005":
                $this->subunitDesc = '(ELETROFISIOLOGIA)';
                break;
        };

        if (empty($this->subunit) ) {
            $this->subunit = ' ';
        } else {
            $this->subunit = " and c.subunit = $this->subunit ";
        }

        //Exclusoe
        if (empty($this->unitexclud) ) {
            $unitexclud = ' ';
        } else {
            $unitexclud = " and a.id not in ( ".str_replace(array("[","]"),"",$this->unitexclud)." ) ";
            $this->subunitDesc = '(C/ EXCLUSOES)';
        }

        if (empty($this->subexclud) ) {
            $subexclud = ' ';
        } else {
            $subexclud = " and c.subunit  not in ( ".str_replace(array("[","]"),"",$this->subexclud)." ) ";
            $this->subunitDesc = '(C/ EXCLUSOES)';
        }

        Start::setTimeZone();
        $this->proxy = new Proxy(array(Start::getConnnect(), Start::getUserName(), Start::getPassWord()));

        $this->sizeColumns = self::scaleCalc(array_sum($this->sizeColumns),318,$this->sizeColumns);
        $this->setTotalSizeColums();

        $sqlUnit = "select id,name,shortname from person where typeperson = 'L' and id in ($this->legalentityid )";
        $this->unitrows = $this->proxy->query($sqlUnit)->fetchAll();


        $sql = "select
         e.shortname as 'Cooperado' , f.crmnumber as 'CRM' , b.contractorunitid as 'unidadeCodigo',g.quickname as 'unidadeNomeCurto', sum(d.dutyfraction) as 'Qtde'
        from person a
        left join schedulingmonthly b on b.contractorunitid = a.id
        inner join schedulingmonthlypartners c on c.schedulingmonthlyid = b.id
        inner join schedulingmonthlyscore d on  d.schedulingmonthlypartnersid = c.id and d.scoretype = 'P'
        inner join person e on e.typeperson = 'N' and e.id = d.naturalpersonid
        inner join naturalperson f on f.id = e.id
        inner join contractorunit g on g.id = a.id
        where a.typeperson = 'U'
        __unit__
        __subunit__

        $unitexclud
        $subexclud

        and a.id in (
            select
                p.id
            from
                contract c
                inner join additive a on ( a.contractid = c.id )
                inner join person p on ( p.parentid = c.contractorid )
            where c.legalentityid in ( __legalentity__ )
			and (   select
                    coalesce(cast(sum(
                        (coalesce(af.amountsun,0)*(s.hours/12)) + (coalesce(af.amountmon,0)*(s.hours/12)) +
                        (coalesce(af.amounttue,0)*(s.hours/12)) + (coalesce(af.amountwed,0)*(s.hours/12)) +
                        (coalesce(af.amountthu,0)*(s.hours/12)) + (coalesce(af.amountfri,0)*(s.hours/12)) + (coalesce(af.amountsat,0)*(s.hours/12))
                    ) as decimal(18,2)),0) as total
                    from
                        additiveshift af,
                        contractorsubunit csu,
                        shifttype s
                    where af.additiveid = a.id
                      and s.id = af.shifttypeid
                      and af.contractorsubunitid = csu.id
                      and csu.contractorunitid = p.id
                      and ((af.amountsun != 0)or(af.amountmon != 0)or(af.amounttue !=0)or(af.amountwed != 0)or(af.amountthu != 0)or(af.amountfri != 0)or(af.amountsat != 0))
            ) > 0
            )
        and b.dutydate between '$this->periodof' and '$this->periodto'
        group by e.shortname, f.crmnumber, b.contractorunitid,g.quickname";

        $strrepl = str_replace("__legalentity__", $this->legalentityid, $sql );
        $strrepl = str_replace("__unit__", $this->unit, $strrepl );
        $strrepl = str_replace("__subunit__", $this->subunit, $strrepl );

        $this->rows = $this->proxy->query( $strrepl  )->fetchAll();

        $sql = "select
             distinct a.id, a.shortname, g.quickname
            from person a
            left join schedulingmonthly b on b.contractorunitid = a.id
            inner join schedulingmonthlypartners c on c.schedulingmonthlyid = b.id
            inner join schedulingmonthlyscore d on  d.schedulingmonthlypartnersid = c.id and d.scoretype = 'P'
            inner join person e on e.typeperson = 'N' and e.id = d.naturalpersonid
            inner join naturalperson f on f.id = e.id
            inner join contractorunit g on g.id = a.id
            where a.typeperson = 'U'
            __unit__
            __subunit__

            $unitexclud
            $subexclud

            and a.id in (
            select
                p.id
            from
                contract c
                inner join additive a on ( a.contractid = c.id )
                inner join person p on ( p.parentid = c.contractorid )
            where c.legalentityid in ( __legalentity__ )
			and (   select
                    coalesce(cast(sum(
                        (coalesce(af.amountsun,0)*(s.hours/12)) + (coalesce(af.amountmon,0)*(s.hours/12)) +
                        (coalesce(af.amounttue,0)*(s.hours/12)) + (coalesce(af.amountwed,0)*(s.hours/12)) +
                        (coalesce(af.amountthu,0)*(s.hours/12)) + (coalesce(af.amountfri,0)*(s.hours/12)) + (coalesce(af.amountsat,0)*(s.hours/12))
                    ) as decimal(18,2)),0) as total
                    from
                        additiveshift af,
                        contractorsubunit csu,
                        shifttype s
                    where af.additiveid = a.id
                      and s.id = af.shifttypeid
                      and af.contractorsubunitid = csu.id
                      and csu.contractorunitid = p.id
                      and ((af.amountsun != 0)or(af.amountmon != 0)or(af.amounttue !=0)or(af.amountwed != 0)or(af.amountthu != 0)or(af.amountfri != 0)or(af.amountsat != 0))
            ) > 0
            )
            and b.dutydate between '$this->periodof' and '$this->periodto'
            order by g.quickname";

        $strrepl = str_replace("__legalentity__", $this->legalentityid, $sql );
        $strrepl = str_replace("__unit__", $this->unit, $strrepl );
        $strrepl = str_replace("__subunit__", $this->subunit, $strrepl );

        $this->rowsUnits = $this->proxy->query( $strrepl )->fetchAll();

        $this->qtyUnits = count($this->rowsUnits);
        $this->unitPosit = array();

    }

    public function posConstruct() {
        $this->AliasNbPages();
        $this->AddPage();
        $this->Detail();
        //$this->AddPage();
        $this->Output("ScheduleScore.pdf", "I");
    }

    function setTotalSizeColums() {
        $this->totalSizeColums = array_sum($this->sizeColumns);
    }

    function getHeaderColumns() {

        $columns = array(
            array($this->sizeColumns[0],'CRM','L'),
            array($this->sizeColumns[1],'Cooperado','L')
        );

        $data = $this->rowsUnits;
        $i = 2;
        $j = 0;
        foreach($data as $record) {
            array_push($columns, array($this->sizeColumns[$i++], $record['quickname'], 'L'));
            $this->unitPosit[$record['quickname']] = $j++;
        }
        array_push($columns, array($this->sizeColumns[$i++], 'Total', 'L'));
        $this->unitPosit['Total'] = $j++;

        return $columns;
    }

    function Header(){

        $date       = date("d/m/Y");
        $this->setFont('Arial','B',10);

        if (count($this->unitrows) > 1) {
            $unitshortname = '( '. substr( $this->unitrows[0]['shortname'],0,3).' | '.substr( $this->unitrows[1]['shortname'],0,3).' )';
        } else {
            $unitshortname = '( '.$this->unitrows[0]['shortname'].' )';
        }

        $this->Cell($this->sizeColumns[0]+$this->sizeColumns[1]+($this->sizeColumns[0]*3),6,utf8_decode('Contagem de Plantões') ,0,0,'L',0);
        $this->Cell( ($this->sizeColumns[0]*8) ,6,'Periodo: '.$this->periodof.' ~ '.$this->periodto ,0,0,'L',0);
        $this->Cell( ($this->sizeColumns[0]*4) ,6,$unitshortname ,0,0,'L',0);

        $this->Cell(($this->sizeColumns[0]*4),6,$this->subunitDesc ,0,0,'R',0);

        $this->Cell(($this->sizeColumns[0]*4),6,$date ,0,1,'R',0);

        $this->loadLabel($this->getHeaderColumns(),5);
    }

    function Detail() {
        $lineColor = 1;//($lineColor == 0) ? 1 : 0;

        $data = $this->rows;

        $resultArray = Array();
        $lastCoop = '';

        $totalSoma = 0.00;
        $totalGeral = array_fill(0, 25, '');

        $k = 0;

        foreach($data as $record) {
            if ($record['Cooperado'] != $lastCoop ) {
                if ($lastCoop != '') {
                    $resultArray[$k-1][2][ $this->unitPosit[ 'Total' ] ] = $totalSoma;
                    $totalGeral[ $this->unitPosit[ 'Total' ] ] = bcadd($totalGeral[ $this->unitPosit[ 'Total' ] ], $totalSoma,2);
                }
                array_push($resultArray, array($record['Cooperado'],$record['CRM'],array_fill(0, 25, '')));
                $lastCoop = $record['Cooperado'];
                $totalSoma = 0.00;
            }
            $k = count($resultArray);
            $resultArray[$k-1][2][ $this->unitPosit[ $record['unidadeNomeCurto'] ] ] = $record['Qtde'];
            $totalSoma = bcadd((float)$totalSoma,(float)$record['Qtde'],2) ;

            $totalGeral[ $this->unitPosit[ $record['unidadeNomeCurto'] ] ] =  bcadd((float)$totalGeral[ $this->unitPosit[ $record['unidadeNomeCurto'] ] ],(float)$record['Qtde'],2) ;

        }
        if ($lastCoop != '') {
            $resultArray[$k-1][2][ $this->unitPosit[ 'Total' ] ] = $totalSoma;
            $totalGeral[ $this->unitPosit[ 'Total' ] ] = bcadd($totalGeral[ $this->unitPosit[ 'Total' ] ], $totalSoma,2);
        }


        $this->configStyleDetail();

        foreach($resultArray as $record) {

            if ( ($this->getY() > 179 ) ) {
                $bord = 'LRB';
            } else {
                $bord = 'LR';
            }

            $lineColor = ($lineColor == 0) ? 1 : 0;
            $this->Cell($this->sizeColumns[0], 6,$record[1] , $bord, 0, 'L', $lineColor); //CRM
            $this->Cell($this->sizeColumns[1], 6,$record[0]  ,$bord, 0, 'L', $lineColor); //Cooperado

            for ($x = 0; $x <= $this->qtyUnits; $x++) {
                if ($x != $this->qtyUnits) {
                    $this->Cell($this->sizeColumns[$x+2], 6,  $record[2][$x] , $bord, 0, 'C', $lineColor);
                } else {
                    $this->setFont("",'B',8);
                    $this->Cell($this->sizeColumns[$x+2], 6, $record[2][$x] , $bord, 1, 'R', $lineColor);
                    $this->setFont('','',6);
                }
                //$this->Cell(0, 6, $this->getY() , 0, 0, 'C', 0);
            }
            $bord = 'LR';
        };

        //Total Geral
        $lineColor = !$lineColor;
        $this->setFont("",'B',8);
        $this->Cell($this->sizeColumns[0], 6,'' , 1, 0, 'L', $lineColor);
        $this->Cell($this->sizeColumns[1], 6,'Total Geral:'  ,1, 0, 'l', $lineColor);

        for ($x = 0; $x <= $this->qtyUnits; $x++) {
            $this->Cell($this->sizeColumns[$x+2], 6, $totalGeral[$x] , 1, 0, 'C', $lineColor);
        }
        $this->setFont('','',6);
    }

    function Footer(){
        $this->configStyleFooter();
        $this->loadFooter($this->totalSizeColums);
    }

}