<?php

namespace iSchedule\Quick\schedule;

use Smart\Data\Proxy;
use Smart\Setup\Start;
use Smart\Utils\Report;
use Smart\Utils\Session;

class SheetFrequency extends Report {

    private $proxy;

    private $sizeColumns = array(30,30,4,30,30,30,4,30);

    private function setTableSchedule ($period, $sql) {
        $list = array("P", "C", "E");

        $rows = $this->proxy->query("select status from schedulingperiod where id = $period")->fetchAll();
        $currentRecord = array();

        $status = $rows[0]['status'];

        $tablename = (in_array($status, $list)) ? 'schedulingmonthlypartners' : 'tmp_turningmonthly';

        return str_replace("_tablename_", $tablename, $sql);
    }

    public function preConstruct() {


        $this->post = (object) self::decodeUTF8($_REQUEST);

        $dateof = $this->post->dateof;
        $dateto = $this->post->dateto;

        $this->showlabel = $this->post->showlabel;

        //   $status = $this->post->status;
        $periodid = $this->post->periodid;
        $contractorunitid = $this->post->contractorunitid;
        $subunit = isset($this->post->subunit) ? $this->post->subunit : 'P';

        $this->proxy = new Proxy(array(Start::getConnnect(), Start::getUserName(), Start::getPassWord()));

        $this->sizeColumns = self::scaleCalc(array_sum($this->sizeColumns),190,$this->sizeColumns);
        $this->setTotalSizeColums();

        $sql = "
            select
                sp.periodof,
                sp.periodto,
                sm.dutydate,
                c.name as contractorunit,
                c.shortname as unit_shortname,
                n.shortname as naturalperson,
                tp.shift,
                tp.subunit,
                getLegalEntityFileData(c.id) as legalentityfiledata
            from
                schedulingmonthly sm
                inner join schedulingperiod sp on ( sp.id = sm.schedulingperiodid )
                inner join _tablename_ tp on ( tp.schedulingmonthlyid = sm.id  and tp.allocationschema not in ('014'))
                inner join person c on ( c.id = sm.contractorunitid )
                left join person n on ( n.id = tp.naturalpersonid )
            where sp.id = :periodid
              and sm.contractorunitid = :contractorunitid
              and tp.naturalpersonid is not null
              and tp.subunit = :subunit
              and sm.dutydate between :dateof and :dateto
            order by sm.dutydate, sm.contractorunitid, tp.shift, tp.subunit, tp.position";

        $sql = $this->setTableSchedule($periodid,$sql);

        $pdo = $this->proxy->prepare($sql);

        $pdo->bindValue(":dateof", $dateof, \PDO::PARAM_STR);
        $pdo->bindValue(":dateto", $dateto, \PDO::PARAM_STR);
        $pdo->bindValue(":subunit", $subunit, \PDO::PARAM_STR);
        $pdo->bindValue(":periodid", $periodid, \PDO::PARAM_INT);
        $pdo->bindValue(":contractorunitid", $contractorunitid, \PDO::PARAM_INT);

        $pdo->execute();
        $this->rows = $pdo->fetchAll();
    }

    public function posConstruct() {
        $this->AliasNbPages();
        $this->AddPage();
        $this->Detail();
        $this->AddPage();
        $this->SetObservation();
        $this->Output("SheetFrequency.pdf", "I");
    }

    function SetObservation () {
        $this->configStyleHeader();

        $this->SetLineWidth(0.4);
        $this->SetFont('Arial', 'B', 22);

        $this->Cell(190,4, utf8_decode('Observações'),0,1,'C',false);
        $this->Cell($this->totalSizeColums,6,'','B',1,'C',0);

        $this->configStyleDetail();

        for ($x = 0; $x <= 21; $x++) {
            $this->Cell($this->totalSizeColums,10,'','B',1,'C');
        }
    }

    function SetCoverPage () {
//        print_r($this->post);
//        print_r($rows_local);
//        return false;
        $subunittext = $this->post->subunittext;

        $this->Rect(4, 4, 202, 280, 'D');

        $this->Ln(60);
        $this->SetFont('Arial', 'B', 28);
        $this->Cell(190,36, 'FAVOR CARIMBAR E ASSINAR',0,1,'C',false);
        $this->SetFont('Arial', 'B', 24);
        $this->Cell(190,24, utf8_decode('Folha de Frequência'),0,1,'C',false);

        $legalentityfiledata = $this->rows[0]['legalentityfiledata'];
        $this->Image("../../../../resources/images/appanest/logo$legalentityfiledata.png",60,30,80,20,"PNG");

        $periodof = new \DateTime($this->post->dateof);
        $periodto = new \DateTime($this->post->dateto);

        $this->Ln(10);
        $this->SetFont('Arial', 'B', 14);

        $this->Cell(190,6, $this->rows[0]['contractorunit'] ,0,1,'C',false);
        $this->Ln(1);
        $this->Cell(190,6, '# '.$this->rows[0]['unit_shortname'] .' #' ,0,1,'C',false);
        $this->Ln(1);

        switch ($this->rows[0]['unit_shortname']) {
            case "Francisca Mendes":
                if ( substr($this->post->subunittext,0,5) == 'PLANT') {
                    $this->Cell(190, 6, 'GERAL E VASCULAR', 0, 1, 'C', false);
                } else {
                    $this->Cell(190,6, $this->post->subunittext,0,1,'C',false);
                };
                break;
            default :
                $this->Cell(190,6, $this->post->subunittext,0,1,'C',false);
        };

        $month = $this->translate['monthly'][ strtolower($periodof->format( "M" ))];
        $this->Cell(190,6, $month . $periodof->format( "/Y" ),0,1,'C',false);

        $this->Ln(8);
        $this->SetFont('Arial', 'B', 14);
        $this->Cell(190,6, $periodof->format( "d/m/Y" ) . ' - ' . $periodto->format( "d/m/Y" ),0,1,'C',false);

        if ($this->showlabel == 'true') {
            $this->Ln(16);
            $this->SetFont('Arial', 'B', 22);
            $this->Cell(190,6, 'UNIDADE',0,1,'C',false);
        }

    }

    function setTotalSizeColums() {
        $this->totalSizeColums = array_sum($this->sizeColumns);
    }

    function getHeaderColumns() {

        $columns = array(
            array($this->sizeColumns[0],'Cooperado','L'),
            array($this->sizeColumns[1],'Assinatura','L'),
            array($this->sizeColumns[2],'','C'),
            array($this->sizeColumns[3],'CRM','L'),
            array($this->sizeColumns[4],'Cooperado','L'),
            array($this->sizeColumns[5],'Assinatura','L'),
            array($this->sizeColumns[6],'','C'),
            array($this->sizeColumns[7],'CRM','L')
        );

        return $columns;
    }

    function Header(){

        if($this->PageNo() == 1) {
            $this->SetCoverPage();
            $this->AddPage();
        } else {

            $legalentityfiledata = $this->rows[0]['legalentityfiledata'];
            $this->Image("../../../../resources/images/appanest/logo$legalentityfiledata.png",10,10,35,"PNG");

            $subunittext = $this->post->subunittext;

            switch ($this->rows[0]['unit_shortname']) {
                case "Francisca Mendes":
                    if ( substr($this->post->subunittext,0,5) == 'PLANT') {
                        $contractorunit = $this->rows[0]['contractorunit'] .' - '.'GERAL E VASCULAR';
                    } else {
                        $contractorunit = $this->rows[0]['contractorunit'] .' - '.$this->post->subunittext;
                    };
                    break;
                default :
                    $contractorunit = $this->rows[0]['contractorunit'] .' - '.$this->post->subunittext;
            };

            $periodof = new \DateTime($this->post->dateof);
            $periodto = new \DateTime($this->post->dateto);

            $this->configStyleHeader();

            $this->SetLineWidth(0.4);
            $this->SetFont('Arial', 'B', 14);

            $month = $this->translate['monthly'][ strtolower($periodof->format( "M" ))];
            $this->Cell(190,4, utf8_decode('Folha de Frequência - ') . $month . $periodof->format( "/Y" ),0,1,'C',false);

            $this->Ln(2);
            $this->SetFont('Arial', '', 10);
            $this->Cell(190,4, $contractorunit,0,1,'C',false);
            $this->SetFont('Arial', '', 10);
            $this->Cell(190,6, $periodof->format( "d/m/Y" ) . ' - ' . $periodto->format( "d/m/Y" ),0,1,'C',false);

            $this->configStyleLabelHeader();

        }
    }

    function configHeaderDutyDate () {
        $titleColumn = $this->sizeColumns[0]+$this->sizeColumns[1]+$this->sizeColumns[2]+$this->sizeColumns[3];

        $this->AddFont('Tahoma','B','tahomabd.php');
        //$this->AddFont('Tahoma','');
        $this->SetFont('Tahoma', 'B', 10);
        $this->Cell($this->sizeColumns[0],6,'DIURNO','',0,'C',0);
        $this->Cell($this->sizeColumns[1],6,'PLANTONISTA','',0,'L',0);
        $this->Cell($this->sizeColumns[2],6,'','',0,'C',0);
        $this->Cell($this->sizeColumns[3],6,'PAGAR PARA','',0,'L',0);
        $this->Cell($this->sizeColumns[4],6,'NOTURNO','',0,'C',0);
        $this->Cell($this->sizeColumns[5],6,'PLANTONISTA','',0,'L',0);
        $this->Cell($this->sizeColumns[6],6,'','',0,'C',0);
        $this->Cell($this->sizeColumns[7],6,'PAGAR PARA','',1,'L',0);
    }

    function setDutyDateShift (array $rows) {

//        print_r($rows);
//        return false;

        $data = array();
        $temp = array();
        $uniq = array();

        $i = 0;
        $d = 0;
        $n = 0;
        $j = 0;

        $k = count($rows);

        $rows[$k]['periodof'] = '2015-10-01';
        $rows[$k]['periodto'] = '2015-10-31';
        $datenew = new \DateTime($rows[$k-1]['dutydate']);
        $datenew->modify('+1 day');
        $datetonew = $datenew->format('Y-m-d');
        $rows[$k]['dutydate'] = $datetonew; //'2015-11-01'; //$rows[$k-1]['dutydate'];
        $rows[$k]['contractorunit'] = '';
        $rows[$k]['naturalperson'] = '';
        $rows[$k]['shift'] = 'N';
        $rows[$k]['subunit'] = '000';
        $rows[$k]['unit_shortname'] = '';
        $rows[$k]['legalentityfiledata'] = '';

        foreach($rows as $record) {

            $data[$i]['shift'] = $record['shift'];
            $data[$i]['dutydate'] = $record['dutydate'];
            $data[$i]['naturalperson'] = $record['naturalperson'];
            $data[$i]['unit_shortname'] = $record['unit_shortname'];
            $data[$i]['legalentityfiledata'] = $record['legalentityfiledata'];

            $i++;
            $j++;

            if($j < count($rows)) {

                if( ($record['dutydate'] != $rows[$j]['dutydate'])  ) {

                    foreach($data as $item) {
                        if($item['shift'] == 'D') {
                            $uniq[$d]['dutydate'] = $item['dutydate'];
                            $uniq[$d]['shiftd'] = $item['naturalperson'];
                            $uniq[$d]['unit_shortname'] = $item['unit_shortname'];
                            $uniq[$d]['legalentityfiledata'] = $item['legalentityfiledata'];
                            $d++;
                        }
                        if($item['shift'] == 'N') {
                            $uniq[$n]['dutydate'] = $item['dutydate'];
                            $uniq[$n]['shiftn'] = $item['naturalperson'];
                            $uniq[$n]['unit_shortname'] = $item['unit_shortname'];
                            $uniq[$n]['legalentityfiledata'] = $item['legalentityfiledata'];
                            $n++;
                        };
                    }

                    $temp = array_merge($temp,$uniq);
                    $i = 0;
                    $d = 0;
                    $n = 0;
                    $data = array();
                    $uniq = array();
                };

            };

        }

//        $d = count($temp);
//
//        $temp[$d]['dutydate'] = $GLOBALS['datetonew'] ;
//        $temp[$d]['shiftd'] = '';

        #print_r($temp);

        return $temp;
    }

    function Detail() {
        $data = $this->setDutyDateShift($this->rows);

        $this->configStyleDetail();

        $dutydate = '';

        //print_r($data);
        //return false;


        foreach($data as $record) {

            $this->currentRecord = $record;

            $lineColor = 0; //($lineColor == 0) ? 1 : 0;

            if (isset($record['shiftd'])) {
                if ($record['shiftd'] != '') {

                    if ($dutydate != $record['dutydate'] && $dutydate != '') {
                        $this->Ln(6);
                    };


                    if ($dutydate != $record['dutydate']) {
//                $this->configStyleDetail(9);

                        // $this->AddFont('Tahoma','B','tahoma.php');
                        //$this->SetFont('Arial', 'B', 9);

                        // $this->Cell(0,4,$this->getY());


                        //switch ($this->rows[0]['unit_shortname']) {
                        switch ($this->currentRecord['unit_shortname']) {
                            case "Adriano Jorge":
                            case "HUGV":
                                $aa = 35;
                                break;
                            default :
                                $aa = 10;
                        };


                        if ($this->getY() + $aa > 240) {
                            $this->AddPage();
                        }

                        $this->AddFont('Tahoma', 'B', 'tahomabd.php');
                        $this->SetFont('Tahoma', 'B', 10);

                        $dutydateName = new \DateTime($record['dutydate']);
                        $month = $this->translate['monthly'][strtolower($dutydateName->format("M"))];
                        $day = $dutydateName->format("d");
                        $week = $this->translate['dayweek'][strtolower($dutydateName->format("D"))];

                        $this->Cell(0, 0, '_____________________________________________________________________________________');
                        $this->Ln(4);
                        $this->Cell($this->sizeColumns[0], 4, utf8_decode(mb_strtoupper($week, 'UTF-8')) . ', ' . $day . ' DE ' . utf8_decode(mb_strtoupper($month, 'UTF-8')) . ' DE ' . $dutydateName->format("Y"), 0, 1, 'L', 0);
//                $this->Ln(2);
                        $this->configHeaderDutyDate();
                    }

                    $this->configStyleDetail(4);


                    $this->AddFont('Tahoma', '');
                    $this->SetFont('Tahoma', '', 10);
                    $this->Ln(4);
                    $this->Cell($this->sizeColumns[0], 6, isset($record['shiftd']) ? $record['shiftd'] : '', 0, 0, 'C', $lineColor);
                    $this->Cell($this->sizeColumns[1], 6, '..............................', '', 0, 'L', $lineColor);
                    $this->Cell($this->sizeColumns[2], 6, '', 0, 0, 'C', $lineColor);
                    $this->Cell($this->sizeColumns[3], 6, '..............................', '', 0, 'L', $lineColor);
                    if (isset($record['shiftn'])) {
                        if ($record['shiftn'] != '') {
                            $this->Cell($this->sizeColumns[4], 6, isset($record['shiftn']) ? $record['shiftn'] : '', 0, 0, 'C', $lineColor);
                            $this->Cell($this->sizeColumns[5], 6, '..............................', '', 0, 'L', $lineColor);
                            $this->Cell($this->sizeColumns[6], 6, '', 0, 0, 'C', $lineColor);
                            $this->Cell($this->sizeColumns[7], 6, '..............................', '', 1, 'L', $lineColor);
                        };
                    } else {
                        #$this->Ln(6);
                        $this->Cell($this->sizeColumns[4], 6, '', '', 1, 'L', $lineColor);
                    };
                };
            };

            if (isset($record['dutydate'])) {
                $dutydate = $record['dutydate'];
            }

        };

    }

    function Footer(){
        $this->configStyleFooter();
        $this->loadFooter($this->totalSizeColums);
    }

}