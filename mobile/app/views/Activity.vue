<template>
  <GridLayout
    rows="auto, *"
    columns="auto, auto"
  >
    <RadListView
      ref="listView"
      class="activity-list"
      row="0"
      for="activity in activities"
      v-if="!isLoading"
      @itemTap="onItemTap"
    >
      <ListViewLinearLayout
        scrollDirection="Vertical"
        v-tkListViewLayout
      />
      <v-template>
        <StackLayout
          class="activity-list__item"
        >
          <GridLayout
            class="activity-list__item-content"
            columns="*, *"
            rows="*, *, *"
          >
            <Label
              class="activity-list__item-name"
              :text="activity.name"
              row="1"
            />
            <Label
              class="activity-list__item-name"
              :text="activity.from + '-' + activity.to"
              row="2"
            />
          </GridLayout>
          <Button :text="'Add new Activity'" @tap="onAddButtonTap()"></Button>
        </StackLayout>
      </v-template>
    </RadListView>
    <!-- <ActivityIndicator
      row="1"
      colSpan="2"
      :busy="isLoading"
      v-else
    /> -->
    <!-- <Label text="wGer info">
    </Label> -->
  </GridLayout>
</template>

<script>
import ActivityDetails from './ActivityDetails'
import ActivityDetailsEdit from './ActivityDetailsEdit'

export default {
  data () {
    return {
      activities: []
    }
  },
  components: {
    ActivityDetails
  },
  created () {
    this.getActivities()
  },
  computed: {
    isLoading() {
      return !this.activities.length
    }
  },
  methods: {
    onAddButtonTap() {
      this.$navigateTo(ActivityDetailsEdit, {
        transition: "slideTop",
        backstackVisible: false
        // props: {car: this.carData}
      })
    },
    onItemTap(args) {
        this.$emit("select", args.item);
        this.$navigateTo(ActivityDetails, {props: {activity: args.item}})
    },
    getActivities () {
      this.$http.get('http://192.168.1.11:5000/api/users/607dd613d79fa252b43393af/activities').then(res => {
        this.activities = res.data.activities
        // console.log(res)
      })
      // this.$http.get('http://192.168.1.11:5000/api/activities').then(res => {
      //   console.log(res)
      //   this.activities = res.data.activities
      // }).catch(err => {
      //   console.log(err)
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '@nativescript/theme/scss/variables/blue';

    // Custom styles
    .activity-list {
        &__item {
            padding: 0 0 8 0;
            @include colorize($background-color: background-alt-10);

            &-content {
                padding: 8 15 4 15;
                @include colorize($background-color: background);
            }

            &-name,
            &-icon {
                @include colorize($contrasted-color: complementary background 30% 0%);
            }
        }
    }
    .image-background {
      background: #fff;
    }
</style>