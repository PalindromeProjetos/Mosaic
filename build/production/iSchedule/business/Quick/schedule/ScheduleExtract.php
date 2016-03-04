<?php

namespace iSchedule\Quick\schedule;

use Smart\Utils\Report;
use Smart\Utils\Session;
use Smart\Data\Proxy;
use Smart\Setup\Start;

class ScheduleExtract extends Report {

    private $proxy;

    private $sizeColumns = array(30,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15);

    public function preConstruct() {

        $this->post = (object) self::decodeUTF8($_REQUEST);

        $this->periodof = $this->post->periodof;
        $this->periodto = $this->post->periodto;
        $this->naturalperson = $this->post->naturalperson;

        $this->dayweek = array(
            'Sun'=>'Domingo',
            'Mon'=>'Segunda-Feira',
            'Tue'=>'Terça-Feira',
            'Wed'=>'Quarta-Feira',
            'Thu'=>'Quinta-Feira',
            'Fri'=>'Sexta-Feira',
            'Sat'=>'Sábado'
        );

        $this->unitexclud = $this->post->unitexclud;


        if (empty($this->naturalperson) ) {
            $this->individual = ' ';
        } else {
            $this->individual = " and a.naturalpersonid = $this->naturalperson ";
        }

        //Exclusoe
        if (empty($this->unitexclud) ) {
            $unitexclud = ' ';
        } else {
            $unitexclud = " and e.id not in ( ".str_replace(array("[","]"),"",$this->unitexclud)." ) ";
        }

        Start::setTimeZone();
        $this->proxy = new Proxy(array(Start::getConnnect(), Start::getUserName(), Start::getPassWord()));

        $this->sizeColumns = self::scaleCalc(array_sum($this->sizeColumns),297,$this->sizeColumns);
        $this->setTotalSizeColums();

        $sql = "select a.*,b.*,d.*,upper(c.name) as name,c.shortname,c.shortname as realpag,f.shortname as previsto,e.quickname from
                ( select  a.schedulingmonthlypartnersid, a.naturalpersonid,
                coalesce(sum(case when a.scoretype = 'R' then a.naturalpersonid end), 0) as ColabReal,
                coalesce(sum(case when a.scoretype = 'P' then a.naturalpersonid end), 0) as ColabPago,
                coalesce(sum(case when a.scoretype = 'R' then a.dutyfraction end), 0) as QtdeReal,
                coalesce(sum(case when a.scoretype = 'P' then a.dutyfraction end), 0) as QtdePago
                from schedulingmonthlyscore a
                group by a.schedulingmonthlypartnersid, a.naturalpersonid
                ) a
                inner join schedulingmonthlypartners b on b.id = a.schedulingmonthlypartnersid
                inner join person c on c.id = a.ColabPago and c.typeperson = 'N'
                inner join schedulingmonthly d on d.id = b.schedulingmonthlyid
                inner join contractorunit e on e.id = d.contractorunitid $unitexclud
                inner join person f on f.id = b.naturalpersonid and f.typeperson = 'N'
                where d.dutydate between '$this->periodof' and '$this->periodto'
                __individual__
                order by realpag, d.dutydate , d.contractorunitid,b.shift -- , a.scoretype
                ";
        $strrepl = str_replace("__individual__", $this->individual, $sql );
        $this->rows = $this->proxy->query( $strrepl  )->fetchAll();

        $sql = "select  a.naturalpersonid,e.quickname, sum(b.shifthours) as hours, sum(a.dutyfraction) as shifts from schedulingmonthlyscore a
                inner join schedulingmonthlypartners b on b.id = a.schedulingmonthlypartnersid
                inner join person c on c.id = a.naturalpersonid and c.typeperson = 'N'
                inner join schedulingmonthly d on d.id = b.schedulingmonthlyid
                inner join contractorunit e on e.id = d.contractorunitid $unitexclud
                inner join person f on f.id = b.naturalpersonid and f.typeperson = 'N'
                where d.dutydate between '$this->periodof' and '$this->periodto'
                 __individual__
                and a.scoretype = 'P'
                group by a.naturalpersonid,e.quickname";

        $strrepl = str_replace("__individual__", $this->individual, $sql );
        $this->rowsUnits = $this->proxy->query( $strrepl )->fetchAll();

    }

    public function posConstruct() {
        $this->AliasNbPages();
        $this->AddPage();
        $this->Detail();
        $this->Output("ExtratoIndividual.pdf", "I");
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
        $this->setFont('Arial','B',9);

        $this->Cell($this->sizeColumns[0]+$this->sizeColumns[1]+($this->sizeColumns[0]*3),6,utf8_decode('Extrato de Platoes Medicos') ,0,1,'L',0);
        $this->Cell($this->sizeColumns[0]+$this->sizeColumns[1]+($this->sizeColumns[0]*5),6,utf8_decode('(Informações Extraidas da Lista de Frequênica)') ,0,0,'L',0);
        $this->Cell(55,6,$date ,0,1,'R',0);

    }

    function Detail() {
        $lineColor = 1;//($lineColor == 0) ? 1 : 0;

        $data = $this->rows;

        $resultArray = Array();
        $lastCoop = '';
        $lastNatId = '';

        $totalSoma = 0.00;
        $totalGeral = array_fill(0, 25, '');

        $k = 0;

        $this->configStyleDetail(8);

        $totalSoma = 0.00;
        $totalCargaHora = 0.00;

        foreach($data as $record) {
            $bord = 0;

            if ($lastCoop != $record['realpag'] ) {

                if ( $lastCoop != '') {

                    $this->Cell(15*4, 4,'', 'T', 0, 'L', $lineColor);
                    $this->Cell( (15*5)+5+5, 4,utf8_decode('Total de Plantões do Cooperado: '), 'T', 0, 'L', $lineColor);
                    $this->Cell(15, 4,$totalCargaHora, 'T', 0, 'C', $lineColor);
                    $this->Cell(15, 4,$totalCargaHora, 'T', 0, 'C', $lineColor);
                    $this->Cell(15, 4,$totalSoma, 'T', 1, 'R', $lineColor);

                    $totalSoma = 0.00;
                    $totalCargaHora = 0.00;

                    $dataUnits = self::searchArray($this->rowsUnits,'naturalpersonid',$lastNatId);


                    $lineColor1 = 0;
                    $this->Cell(190, 2, '' ,$bord, 1, 'L', 0 );
                    $this->Cell(190, 6, utf8_decode('TOTAIS POR UNIDADE DE PLANTÃO') ,$bord, 1, 'C', 1 );
                    $totalSomaUnits = 0.00;
                    $totalCargaHoraUnits = 0.00;
                    foreach($dataUnits as $record1 ) {
                        if ((float)$record1['shifts']) {
                            $this->Cell(60+5, 4, '' , 0, 0, 'L', $lineColor1);
                            $this->Cell(20, 4,$record1['quickname']  , 0, 0, 'L', $lineColor1);
                            $this->Cell(75, 4, '' , 0, 0, 'L', $lineColor1);
                            $this->Cell(15, 4,$record1['hours']  , 0, 0, 'C', $lineColor1);
                            $this->Cell(15, 4,$record1['shifts']  , 0, 1, 'R', $lineColor1);
                            $totalSomaUnits = bcadd((float)$totalSomaUnits,(float)$record1['shifts'],2) ;
                            $totalCargaHoraUnits = bcadd((float)$totalCargaHoraUnits,(float)$record1['hours'],0) ;
                        }

                    }
                    //$lineColor1 = ($lineColor1 == 0) ? 1 : 0;
                    $this->Cell(60+20+75+5, 4, '' , 0, 0, 'L', $lineColor1);
                    $this->Cell(15, 4,$totalCargaHoraUnits  , 'T', 0, 'C', $lineColor1);
                    $this->Cell(15, 4,$totalSomaUnits  , 'T', 1, 'R', $lineColor1);


                    $this->AddPage();
                }
                $this->SetFont('Arial','',9);
                $this->SetFillColor(153,153,153);
                $this->Cell(190, 8, $record['name'] ,$bord, 1, 'L', 1 ); //Cooperado
                $lastCoop = $record['shortname'];
                $lastNatId = $record['ColabPago'];
                $this->configStyleDetail(8);

                $this->Cell(20, 4, 'Data' , 'LRTB', 0, 'L', 0);
                $this->Cell(20+5, 4, 'Dia Semana' , 'LRTB', 0, 'L', 0);
                $this->Cell(20, 4, utf8_decode('Horário') , 'LRTB', 0, 'L', 0);
                //$this->Cell(20, 4, 'Score'  , 'LRTB', 0, 'L', 0);
                $this->Cell(20, 4, 'Unidade'  , 'LRTB', 0, 'L', 0);
                $this->Cell(30, 4, 'Cooperado'  , 'LRTB', 0, 'L', 0);
                $this->Cell(30, 4, 'Original'  , 'LRTB', 0, 'L', 0);
                $this->Cell(15, 4,'CH-Def'  , 'LRTB', 0, 'C', 0);
                $this->Cell(15, 4,'CH-Real'  , 'LRTB', 0, 'C', 0);
                $this->Cell(15, 4,'Qtde'  , 'LRTB', 1, 'R', 0);
            }

            if ((float)$record['QtdePago'] > 0.00) {
                $lineColor = ($lineColor == 0) ? 1 : 0;

                $data = new \DateTime($record['dutydate']);

                $horario = ( $record['shift'] == 'D') ? '07:00 19:00' : '19:00 07:00' ;

                $this->Cell(20, 4, $data->format("d/m/Y") , 0, 0, 'L', $lineColor);
                //$this->Cell(20+5, 4, $data->format("l") , 0, 0, 'L', $lineColor);
                $this->Cell(20+5, 4,  utf8_decode($this->dayweek[ strftime('%a',strtotime($record['dutydate']))]) , 0, 0, 'L', $lineColor);
                $this->Cell(20, 4, $horario  , 0, 0, 'L', $lineColor);
                $this->Cell(20, 4,$record['quickname']  , 0, 0, 'L', $lineColor);
                $this->Cell(30, 4,$record['realpag']  , 0, 0, 'L', $lineColor);
                $this->Cell(30, 4,$record['previsto']  , 0, 0, 'L', $lineColor);
                $this->Cell(15, 4,$record['shifthours']  , 0, 0, 'C', $lineColor);
                $this->Cell(15, 4,$record['shifthours']  , 0, 0, 'C', $lineColor);
                $this->Cell(15, 4,$record['QtdePago']  , 0, 1, 'R', $lineColor);

                $totalSoma = bcadd((float)$totalSoma,(float)$record['QtdePago'],2) ;
                $totalCargaHora = bcadd((float)$totalCargaHora,(float)$record['shifthours'],0) ;
            }

        };

        if ( $lastCoop != '') {
            $this->Cell(15*4, 4,'', 'T', 0, 'L', $lineColor);
            $this->Cell( (15*5)+5+5, 4,utf8_decode('Total de Plantões do Cooperado: '), 'T', 0, 'L', $lineColor);
            $this->Cell(15, 4,$totalCargaHora, 'T', 0, 'C', $lineColor);
            $this->Cell(15, 4,$totalCargaHora, 'T', 0, 'C', $lineColor);
            $this->Cell(15, 4,$totalSoma, 'T', 1, 'R', $lineColor);

            $dataUnits = self::searchArray($this->rowsUnits,'naturalpersonid',$lastNatId);

            $lineColor1 = 0;
            $this->Cell(190, 2, '' ,$bord, 1, 'L', 0 );
            $this->Cell(190, 6, utf8_decode('TOTAIS POR UNIDADE DE PLANTÃO') ,$bord, 1, 'C', 1 );
            $totalSomaUnits = 0.00;
            $totalCargaHoraUnits = 0.00;
            foreach($dataUnits as $record1 ) {
                if ((float)$record1['shifts']) {
                    $this->Cell(60+5, 4, '' , 0, 0, 'L', $lineColor1);
                    $this->Cell(20, 4,$record1['quickname']  , 0, 0, 'L', $lineColor1);
                    $this->Cell(75, 4, '' , 0, 0, 'L', $lineColor1);
                    $this->Cell(15, 4,$record1['hours']  , 0, 0, 'C', $lineColor1);
                    $this->Cell(15, 4,$record1['shifts']  , 0, 1, 'R', $lineColor1);
                    $totalSomaUnits = bcadd((float)$totalSomaUnits,(float)$record1['shifts'],2) ;
                    $totalCargaHoraUnits = bcadd((float)$totalCargaHoraUnits,(float)$record1['hours'],0) ;
                }
            }
            $this->Cell(60+20+75+5, 4, '' , 0, 0, 'L', $lineColor1);
            $this->Cell(15, 4,$totalCargaHoraUnits  , 'T', 0, 'C', $lineColor1);
            $this->Cell(15, 4,$totalSomaUnits  , 'T', 1, 'R', $lineColor1);
        }

    }

    function Footer(){
        $this->configStyleFooter();
        $this->loadFooter($this->totalSizeColums);
    }

}