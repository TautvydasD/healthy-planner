<template>
    <Page>
        <ActionBar>
            <!-- HACK - we should remove the navigation button -->
            <NavigationButton visibility="collapsed"/>
            <Label horizontalAlignment="center" :text="(edit ? 'Edit' : 'Add new') + 'Recipe Details'"/>
            <ActionItem @tap="onCancelButtonTap" ios.position="left">
                <Label text="Cancel" verticalAlignment="center"/>
            </ActionItem>
            <ActionItem ios.position="right">
                <Label
                  verticalAlignment="center"
                  text="Done"
                  @tap="edit ? editRecipe() : addRecipe()" 
                />
            </ActionItem>
        </ActionBar>

        <GridLayout>
            <ScrollView>
                <StackLayout class="recipe-list">
                  <GridLayout
                    rows="auto, auto, auto"
                  >
                    <StackLayout
                      row="0"
                    >
                    <Label class="recipe-list-odd" text="Make Recipe" />
                    
                    <!-- <Label class="recipe-list-odd" text="Recipe type" /> -->
                    <TextField
                      v-model="recipeForm.name"
                      class="input-wrapper"
                      hint="Name"
                      autocorret="false"
                      autocapitalizationType="none"
                      returnKeyType="next"
                    />
                    <!-- <Label class="recipe-list-odd" text="Recipe reps"/> -->
                    <TextField
                      v-model="recipeForm.category"
                      class="input-wrapper"
                      hint="Category"
                      autocorret="false"
                      autocapitalizationType="none"
                      returnKeyType="next"
                    />

                    <TextField
                      v-model="recipeForm.image"
                      class="input-wrapper"
                      hint="Image url"
                      autocorret="false"
                      autocapitalizationType="none"
                      returnKeyType="next"
                    />
                    <TextField
                      v-model="recipeForm.tutorial"
                      class="input-wrapper"
                      hint="Recipe tutorial"
                      autocorret="false"
                      autocapitalizationType="none"
                      returnKeyType="next"
                    />
                    <TextField
                      v-model="recipeForm.ingredients"
                      class="input-wrapper"
                      hint="Ingredients"
                      autocorret="false"
                      autocapitalizationType="none"
                      returnKeyType="next"
                    />
                    <TextField
                      v-model="recipeForm.calories"
                      class="input-wrapper"
                      hint="Calories"
                      autocorret="false"
                      autocapitalizationType="none"
                      returnKeyType="next"
                    />

                    </StackLayout>

                  </GridLayout>
                </StackLayout>
            </ScrollView>
            <!-- <ActivityIndicator :busy="isUpdating"/> -->
        </GridLayout>
    </Page>
</template>

<script>
  import { alert } from "@nativescript/core";
  import RecipeList from "../Recipes";
  // import Selector from "../../components/Selector";
  // import AddRemoveImage from "./AddRemoveImage";

  export default {
    props: {
      recipe: {
        default: {}
      },
      edit: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        isRecipeImageDirty: false,
        isUpdating: false,
        recipeForm: this.recipe ? this.recipe : {}
      };
    },

    computed: {
      isModelValid() {
        return !!this.recipeData.name && !!this.recipeData.imageUrl;
      },

      recipeData() {
        return this.recipe || {};
      }
    },

    methods: {
      onCancelButtonTap() {
        this.$navigateBack();
      },
      addRecipe () {
        const recipe = { ...this.recipeForm, author: 'tautvis62' }
        this.$http.post('http://192.168.1.11:5000/api/users/' + '607dd613d79fa252b43393af' + '/recipes', {
          recipes: [ recipe ]
        }).then((res) => {
          this.$navigateTo(RecipeList, {
            animated: true,
            clearHistory: true,
            transition: {
              name: "slideBottom",
              duration: 200,
              curve: "ease"
            }
          })
        })
      },
      editRecipe () {
        this.$http.put('http://192.168.1.11:5000/api/users/' + '607dd613d79fa252b43393af' + '/recipes/' + this.recipe['_id'], {
          recipe: this.recipeForm
        }).then((res) => {
          this.$navigateTo(RecipeList, {
            animated: true,
            clearHistory: true,
            transition: {
              name: "slideBottom",
              duration: 200,
              curve: "ease"
            }
          })
        })
      },
      onDoneButtonTap() {
        /* ***********************************************************
        * By design this app is set up to work with read-only sample data.
        * Follow the steps in the "Firebase database setup" section in app/readme.md file
        * and uncomment the code block below to make it editable.
        *************************************************************/

        /* ***********************************************************
        let queue = Promise.resolve();
        this.isUpdating = true;

        if (this.isRecipeImageDirty && this.recipeData.imageUrl) {
            queue = queue
                .then(() => recipeService.uploadImage(this.recipeData.imageStoragePath, this.recipeData.imageUrl))
                .then((uploadedFile) => {
                    this.recipeData.imageUrl = uploadedFile.url;
                });
        }

        queue.then(() => recipeService.update(this.recipeData))
            .then(() => {
                this.isUpdating = false;
                this.isRecipeImageDirty = false;

            this.$navigateTo(RecipeList, {
                animated: true,
                clearHistory: true,
                transition: {
                    name: "slideBottom",
                    duration: 200,
                    curve: "ease"
                }
            });
            })
            .catch((errorMessage) => {
                this.isUpdating = false;

                alert({ title: "Oops!", message: errorMessage, okButtonText: "Ok" });
            });
        *************************************************************/

        /* ***********************************************************
        * Comment out the code block below if you made the app editable.
        *************************************************************/
        alert({
          title: "Read-Only Template!",
          message: `Check out the "Firebase database setup" section in the readme file to make it editable.`,
          okButtonText: "Ok"
        }).then(() => {
          this.$navigateTo(RecipeList, {
            animated: true,
            clearHistory: true,
            transition: {
              name: "slideBottom",
              duration: 200,
              curve: "ease"
            }
          });
        });
      }
    }
  };
</script>

<style lang="scss">
    @import '@nativescript/theme/scss/variables/blue';

    // Custom styles
    .recipe-list {

        &-even,
        &-odd {
            padding: 10 15;
            margin: 0;
            border-bottom-width: const(border-width);
            @include colorize($border-color: background-alt-20);
        }

        &-odd {
            @include colorize(
                    $background-color: background-alt-10,
                    $color: secondary
            );
        }

        &__value {
            width: 65;
            text-align: right;
            @include colorize($contrasted-color: complementary background 30% 10%);
        }

        TextField.placeholder-error {
            @include colorize($placeholder-color: error);
        }

        Slider {
            @include colorize(
                    $contrasted-background-color: complementary background 20% 0%,
                    $contrasted-color: complementary background 20% 0%
            );
        }
    }

    .thumb {

        background-size: cover;
        background-repeat: no-repeat;
        font-size: 25;
        font-weight: bold;

        &__add {
            background-color: transparent;
            border-radius: const(border-radius-sm);
            border-width: const(border-width);
            @include colorize(
                    $border-color: background-alt-20,
                    $color: background-alt-20
            );
        }

        &__remove {
            background-color: rgba(grey, 0.5);
            @include colorize($color: background);
        }
    }
</style>
