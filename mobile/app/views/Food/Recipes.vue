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
              <StackLayout>
                <Label text="PoPoPlan recipes"></Label>
                <!-- <RadCalendar height="1000px" col="0" row="2" /> -->
              </StackLayout>
            </TabViewItem>
            <TabViewItem title="Spooncular">
              <!-- <Spooncular></Spooncular> -->
            </TabViewItem>
            <TabViewItem title="My Recipes">
              <StackLayout>
                <Label text="My created recipes"></Label>
              </StackLayout>
            </TabViewItem>
        </TabView>
    </StackLayout>
    <!-- <GridLayout ~mainContent columns="*" rows="*"> -->
      <!-- <Label text="Pageeeeee"></Label> -->
      <!-- <Label class="message" :text="text" col="0" row="0"/>
    </GridLayout> -->
  </Page>
</template>

<script>
import sideDrawer from '~/mixins/sideDrawer'
// import Spooncular from './Recipes/Spooncular'

export default {
  mixins: [ sideDrawer ],
  // components: {
  //   Spooncular
  // },
  data () {
    return {
      pageTitle: 'Recipes',
      text: 'Hello recipes Page!'
    }
  }
}
</script>