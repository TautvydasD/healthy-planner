<template>
    <Page>
        <ActionBar>
            <NavigationButton @tap="$navigateBack()" android.systemIcon="ic_menu_back"/>
            <Label :text="activity.name" horizontalAlignment="center"/>
            <ActionItem @tap="onEditButtonTap" android.position="right" ios.position="right">
                <Label text="Edit" verticalAlignment="center"/>
            </ActionItem>
        </ActionBar>

        <ScrollView>
            <StackLayout>
                <!-- <Image :src="exerciseData.image" class="m-b-15" height="200"/> -->

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
                    <Label class="p-l-15 p-b-10 m-r-20" row="1" text="Activity end"/>
                    <Label :text="activityData.from" class="p-b-10" col="1" row="1"/>

                    <Label class="p-l-15 p-b-10 m-r-20" row="2" text="Activity start"/>
                    <Label :text="activityData.to" class="p-b-10" col="1" row="2"/>

                    <Label class="p-l-15 p-b-10 m-r-20" row="3" text="Description"/>
                    <Label :text="activityData.description" class="p-b-10" col="1" row="3"/>
                    
                    <Label class="p-l-15 p-b-10 m-r-20" row="4" text="Created At"/>
                    <Label :text="activityData.createdAt" class="p-b-10" col="1" row="4"/>

                </GridLayout>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
  export default {
    props: ["activity"],

    computed: {
      activityData() {
        return this.activity || {}
      }
    }
  }
</script>