<template>
  <!--
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: app/views/Home
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
            <TabViewItem title="Calendar">
              <StackLayout>
                <RadCalendar
                  eventsViewMode="Popover"
                  col="0"
                  row="2"
                  @dateSelected="onDateSelected" 
                  @dateDeselected="onDateDeselected" 
                  @navigatedToDate="onNavigatedToDate"
                  @navigatingToDateStarted="onNavigatingToDateStarted" 
                  @viewModeChanged="onViewModeChanged"
                />
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
import { Color } from 'color'
import DayPage from './DayPage'

export default {
  mixins: [ sideDrawer ],
  components: {
    Activity
  },
  data () {
    return {
      pageTitle: 'HOME',
      text: 'Hello home Page!',
      calendarEvents: []
    }
  },
  created () {
    // if (!this.$store.state.token) {
    //   this.$navigateTo(this.$routes.login, { clearHistory: true })
    // }
    this.createEvents()
  },
  methods: {
    createEvents () {
          // Creating dummy events
    // let events = [];
    // let now = new Date();
    // let startDate;
    // let endDate;
    // let event;
    // let colors = [new Color(200, 188, 26, 214), new Color(220, 255, 109, 130), new Color(255, 55, 45, 255), new Color(199, 17, 227, 10), new Color(255, 255, 54, 3)];
    // for (let i = 1; i < 10; i++) {
    //   startDate = new Date(now.getFullYear(), now.getMonth(), i * 2, 1);
    //   endDate = new Date(now.getFullYear(), now.getMonth(), (i * 2), 3);
    //   // event = new this.$CalendarView.CalendarEvent("event " + i, startDate, endDate, false, colors[i * 10 % (colors.length - 1)]);
    //   // events.push(event);
    //   if (i % 3 == 0) {
    //     // event = new this.$CalendarView.CalendarEvent("second " + i, startDate, endDate, true, colors[i * 5 % (colors.length - 1)]);
    //     events.push(event);
    //   }
    // }
    // this.calendarEvents = events;
    },
    onDateSelected(args) {
      console.log('onDateSelected')
      for (const [key, value] of Object.entries(args)) {
        console.log("key: " + key + "; value: " + value);
      }
      this.$navigateTo(DayPage, {
        transition: "slideTop",
        backstackVisible: false,
        props: {date: this.getTime(args.date)}
      })
    },

    onDateDeselected(args) {
      console.log("onDateDeselected: " + args.date);
      for (const [key, value] of Object.entries(args)) {
        console.log("key: " + key + "; value: " + value);
      }
    },

    onNavigatedToDate(args) {
      console.log("onNavigatedToDate: " + args.date);
      for (const [key, value] of Object.entries(args)) {
        console.log("key: " + key + "; value: " + value);
      }
    },

    onNavigatingToDateStarted(args) {
      console.log("onNavigatingToDateStarted: " + args.date);
      for (const [key, value] of Object.entries(args)) {
        console.log("key: " + key + "; value: " + value);
      }
    },

    onViewModeChanged(args) {
      console.log("onViewModeChanged: " + args.newValue);
      for (const [key, value] of Object.entries(args)) {
        console.log("key: " + key + "; value: " + value);
      }
    },
    getTime (date) {
      if (date) {
        const data = new Date(date)
        // return data.getFullYear() + '-' + data.getUTCMonth() + '-' + data.getDate()
        return data.toISOString().split('T')[0]
      }
      return 'No date'
    },
  }
}
</script>