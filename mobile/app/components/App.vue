<template>
  <Page>
        <TabView android:tabBackgroundColor="#53ba82"
                 android:tabTextColor="#c4ffdf"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff">
            <TabViewItem title="Tab 1">
                <GridLayout columns="*" rows="*">
                    <Label class="message" :text="msg" col="0" row="0"/>
                </GridLayout>
            </TabViewItem>
            <TabViewItem title="Tab 2">
                <GridLayout columns="*" rows="*">
                    <Label class="message" text="Tab 2 Content" col="0" row="0"/>
                </GridLayout>
            </TabViewItem>
            <TabViewItem title="Tab 3">
                <GridLayout columns="*" rows="*">
                    <Label class="message" text="Tab 3 Content" col="0" row="0"/>
                </GridLayout>
            </TabViewItem>
        </TabView>

  </Page>
</template>

<script>
import Vue from "nativescript-vue";
import { LocalNotifications } from "nativescript-local-notifications";
import { alert } from "@nativescript/core/ui/dialogs";
import { Color } from "@nativescript/core/color";
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";
Vue.use(RadSideDrawer);

// import Exercises from './Exercises.vue';
// import About from './About'
import Login from './Login'

export default {
  // components: {
  //   About,
  //   Exercises
  // },
  data() {
    return {
      message: "Tap a button above..",
      api: {},
      mainContentText:
        "SideDrawer for NativeScript can be easily setup in the XML definition of your page by defining main- and drawer-content. The component" +
        " has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.",
      test: 'Home',
      testText: 'NASDASDSADDDDDDDDADDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
      currentId: 'mainContent'
      // pages: {
      //   'About': About,
      //   'Exercises': Exercises
      // }
    };
  },
  created() {
    // this.testAPI()
    // LocalNotifications.addOnMessageReceivedCallback(notificationData => {
    //   this.message = "Notification received: " + JSON.stringify(notificationData);
    // });
  },
  computed: {
    // message() {
    //   return "Blank {N}-Vue app";
    // },
    // test() {
    //   return "lol"
    // }
  },

  methods: {
    goTo (id, component) {
      this.currentId = id,
      this.$navigateTo(pages[component], { frame: id })
    },
    logout () {
      this.$store.commit('clearUser')
        this.$navigateTo(Login, {
          clearHistory: true
        })
    },
    // onDrawerButtonTap() {},
    onOpenDrawerTap() {
      this.$refs.drawer.nativeView.showDrawer();
    },
    onCloseDrawerTap() {
      this.$refs.drawer.nativeView.closeDrawer();
    },
    testAPI() {
      this.$http.get("http://10.0.2.2:5000/api/users").then((res) => {
        this.api = res;
        console.log(res);
      });
    },
    onTapHasPermission() {
      LocalNotifications.hasPermission().then((granted) => {
        alert({
          title: "Permission granted?",
          message: granted ? "YES" : "NO",
          okButtonText: "OK",
        });
      });
    },
    onTapScheduleNotification() {
      LocalNotifications.schedule([
        {
          id: 1,
          title: "Would you like a Red Alert poster?",
          subtitle: "This poster is awesome!",
          body:
            "The big brown Vue app jumped over the lazy Angular app. The big brown Vue app jumped over the lazy Angular app. The big brown Vue app jumped over the lazy Angular app. The big brown Vue app jumped over the lazy Angular app.",
          bigTextStyle: false, // Allow more than 1 row of the 'body' text on Android, but setting this to true denies showing the 'image'
          color: new Color("green"),
          image:
            "https://images-na.ssl-images-amazon.com/images/I/61mx-VbrS0L.jpg",
          thumbnail:
            "https://2.bp.blogspot.com/-H_SZ3nAmNsI/VrJeARpbuSI/AAAAAAAABfc/szsV7_F609k/s200/emoji.jpg",
          forceShowWhenInForeground: true,
          channel: "vue-channel",
          ticker: "Special ticker text for Vue (Android only)",
          at: new Date(new Date().getTime() + 5 * 1000), // 5 seconds from now
          actions: [
            {
              id: "yes",
              type: "button",
              title: "Yes (and launch app)",
              launch: true,
            },
            {
              id: "no",
              type: "button",
              title: "No",
              launch: false,
            },
          ],
        },
      ])
        .then(() => {
          alert({
            title: "Notification scheduled",
            message: "ID: 1",
            okButtonText: "OK, thanks",
          });
        })
        .catch((error) => console.log("doSchedule error: " + error));
    },
    onTapCancelAll() {
      LocalNotifications.cancelAll()
        .then(() => {
          alert({
            title: "All canceled",
            okButtonText: "Awesome!",
          });
        })
        .catch((error) => console.log("doCancelAll error: " + error));
    },
  },
}
</script>

<style scoped lang="scss">
@import "~@nativescript/theme/scss/variables/blue";

// Custom styles
.fas {
  @include colorize($color: accent);
}

.info {
  font-size: 20;
  horizontal-align: center;
  vertical-align: center;
}
.home-panel {
  vertical-align: center;
  font-size: 20;
  // margin: 15;
  background-color: #fff;
}

.description-label {
  margin-bottom: 15;
}

.side-drawer {
  background-color: white;
}

.logout {
  background-color: #da714a;
  color: #da714a;
}
</style>
