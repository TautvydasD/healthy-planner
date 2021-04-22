<template>
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
              :text="recipe.name"
            />
            <Image
              class="image-background"
              :src="recipe.image"
              height="120"
              loadMode="async"
              row="2"
            />
          </GridLayout>
          <Button :text="'Add new Recipe'" @tap="onAddButtonTap()"></Button>
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
</template>

<script>
import PrivateDetails from './PrivateDetails'
import PrivateAddEdit from './PrivateAddEdit'

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
    onAddButtonTap() {
      this.$navigateTo(PrivateAddEdit, {
        transition: "slideTop",
        backstackVisible: false
        // props: {car: this.carData}
      })
    },
    onItemTap(args) {
        this.$emit("select", args.item);
        this.$navigateTo(PrivateDetails, {props: {recipe: args.item}})
    },
    getRecipes() {
      this.$http.get('http://192.168.1.11:5000/api/users/607dd613d79fa252b43393af/recipes').then((res) => {
        this.recipes = res.data.recipes
      })      
    },
    getTime (date) {
      const data = new Date(date)
      // return data.getFullYear() + '-' + data.getUTCMonth() + '-' + data.getDate()
      return data.toISOString().split('T')[0]
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