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
            <TabViewItem title="PopoPlan">
              <Public></Public>
                <!-- <GridLayout columns="*" rows="*">
                    <Label class="message" :text="msg" col="0" row="0"/>
                </GridLayout> -->
            </TabViewItem>
            <TabViewItem title="wGer">
              <Wger></Wger>
                <!-- <GridLayout columns="*" rows="*">
                    <Label class="message" text="Tab 2 Content" col="0" row="0"/>
                </GridLayout> -->
            </TabViewItem>
            <TabViewItem title="My Exercises">
              <Private></Private>
                <!-- <GridLayout columns="*" rows="*">
                    <Label class="message" text="Tab 3 Content" col="0" row="0"/>
                </GridLayout> -->
            </TabViewItem>
        </TabView>
      <!-- <BottomNavigation height="400px" selectedIndex="1">
        <TabStrip>
          <TabStripItem>
            <Label text="PopoPlan" /> -->
            <!-- <Image src="" /> -->
          <!-- </TabStripItem>
          <TabStripItem>
            <Label text="wGer" /> -->
            <!-- <Image src="" /> -->
          <!-- </TabStripItem>
          <TabStripItem>
            <Label text="My Exercises" /> -->
            <!-- <Image src="" /> -->
          <!-- </TabStripItem>
        </TabStrip> -->
        <!-- <TabContentItem>
          <Public />
        </TabContentItem> -->
        <!-- <TabContentItem>
          <Wger />
        </TabContentItem>
        <TabContentItem>
          <Public />
        </TabContentItem> -->
            <!-- <TabContentItem class="first-tabcontent">
        <GridLayout>
            <Label text="Home Page" horizontalAlignment="center" verticalAlignment="middle"/> -->
        <!-- </GridLayout>
    </TabContentItem>
    <TabContentItem class="second-tabcontent">
        <GridLayout>
            <Label text="Account Page" horizontalAlignment="center" verticalAlignment="middle"/>
        </GridLayout>
    </TabContentItem>
    <TabContentItem class="third-tabcontent">
        <GridLayout>
            <Label text="Search Page" horizontalAlignment="center" verticalAlignment="middle"/>
        </GridLayout>
    </TabContentItem>
      </BottomNavigation> -->
    </StackLayout>
    <!-- <GridLayout ~mainContent columns="*" rows="*">
      <Label text="Pageeeeee"></Label>
      <Label class="message" :text="text" col="0" row="0"/>
    </GridLayout> -->
  </Page>
</template>

<script>
import sideDrawer from '~/mixins/sideDrawer'
import Public from './Exercises/Public'
import Private from './Exercises/Private'
import Wger from './Exercises/Wger'

export default {
  mixins: [ sideDrawer ],
  components: {
    Public,
    Private,
    Wger
  },
  data () {
    return {
      pageTitle: 'Exercises',
      text: 'Hello exercises Page!'
    }
  }
}
</script>