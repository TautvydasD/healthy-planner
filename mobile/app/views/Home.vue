<template>
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
            <TabViewItem title="Calendar">
              <StackLayout>
                <RadCalendar height="1000px" col="0" row="2" />
              </StackLayout>
            </TabViewItem>
            <TabViewItem title="Activities">
              <Activity></Activity>
              <!-- <StackLayout>
                <Label text="Activity list"></Label>
              </StackLayout> -->
            </TabViewItem>
            <!-- <TabViewItem title="My tes">
              <StackLayout>
              </StackLayout>
            </TabViewItem> -->
        </TabView>
    </StackLayout>
    <!-- <GridLayout ~mainContent columns="*" rows="*">
      <Label class="message" :text="text" col="0" row="0"/>
      <Label class="message" :text="'testing'" col="0" row="1"/>
    </GridLayout> -->
  </Page>
</template>

<script>
import sideDrawer from '~/mixins/sideDrawer'
import Activity from './Activity'

export default {
  mixins: [ sideDrawer ],
  components: {
    Activity
  },
  data () {
    return {
      pageTitle: 'HOME',
      text: 'Hello home Page!'
    }
  },
  created () {
    if (!this.$store.state.token) {
      this.$navigateTo(this.$routes.login, { clearHistory: true })
    }
  }
}
</script>