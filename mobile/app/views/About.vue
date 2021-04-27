<template>
  <!--
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: app/views/About
    */
  -->
  <Page>
    <ActionBar>
      <GridLayout width="100%" columns="auto, *">
        <Label text="MENU" @tap="openDrawer()" col="0"/>
        <Label class="title" :text="pageTitle"  col="1"/>
      </GridLayout>
    </ActionBar>

    <GridLayout ~mainContent columns="*" rows="*">
      <!-- <Label text="Pageeeeee"></Label> -->
      <Label class="message" :text="text" col="0" row="0"/>
    </GridLayout>
  </Page>
</template>

<script>
import sideDrawer from '~/mixins/sideDrawer'

export default {
  mixins: [ sideDrawer ],
  data () {
    return {
      pageTitle: 'About page',
      text: 'Hello about Page!'
    }
  }
}
</script>