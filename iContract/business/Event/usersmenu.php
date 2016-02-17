<?php

namespace iContract\Event;

class usersmenu extends \Smart\Data\Event {

    /**
     * @param \iContract\Model\usersmenu $model
     */
    public function preInsert( \iContract\Model\usersmenu &$model ) {

    }

    /**
     * @param \iContract\Model\usersmenu $model
     */
    public function posInsert( \iContract\Model\usersmenu &$model ) {

    }

    /**
     * @param \iContract\Model\usersmenu $model
     */
    public function preUpdate( \iContract\Model\usersmenu &$model ) {

    }

    /**
     * @param \iContract\Model\usersmenu $model
     */
    public function posUpdate( \iContract\Model\usersmenu &$model ) {

    }

    /**
     * @param \iContract\Model\usersmenu $model
     */
    public function preDelete( \iContract\Model\usersmenu &$model ) {
        /**
         * Remove Permissões de ações de menu antes de remover o acesso ao menu
         */
        $this->setRemoveDependencies($model);
    }

    /**
     * @param \iContract\Model\usersmenu $model
     */
    public function posDelete( \iContract\Model\usersmenu &$model ) {

    }

    /**
     * Remove Permissões de ações de menu
     *
     * @param $model
     */
    public function setRemoveDependencies($model) {
        $id = $model->getId();

        $this->getProxy()->exec("delete from usersmenuaction where usersmenuid = $id");
    }

}