<?php

namespace iContract\Model;

/**
 * 
 * @Entity {"name":"naturalperson", "cache":"\\iContract\\Cache\\naturalperson", "event":"\\iContract\\Event\\naturalperson"}
 */
class naturalperson extends \Smart\Data\Model {

    /**
     * @Policy {"nullable":false}
     * @Column {"description":"", "strategy":"NONE", "type":"integer", "policy":true}
     */
    private $id;

    /**
     * @Policy {"nullable":false, "default":"", "length":15}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $sheetcode;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"date", "policy":true}
     */
    private $birthdate;

    /**
     * @Policy {"nullable":false, "default":"", "length":1}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $gender;

    /**
     * @Policy {"nullable":false, "default":"", "length":80}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $namemother;

    /**
     * @Policy {"nullable":false, "default":"", "length":80}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $namefather;

    /**
     * @Policy {"nullable":false, "default":"A", "length":1}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $status;

    /**
     * @Policy {"nullable":false, "default":"", "length":80}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $nationality;

    /**
     * @Policy {"nullable":false, "default":"", "length":80}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $placebirth;

    /**
     * @Policy {"nullable":false, "default":""}
     * @Column {"description":"", "type":"date", "policy":true}
     */
    private $admissiondate;

    /**
     * @Policy {"nullable":true, "default":"", "length":20}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $voter;

    /**
     * @Policy {"nullable":true, "default":"", "length":20}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $voterzone;

    /**
     * @Policy {"nullable":true, "default":"", "length":20}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $votersection;

    /**
     * @Policy {"nullable":true, "default":""}
     * @Column {"description":"", "type":"date", "policy":true}
     */
    private $voterissuingdate;

    /**
     * @Policy {"nullable":true, "default":"", "length":45}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $pispasep;

    /**
     * @Policy {"nullable":true, "default":"", "length":11}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $cpfnumber;

    /**
     * @Policy {"nullable":true, "default":"", "length":45}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $identnumber;

    /**
     * @Policy {"nullable":true, "default":"", "length":45}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $identissuing;

    /**
     * @Policy {"nullable":true, "default":""}
     * @Column {"description":"", "type":"date", "policy":true}
     */
    private $identissuingdate;

    /**
     * @Policy {"nullable":true, "default":"", "length":2}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $identissuingstate;

    /**
     * @Policy {"nullable":false, "default":"", "length":20}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $crmnumber;

    /**
     * @Policy {"nullable":true, "default":"", "length":2}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $crmissuingstate;

    /**
     * @Policy {"nullable":false, "default":"", "length":3}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $racecolor;

    /**
     * @Policy {"nullable":true, "default":""}
     * @Column {"description":"", "type":"integer", "policy":true}
     */
    private $registrationid;

    /**
     * @Policy {"nullable":true, "default":""}
     * @Column {"description":"", "type":"date", "policy":true}
     */
    private $associationdate;

    /**
     * @Policy {"nullable":true, "default":"", "length":11}
     * @Column {"description":"", "type":"string", "policy":true}
     */
    private $countyregistration;

    /**
     * @return type integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param type $id
     * @return \iContract\Model\naturalperson
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return type string
     */
    public function getSheetcode() {
        return $this->sheetcode;
    }

    /**
     * @param type $sheetcode
     * @return \iContract\Model\naturalperson
     */
    public function setSheetcode($sheetcode) {
        $this->sheetcode = $sheetcode;
        return $this;
    }

    /**
     * @return type date
     */
    public function getBirthdate() {
        return $this->birthdate;
    }

    /**
     * @param type $birthdate
     * @return \iContract\Model\naturalperson
     */
    public function setBirthdate($birthdate) {
        $this->birthdate = $birthdate;
        return $this;
    }

    /**
     * @return type string
     */
    public function getGender() {
        return $this->gender;
    }

    /**
     * @param type $gender
     * @return \iContract\Model\naturalperson
     */
    public function setGender($gender) {
        $this->gender = $gender;
        return $this;
    }

    /**
     * @return type string
     */
    public function getNamemother() {
        return $this->namemother;
    }

    /**
     * @param type $namemother
     * @return \iContract\Model\naturalperson
     */
    public function setNamemother($namemother) {
        $this->namemother = $namemother;
        return $this;
    }

    /**
     * @return type string
     */
    public function getNamefather() {
        return $this->namefather;
    }

    /**
     * @param type $namefather
     * @return \iContract\Model\naturalperson
     */
    public function setNamefather($namefather) {
        $this->namefather = $namefather;
        return $this;
    }

    /**
     * @return type string
     */
    public function getStatus() {
        return $this->status;
    }

    /**
     * @param type $status
     * @return \iContract\Model\naturalperson
     */
    public function setStatus($status) {
        $this->status = $status;
        return $this;
    }

    /**
     * @return type string
     */
    public function getNationality() {
        return $this->nationality;
    }

    /**
     * @param type $nationality
     * @return \iContract\Model\naturalperson
     */
    public function setNationality($nationality) {
        $this->nationality = $nationality;
        return $this;
    }

    /**
     * @return type string
     */
    public function getPlacebirth() {
        return $this->placebirth;
    }

    /**
     * @param type $placebirth
     * @return \iContract\Model\naturalperson
     */
    public function setPlacebirth($placebirth) {
        $this->placebirth = $placebirth;
        return $this;
    }

    /**
     * @return type date
     */
    public function getAdmissiondate() {
        return $this->admissiondate;
    }

    /**
     * @param type $admissiondate
     * @return \iContract\Model\naturalperson
     */
    public function setAdmissiondate($admissiondate) {
        $this->admissiondate = $admissiondate;
        return $this;
    }

    /**
     * @return type string
     */
    public function getVoter() {
        return $this->voter;
    }

    /**
     * @param type $voter
     * @return \iContract\Model\naturalperson
     */
    public function setVoter($voter) {
        $this->voter = $voter;
        return $this;
    }

    /**
     * @return type string
     */
    public function getVoterzone() {
        return $this->voterzone;
    }

    /**
     * @param type $voterzone
     * @return \iContract\Model\naturalperson
     */
    public function setVoterzone($voterzone) {
        $this->voterzone = $voterzone;
        return $this;
    }

    /**
     * @return type string
     */
    public function getVotersection() {
        return $this->votersection;
    }

    /**
     * @param type $votersection
     * @return \iContract\Model\naturalperson
     */
    public function setVotersection($votersection) {
        $this->votersection = $votersection;
        return $this;
    }

    /**
     * @return type date
     */
    public function getVoterissuingdate() {
        return $this->voterissuingdate;
    }

    /**
     * @param type $voterissuingdate
     * @return \iContract\Model\naturalperson
     */
    public function setVoterissuingdate($voterissuingdate) {
        $this->voterissuingdate = $voterissuingdate;
        return $this;
    }

    /**
     * @return type string
     */
    public function getPispasep() {
        return $this->pispasep;
    }

    /**
     * @param type $pispasep
     * @return \iContract\Model\naturalperson
     */
    public function setPispasep($pispasep) {
        $this->pispasep = $pispasep;
        return $this;
    }

    /**
     * @return type string
     */
    public function getCpfnumber() {
        return $this->cpfnumber;
    }

    /**
     * @param type $cpfnumber
     * @return \iContract\Model\naturalperson
     */
    public function setCpfnumber($cpfnumber) {
        $this->cpfnumber = $cpfnumber;
        return $this;
    }

    /**
     * @return type string
     */
    public function getIdentnumber() {
        return $this->identnumber;
    }

    /**
     * @param type $identnumber
     * @return \iContract\Model\naturalperson
     */
    public function setIdentnumber($identnumber) {
        $this->identnumber = $identnumber;
        return $this;
    }

    /**
     * @return type string
     */
    public function getIdentissuing() {
        return $this->identissuing;
    }

    /**
     * @param type $identissuing
     * @return \iContract\Model\naturalperson
     */
    public function setIdentissuing($identissuing) {
        $this->identissuing = $identissuing;
        return $this;
    }

    /**
     * @return type date
     */
    public function getIdentissuingdate() {
        return $this->identissuingdate;
    }

    /**
     * @param type $identissuingdate
     * @return \iContract\Model\naturalperson
     */
    public function setIdentissuingdate($identissuingdate) {
        $this->identissuingdate = $identissuingdate;
        return $this;
    }

    /**
     * @return type string
     */
    public function getIdentissuingstate() {
        return $this->identissuingstate;
    }

    /**
     * @param type $identissuingstate
     * @return \iContract\Model\naturalperson
     */
    public function setIdentissuingstate($identissuingstate) {
        $this->identissuingstate = $identissuingstate;
        return $this;
    }

    /**
     * @return type string
     */
    public function getCrmnumber() {
        return $this->crmnumber;
    }

    /**
     * @param type $crmnumber
     * @return \iContract\Model\naturalperson
     */
    public function setCrmnumber($crmnumber) {
        $this->crmnumber = $crmnumber;
        return $this;
    }

    /**
     * @return type string
     */
    public function getCrmissuingstate() {
        return $this->crmissuingstate;
    }

    /**
     * @param type $crmissuingstate
     * @return \iContract\Model\naturalperson
     */
    public function setCrmissuingstate($crmissuingstate) {
        $this->crmissuingstate = $crmissuingstate;
        return $this;
    }

    /**
     * @return type string
     */
    public function getRacecolor() {
        return $this->racecolor;
    }

    /**
     * @param type $racecolor
     * @return \iContract\Model\naturalperson
     */
    public function setRacecolor($racecolor) {
        $this->racecolor = $racecolor;
        return $this;
    }

    /**
     * @return type integer
     */
    public function getRegistrationid() {
        return $this->registrationid;
    }

    /**
     * @param type $registrationid
     * @return \iContract\Model\naturalperson
     */
    public function setRegistrationid($registrationid) {
        $this->registrationid = $registrationid;
        return $this;
    }

    /**
     * @return type date
     */
    public function getAssociationdate() {
        return $this->associationdate;
    }

    /**
     * @param type $associationdate
     * @return \iContract\Model\naturalperson
     */
    public function setAssociationdate($associationdate) {
        $this->associationdate = $associationdate;
        return $this;
    }

    /**
     * @return type string
     */
    public function getCountyregistration() {
        return $this->countyregistration;
    }

    /**
     * @param type $countyregistration
     * @return \iContract\Model\naturalperson
     */
    public function setCountyregistration($countyregistration) {
        $this->countyregistration = $countyregistration;
        return $this;
    }

}