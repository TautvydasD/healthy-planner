<template>
    <Page>
        <ActionBar>
            <NavigationButton @tap="$navigateBack()" android.systemIcon="ic_menu_back"/>
            <Label :text="exercise.name" horizontalAlignment="center"/>
            <!-- <ActionItem @tap="onEditButtonTap" android.position="right" ios.position="right">
                <Label text="Edit" verticalAlignment="center"/>
            </ActionItem> -->
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
  export default {
    props: ["exercise"],

    computed: {
      exerciseData() {
        return this.exercise || {}
      }
    }
  }
</script>