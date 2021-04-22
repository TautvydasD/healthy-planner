<template>
  <Page>
    <ActionBar>
      <GridLayout width="100%" columns="auto, *">
        <Label text="MENU" @tap="openDrawer()" col="0"/>
        <Label class="title" :text="pageTitle"  col="1"/>
        <Label v-if="page === 'private'" col="2" text="Edit" verticalAlignment="center"/>
      </GridLayout>

    </ActionBar>
    
        <StackLayout ~mainContent>
        <TabView android:tabBackgroundColor="#53ba82"
            android:tabTextColor="#c4ffdf"
            android:selectedTabTextColor="#ffffff"
            androidSelectedTabHighlightColor="#ffffff"
            androidTabsPosition="bottom"
          >
            <TabViewItem title="PopoPlan" @tap="() => page='public'">
              <Public></Public>
            </TabViewItem>
            <TabViewItem title="Spooncular" @tap="() => page='spoon'">
              <Spooncular></Spooncular>
            </TabViewItem>
            <TabViewItem title="My Recipes" @tap="() => page='private'">
              <Private></Private>
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
import Public from './Recipes/Public'
import Spooncular from './Recipes/Spooncular'
import Private from './Recipes/Private'
export default {
  mixins: [ sideDrawer ],
  components: {
    Public,
    Spooncular,
    Private
  },
  data () {
    return {
      pageTitle: 'Recipes',
      text: 'Hello recipes Page!',
      page: 'public'
    }
  }
}
</script>