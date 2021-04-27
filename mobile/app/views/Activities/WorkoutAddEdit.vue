<template>
  <!--
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: app/views/Food/Activities/WorkoutAddEdit
    */
  -->
    <Page>
        <ActionBar>
            <!-- HACK - we should remove the navigation button -->
            <NavigationButton visibility="collapsed"/>
            <Label horizontalAlignment="center" :text="(edit ? 'Edit' : 'Add new') + 'Workout Details'"/>
            <ActionItem @tap="onCancelButtonTap" ios.position="left">
                <Label text="Cancel" verticalAlignment="center"/>
            </ActionItem>
            <ActionItem ios.position="right">
                <Label
                  verticalAlignment="center"
                  text="Done"
                  @tap="edit ? editWorkout() : addWorkout()" 
                />
            </ActionItem>
        </ActionBar>

        <GridLayout>
            <ScrollView>
                <StackLayout class="workout-list">
                  <GridLayout
                    rows="auto, auto, auto"
                  >
                    <StackLayout
                      row="0"
                    >
                    <Label class="workout-list-odd" text="Make Workout" />
                    
                    <!-- <Label class="workout-list-odd" text="Workout type" /> -->
                    <TextField
                      v-model="workoutForm.type"
                      class="input-wrapper"
                      hint="Workout type"
                      autocorret="false"
                      autocapitalizationType="none"
                      returnKeyType="next"
                    />
                    <!-- <Label class="workout-list-odd" text="Workout reps"/> -->
                    <TextField
                      v-model="workoutForm.reps"
                      class="input-wrapper"
                      hint="Workout reps"
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
  import WorkoutList from "./Workouts";
  // import Selector from "../../components/Selector";
  // import AddRemoveImage from "./AddRemoveImage";

  export default {
    props: {
      workout: {
        default: {}
      },
      edit: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        isWorkoutImageDirty: false,
        isUpdating: false,
        workoutForm: this.workout ? this.workout : {}
      };
    },

    computed: {
      isModelValid() {
        return !!this.workoutData.name && !!this.workoutData.imageUrl;
      },

      workoutData() {
        return this.workout || {};
      }
    },

    methods: {
      onCancelButtonTap() {
        this.$navigateBack();
      },
      addWorkout () {
        const workout = { ...this.workoutForm, author: 'tautvis62' }
        this.$http.post('http://192.168.1.11:5000/api/users/' + '607dd613d79fa252b43393af' + '/workouts', {
          workouts: [ workout ]
        }).then((res) => {
          this.$navigateTo(WorkoutList, {
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
      editWorkout () {
        this.$http.put('http://192.168.1.11:5000/api/users/' + '607dd613d79fa252b43393af' + '/workouts/' + this.workout['_id'], {
          workout: this.workoutForm
        }).then((res) => {
          this.$navigateTo(WorkoutList, {
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

        if (this.isWorkoutImageDirty && this.workoutData.imageUrl) {
            queue = queue
                .then(() => workoutService.uploadImage(this.workoutData.imageStoragePath, this.workoutData.imageUrl))
                .then((uploadedFile) => {
                    this.workoutData.imageUrl = uploadedFile.url;
                });
        }

        queue.then(() => workoutService.update(this.workoutData))
            .then(() => {
                this.isUpdating = false;
                this.isWorkoutImageDirty = false;

            this.$navigateTo(WorkoutList, {
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
          this.$navigateTo(WorkoutList, {
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
    .workout-list {

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
