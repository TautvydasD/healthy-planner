<template>
    <Page>
        <ActionBar>
            <NavigationButton @tap="$navigateBack()" android.systemIcon="ic_menu_back"/>
            <Label :text="recipe.name" horizontalAlignment="center"/>
            <ActionItem @tap="onEditButtonTap" android.position="right" ios.position="right">
                <Label text="Edit" verticalAlignment="center"/>
            </ActionItem>
        </ActionBar>

        <ScrollView>
            <StackLayout>
                <Image :src="recipeData.image" class="m-b-15" height="200"/>

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
                    <Label :text="recipeData.createdAt" class="p-b-10" col="1" row="1"/>

                    <Label class="p-l-15 p-b-10 m-r-20" row="2" text="Description"/>
                    <Label :text="recipeData.description" class="p-b-10" col="1" row="2"/>

                    <Label class="p-l-15 p-b-10 m-r-20" row="3" text="Author"/>
                    <Label :text="recipeData.author" class="p-b-10" col="1" row="3"/>

                    <Button :text="'Remove recipe'" row="4" @tap="deleteRecipe()"></Button>
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
  import Recipes from '../Recipes'
  import PrivateAddEdit from './PrivateAddEdit'
  export default {
    props: ["recipe"],

    computed: {
      recipeData() {
        return this.recipe || {}
      }
    },
    methods: {
        onEditButtonTap () {
          this.$navigateTo(PrivateAddEdit, {
            transition: "slideTop",
            backstackVisible: false,
            props: {recipe: this.recipeData, edit: true}
          });
        },
        deleteRecipe () {
            this.$http.delete('http://192.168.1.11:5000/api/users/' + '607dd613d79fa252b43393af' + '/recipes/' + this.recipe['_id']).then(() => {
                this.$navigateTo(Recipes, {
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