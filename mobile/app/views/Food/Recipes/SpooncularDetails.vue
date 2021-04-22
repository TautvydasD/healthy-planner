<template>
    <Page>
        <ActionBar>
            <NavigationButton @tap="$navigateBack()" android.systemIcon="ic_menu_back"/>
            <Label :text="recipeData.title" horizontalAlignment="center"/>
            <!-- <ActionItem @tap="onEditButtonTap" android.position="right" ios.position="right">
                <Label text="Edit" verticalAlignment="center"/>
            </ActionItem> -->
        </ActionBar>

        <ScrollView>
            <StackLayout>
                <Image :src="recipeData.image" class="m-b-15" height="200" stretch="aspectFill"/>

                <Label :text="recipeData.title" class="hr m-y-15" row="1"/>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
  export default {
    props: ["recipe"],

    computed: {
      recipeData() {
        return this.recipe || {}
      }
    }
  }
</script>