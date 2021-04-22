<template>
    <Page>
        <ActionBar>
            <NavigationButton @tap="$navigateBack()" android.systemIcon="ic_menu_back"/>
            <Label :text="exercise.name" horizontalAlignment="center"/>
            <ActionItem @tap="onEditButtonTap" android.position="right" ios.position="right">
                <Label text="Edit" verticalAlignment="center"/>
            </ActionItem>
        </ActionBar>

        <ScrollView>
            <StackLayout>
                <Image :src="exerciseData.image" class="m-b-15" height="200"/>

                <Label class="hr m-y-15" row="1"/>

                <GridLayout columns="auto,auto" row="2" rows="*, *, *, *, *, *">
                    <!-- <Label class="p-l-15 p-b-10 m-r-20" text="Price"/> -->
                    <!-- <Label class="p-b-10" col="1">
                        <FormattedString>
                            <Span text.decode="&euro;"/>
                            <Span :text="exerciseData.price"/>
                            <Span text="/day"/>
                        </FormattedString>
                    </Label> -->

                    <Label class="p-l-15 p-b-10 m-r-20" row="1" text="Created At"/>
                    <Label :text="exerciseData.createdAt" class="p-b-10" col="1" row="1"/>

                    <Label class="p-l-15 p-b-10 m-r-20" row="2" text="Description"/>
                    <Label :text="exerciseData.description" class="p-b-10" col="1" row="2"/>

                    <Label class="p-l-15 p-b-10 m-r-20" row="3" text="Exercise Id"/>
                    <Label :text="exerciseData['_id']" class="p-b-10" col="1" row="3"/>

                    <Button :text="'Remove exercise'" row="4" @tap="deleteExercise()"></Button>
                    <!-- <Label class="p-l-15 p-b-10 m-r-20" row="3" text="Seats"/>
                    <Label :text="exerciseData.seats" class="p-b-10" col="1" row="3"/>

                    <Label class="p-l-15 p-b-10 m-r-20" row="4" text="Transmission"/>
                    <Label :text="exerciseData.transmission" class="p-b-10" col="1" row="4"/>

                    <Label class="p-l-15 p-b-10 m-r-20" row="5" text="Luggage"/>
                    <Label :text="exerciseData.luggage" class="p-b-10" col="1" row="5"/> -->
                </GridLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
import Exercises from '../Exercises'
import PrivateAddEdit from './PrivateAddEdit'
  export default {
    props: ["exercise"],

    computed: {
      exerciseData() {
        return this.exercise || {}
      }
    },
    methods: {
        onEditButtonTap () {
          this.$navigateTo(PrivateAddEdit, {
            transition: "slideTop",
            backstackVisible: false,
            props: {exercise: this.exerciseData, edit: true}
          });
        },
        deleteExercise () {
            this.$http.delete('http://192.168.1.11:5000/api/users/' + '607dd613d79fa252b43393af' + '/exercises/' + this.exercise['_id']).then(() => {
                this.$navigateTo(Exercises, {
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