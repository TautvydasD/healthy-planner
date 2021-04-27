<template>
  <!--
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: app/views/Health/Health
    */
  -->
  <Page>
    <ActionBar>
      <GridLayout width="100%" columns="auto, *">
        <Label text="MENU" @tap="openDrawer()" col="0"/>
        <Label class="title" :text="pageTitle"  col="1"/>
      </GridLayout>
    </ActionBar>

    <StackLayout ~mainContent>
        <TabView android:tabBackgroundColor="#53ba82"
            android:tabTextColor="#c4ffdf"
            android:selectedTabTextColor="#ffffff"
            androidSelectedTabHighlightColor="#ffffff"
            androidTabsPosition="bottom"
          >
            <TabViewItem title="Focus">
              <Focus></Focus>
            </TabViewItem>
            <TabViewItem title="test">
              <StackLayout>
                <Label text="testing"></Label>
              </StackLayout>
            </TabViewItem>
            <TabViewItem title="My tes">
              <StackLayout>
                <Label text="Other testing"></Label>
              </StackLayout>
            </TabViewItem>
        </TabView>
    </StackLayout>
  </Page>
</template>

<script>
import sideDrawer from '~/mixins/sideDrawer'
import Focus from './Focus'

export default {
  mixins: [ sideDrawer ],
  components: {
    Focus
  },
  data () {
    return {
      pageTitle: 'Health',
      text: 'Hello health Page!'
    }
  }
}
</script>