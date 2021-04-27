<template>
  <!--
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: app/views/Food/Activities/Workouts
    */
  -->
  <Page>
    <ActionBar>
      <GridLayout width="100%" columns="auto, *">
        <Label text="MENU" @tap="openDrawer()" col="0"/>
        <Label class="title" :text="pageTitle"  col="1"/>
        <Label @tap="onAddButtonTap()" col="2" text="Add" verticalAlignment="center"/>
      </GridLayout>
    </ActionBar>

    <GridLayout ~mainContent columns="*" rows="*">
      <GridLayout
        rows="auto, *"
        columns="auto, *"
      >
<RadListView
      ref="listView"
      class="workout-list"
      row="0"
      for="workout in workouts"
      v-if="!isLoading"
      @itemTap="onItemTap"
    >
      <ListViewLinearLayout
        scrollDirection="Vertical"
        v-tkListViewLayout
      />
      <v-template>
        <StackLayout
          class="workout-list__item"
        >
          <GridLayout
            class="workout-list__item-content"
            columns="*, *"
            rows="*, *, *"
          >
            <Label
              class="workout-list__item-name"
              :text="workout.type"
              row="0"
            />
            <Label
              class="workout-list__item-name"
              :text="workout.reps || 'None'"
              row="0"
              col="1"
            />
          </GridLayout>
        </StackLayout>
      </v-template>
    </RadListView>
    <!-- <ActivityIndicator
      row="1"
      colSpan="2"
      :busy="isLoading"
      v-else
    /> -->
      </GridLayout>
      <!-- <Label text="Pageeeeee"></Label> -->
      <!-- <Label class="message" :text="text" col="0" row="0"/> -->
    </GridLayout>
  </Page>
</template>

<script>
import sideDrawer from '~/mixins/sideDrawer'
import WorkoutDetails from './WorkoutDetails'
import WorkoutAddEdit from './WorkoutAddEdit'

export default {
  mixins: [ sideDrawer ],
  data () {
    return {
      pageTitle: 'Workouts',
      text: 'Hello workouts Page!',
      workouts: []
    }
  },
  created () {
    this.getWorkouts()
  },
  computed: {
    isLoading() {
      return !this.workouts.length
    }
  },
  methods: {
    onItemTap(args) {
        this.$emit("select", args.item);
        this.$navigateTo(WorkoutDetails, {props: {workout: args.item}})
    },
    getWorkouts() {
      this.$http.get('http://192.168.1.11:5000/api/users/607dd613d79fa252b43393af/workouts').then((res) => {
        this.workouts = res.data.workouts
      })      
    },
    getTime (date) {
      const data = new Date(date)
      // return data.getFullYear() + '-' + data.getUTCMonth() + '-' + data.getDate()
      return data.toISOString().split('T')[0]
    },
    onAddButtonTap() {
      this.$navigateTo(WorkoutAddEdit, {
        transition: "slideTop",
        backstackVisible: false
        // props: {car: this.carData}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '@nativescript/theme/scss/variables/blue';

    // Custom styles
    .workout-list {
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