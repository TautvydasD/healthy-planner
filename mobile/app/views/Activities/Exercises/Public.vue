<template>
  <GridLayout
    rows="auto, *"
    columns="auto, *"
  >
    <RadListView
      ref="listView"
      class="exercise-list"
      row="0"
      for="exercise in exercises"
      v-if="!isLoading"
      @itemTap="onItemTap"
    >
      <ListViewLinearLayout
        scrollDirection="Vertical"
        v-tkListViewLayout
      />
      <v-template>
        <StackLayout
          class="exercise-list__item"
        >
          <GridLayout
            class="exercise-list__item-content"
            columns="*, *"
            rows="*, *, *"
          >
            <Label
              class="exercise-list__item-name"
              :text="exercise.name"
            />
            <Image
              class="image-background"
              :src="exercise.image"
              height="120"
              loadMode="async"
              row="2"
            />
          </GridLayout>
        </StackLayout>
      </v-template>
    </RadListView>
    <ActivityIndicator
      row="1"
      colSpan="2"
      :busy="isLoading"
      v-else
    />
    <!-- <Label text="popoPlan exercises">
    </Label> -->
  </GridLayout>
</template>
<script>
import PublicDetails from './PublicDetails'

export default {
  data () {
    return {
      exercises: []
    }
  },
  created () {
    this.getExercises()
  },
  computed: {
    isLoading() {
      return !this.exercises.length
    }
  },
  methods: {
    onItemTap(args) {
        this.$emit("select", args.item);
        this.$navigateTo(PublicDetails, {props: {exercise: args.item}})
    },
    getExercises() {
      this.$http.get('http://192.168.1.11:5000/api/exercises/public').then((res) => {
        this.exercises = res.data.exercises
      })      
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '@nativescript/theme/scss/variables/blue';

    // Custom styles
    .exercise-list {
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