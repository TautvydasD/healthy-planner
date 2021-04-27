<template>
  <!--
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: app/views/Food/Recipes/Spooncular
    */
  -->
  <GridLayout
    rows="auto, *"
    columns="auto, *"
  >
    <RadListView
      ref="listView"
      class="recipe-list"
      row="0"
      for="recipe in recipes"
      v-if="!isLoading"
      @itemTap="onItemTap"
    >
      <ListViewLinearLayout
        scrollDirection="Vertical"
        v-tkListViewLayout
      />
      <v-template>
        <StackLayout
          class="recipe-list__item"
        >
          <GridLayout
            class="recipe-list__item-content"
            columns="*, *"
            rows="*, *, *"
          >
            <Label
              class="recipe-list__item-name"
              :text="recipe.title"
            />
            <Image
              class="image-background"
              :src="recipe.image"
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
import SpooncularDetails from './SpooncularDetails'

export default {
  data () {
    return {
      recipes: []
    }
  },
  created () {
    this.getRecipes()
  },
  computed: {
    isLoading() {
      return !this.recipes.length
    }
  },
  methods: {
    onItemTap(args) {
        this.$emit("select", args.item);
        this.$navigateTo(SpooncularDetails, {props: {recipe: args.item}})
    },
    getRecipes() {  
      this.$http.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=0d9526c1c8ba461bb3d29c2b20ace171').then(res => {
        console.log(res)
        this.recipes = res.data.results
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '@nativescript/theme/scss/variables/blue';

    // Custom styles
    .recipe-list {
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