<template>
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
      pageTitle: 'Workouts',
      text: 'Hello workouts Page!'
    }
  }
}
</script>