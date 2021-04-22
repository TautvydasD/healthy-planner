<template>
    <Page>
        <ActionBar>
            <!-- HACK - we should remove the navigation button -->
            <NavigationButton visibility="collapsed"/>
            <Label horizontalAlignment="center" :text="(edit ? 'Edit' : 'Add new') + 'Activity Details'"/>
            <ActionItem @tap="onCancelButtonTap" ios.position="left">
                <Label text="Cancel" verticalAlignment="center"/>
            </ActionItem>
            <ActionItem ios.position="right">
                <Label
                  verticalAlignment="center"
                  text="Done"
                  @tap="edit ? editActivity() : addActivity()" 
                />
            </ActionItem>
        </ActionBar>

        <GridLayout>
            <ScrollView>
                <StackLayout class="activity-list">
                  <GridLayout
                    rows="auto, auto, auto"
                  >
                    <StackLayout
                      row="0"
                    >
                    <Label class="activity-list-odd" text="Make Activity" />
                    
                    <!-- <Label class="activity-list-odd" text="Activity type" /> -->
                    <TextField
                      v-model="activityForm.name"
                      class="input-wrapper"
                      hint="Name"
                      autocorret="false"
                      autocapitalizationType="none"
                      returnKeyType="next"
                    />
                    <!-- <Label class="activity-list-odd" text="Activity reps"/> -->
                    <TextField
                      v-model="activityForm.category"
                      class="input-wrapper"
                      hint="Category"
                      autocorret="false"
                      autocapitalizationType="none"
                      returnKeyType="next"
                    />

                    <TextField
                      v-model="activityForm.from"
                      class="Event start"
                      hint="Image url"
                      autocorret="false"
                      autocapitalizationType="none"
                      returnKeyType="next"
                    />
                    <TextField
                      v-model="activityForm.to"
                      class="input-wrapper"
                      hint="Event end"
                      autocorret="false"
                      autocapitalizationType="none"
                      returnKeyType="next"
                    />
                    <TextField
                      v-model="activityForm.description"
                      class="input-wrapper"
                      hint="description"
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
  import ActivityList from "./Home";
  // import Selector from "../../components/Selector";
  // import AddRemoveImage from "./AddRemoveImage";

  export default {
    props: {
      activity: {
        default: {}
      },
      edit: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        isActivityImageDirty: false,
        isUpdating: false,
        activityForm: this.activity ? this.activity : {}
      };
    },

    computed: {
      isModelValid() {
        return !!this.activityData.name && !!this.activityData.imageUrl;
      },

      activityData() {
        return this.activity || {};
      }
    },

    methods: {
      onCancelButtonTap() {
        this.$navigateBack();
      },
      addActivity () {
        const activity = { ...this.activityForm, author: 'tautvis62' }
        this.$http.post('http://192.168.1.11:5000/api/users/' + '607dd613d79fa252b43393af' + '/activities', {
          activities: [ activity ]
        }).then((res) => {
          this.$navigateTo(ActivityList, {
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
      editActivity () {
        this.$http.put('http://192.168.1.11:5000/api/users/' + '607dd613d79fa252b43393af' + '/activities/' + this.activity['_id'], {
          activity: this.activityForm
        }).then((res) => {
          this.$navigateTo(ActivityList, {
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

        if (this.isActivityImageDirty && this.activityData.imageUrl) {
            queue = queue
                .then(() => activityService.uploadImage(this.activityData.imageStoragePath, this.activityData.imageUrl))
                .then((uploadedFile) => {
                    this.activityData.imageUrl = uploadedFile.url;
                });
        }

        queue.then(() => activityService.update(this.activityData))
            .then(() => {
                this.isUpdating = false;
                this.isActivityImageDirty = false;

            this.$navigateTo(ActivityList, {
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
          this.$navigateTo(ActivityList, {
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
    .activity-list {

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
