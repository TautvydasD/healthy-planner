<template>
    <Page>
        <ActionBar>
            <NavigationButton @tap="$navigateBack()" android.systemIcon="ic_menu_back"/>
            <Label :text="workout.name" horizontalAlignment="center"/>
            <ActionItem @tap="onEditButtonTap" android.position="right" ios.position="right">
                <Label text="Edit" verticalAlignment="center"/>
            </ActionItem>
        </ActionBar>

        <ScrollView>
            <StackLayout>
                <!-- <Image :src="exerciseData.image" class="m-b-15" height="200"/> -->

                <Label class="hr m-y-15" row="1"/>

                <!-- <GridLayout columns="auto,auto" row="2" rows="*, *, *"> -->
                <StackLayout>
                    <!-- <Label class="p-l-15 p-b-10 m-r-20" text="Price"/> -->
                    <!-- <Label class="p-b-10" col="1">
                        <FormattedString>
                            <Span text.decode="&euro;"/>
                            <Span :text="exerciseData.price"/>
                            <Span text="/day"/>
                        </FormattedString>
                    </Label> -->

                    <Label class="p-l-15 p-b-10 m-r-20" text="Workout type"/>
                    <Label :text="workoutData.type" class="p-b-10"/>

                    <Label class="p-l-15 p-b-10 m-r-20" text="Reps"/>
                    <Label :text="workoutData.reps" class="p-b-10" />

                    <Label class="p-l-15 p-b-10 m-r-20" text="Workout id"/>
                    <Label :text="workoutData['_id']" class="p-b-10"/>

                    <Button :text="'Delete workout'"  @tap="deleteWorkout()" ></Button>

                    <!-- <Label class="p-l-15 p-b-10 m-r-20" row="3" text="Seats"/>
                    <Label :text="exerciseData.seats" class="p-b-10" col="1" row="3"/>

                    <Label class="p-l-15 p-b-10 m-r-20" row="4" text="Transmission"/>
                    <Label :text="exerciseData.transmission" class="p-b-10" col="1" row="4"/>

                    <Label class="p-l-15 p-b-10 m-r-20" row="5" text="Luggage"/>
                    <Label :text="exerciseData.luggage" class="p-b-10" col="1" row="5"/> -->
                <!-- </GridLayout> -->
                </StackLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
import Workouts from './Workouts'
import WorkoutAddEdit from './WorkoutAddEdit'
  export default {
    props: ["workout"],

    computed: {
      workoutData() {
        return this.workout || {}
      }
    },

    methods: {
        onEditButtonTap () {
          this.$navigateTo(WorkoutAddEdit, {
            transition: "slideTop",
            backstackVisible: false,
            props: {workout: this.workoutData, edit: true}
          });
        },
        deleteWorkout () {
            this.$http.delete('http://192.168.1.11:5000/api/users/' + '607dd613d79fa252b43393af' + '/workouts/' + this.workout['_id']).then(() => {
                this.$navigateTo(Workouts, {
                    animated: true,
                    clearHistory: true,
                    transition: {
                        name: "slideBottom",
                        duration: 200,
                        curve: "ease"
                    }
                });
            })
        }
    }
  }
</script>