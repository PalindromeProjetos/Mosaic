<?php

namespace Smart\Setup;

class Start {

    private static $pwd = "";
    private static $usr = "root";
    private static $dtb = "bighero";
    private static $tmz = "America/Manaus";
    private static $dns = "mysql:host=localhost;dbname=database";
//    private static $sch = "dbo";
//    private static $dns = "sqlsrv:server=(local);database=SATOR";

    public static function tableSchema() {
        return self::$sch;
    }
    public static function getPassWord() {
        return self::$pwd;
    }
    public static function getUserName() {
        return self::$usr;
    }
    public static function getTimeZone() {
        return self::$tmz;
    }
    public static function getDataBase() {
        return self::$dtb;
    }
    public static function setTimeZone() {
        date_default_timezone_set(self::$tmz);
    }
    public static function getConnnect() {
        return str_replace("database",self::$dtb,self::$dns);
    }

}