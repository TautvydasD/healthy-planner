<template>
  <!--
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: app/views/Food/Activities/Exercises/PrivateAddEdit
    */
  -->
    <Page>
        <ActionBar>
            <!-- HACK - we should remove the navigation button -->
            <NavigationButton visibility="collapsed"/>
            <Label horizontalAlignment="center" :text="(edit ? 'Edit' : 'Add new') + 'Exercise Details'"/>
            <ActionItem @tap="onCancelButtonTap" ios.position="left">
                <Label text="Cancel" verticalAlignment="center"/>
            </ActionItem>
            <ActionItem ios.position="right">
                <Label
                  verticalAlignment="center"
                  text="Done"
                  @tap="edit ? editExercise() : addExercise()" 
                />
            </ActionItem>
        </ActionBar>

        <GridLayout>
            <ScrollView>
                <StackLayout class="exercise-list">
                  <GridLayout
                    rows="auto, auto, auto"
                  >
                    <StackLayout
                      row="0"
                    >
                    <Label class="exercise-list-odd" text="Make Exercise" />
                    
                    <!-- <Label class="exercise-list-odd" text="Exercise type" /> -->
                    <TextField
                      v-model="exerciseForm.name"
                      class="input-wrapper"
                      hint="Name"
                      autocorret="false"
                      autocapitalizationType="none"
                      returnKeyType="next"
                    />
                    <!-- <Label class="exercise-list-odd" text="Exercise reps"/> -->
                    <TextField
                      v-model="exerciseForm.description"
                      class="input-wrapper"
                      hint="Description"
                      autocorret="false"
                      autocapitalizationType="none"
                      returnKeyType="next"
                    />

                    <TextField
                      v-model="exerciseForm.image"
                      class="input-wrapper"
                      hint="Image url"
                      autocorret="false"
                      autocapitalizationType="none"
                      returnKeyType="next"
                    />
                    <TextField
                      v-model="exerciseForm.tutorial"
                      class="input-wrapper"
                      hint="Exercise tutorial"
                      autocorret="false"
                      autocapitalizationType="none"
                      returnKeyType="next"
                    />
                    <TextField
                      v-model="exerciseForm.muscleGroup"
                      class="input-wrapper"
                      hint="Muscle Groups"
                      autocorret="false"
                      autocapitalizationType="none"
                      returnKeyType="next"
                    />
                    <TextField
                      v-model="exerciseForm.equipment"
                      class="input-wrapper"
                      hint="Equipment"
                      autocorret="false"
                      autocapitalizationType="none"
                      returnKeyType="next"
                    />
                    <TextField
                      v-model="exerciseForm.category"
                      class="input-wrapper"
                      hint="Category"
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
  import ExerciseList from "../Exercises";
  // import Selector from "../../components/Selector";
  // import AddRemoveImage from "./AddRemoveImage";

  export default {
    props: {
      exercise: {
        default: {}
      },
      edit: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        isExerciseImageDirty: false,
        isUpdating: false,
        exerciseForm: this.exercise ? this.exercise : {}
      };
    },

    computed: {
      isModelValid() {
        return !!this.exerciseData.name && !!this.exerciseData.imageUrl;
      },

      exerciseData() {
        return this.exercise || {};
      }
    },

    methods: {
      onCancelButtonTap() {
        this.$navigateBack();
      },
      addExercise () {
        const exercise = { ...this.exerciseForm, author: 'tautvis62' }
        this.$http.post('http://192.168.1.11:5000/api/users/' + '607dd613d79fa252b43393af' + '/exercises', {
          exercises: [ exercise ]
        }).then((res) => {
          this.$navigateTo(ExerciseList, {
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
      editExercise () {
        this.$http.put('http://192.168.1.11:5000/api/users/' + '607dd613d79fa252b43393af' + '/exercises/' + this.exercise['_id'], {
          exercise: this.exerciseForm
        }).then((res) => {
          this.$navigateTo(ExerciseList, {
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

        if (this.isExerciseImageDirty && this.exerciseData.imageUrl) {
            queue = queue
                .then(() => exerciseService.uploadImage(this.exerciseData.imageStoragePath, this.exerciseData.imageUrl))
                .then((uploadedFile) => {
                    this.exerciseData.imageUrl = uploadedFile.url;
                });
        }

        queue.then(() => exerciseService.update(this.exerciseData))
            .then(() => {
                this.isUpdating = false;
                this.isExerciseImageDirty = false;

            this.$navigateTo(ExerciseList, {
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
          this.$navigateTo(ExerciseList, {
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
    .exercise-list {

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
