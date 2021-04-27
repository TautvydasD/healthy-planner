<template>
  <!--
    /**
    * Author: Tautvydas Dikšas
    * Date: 2021-04-26
    * Path: app/views/DayPage
    */
  -->
  <Page>
    <ActionBar>
      <NavigationButton @tap="$navigateBack()" android.systemIcon="ic_menu_back"/>
      <Label :text="date" horizontalAlignment="center"/>
      <ActionItem @tap="() => {}" android.position="right" ios.position="right">
          <Label text="Add" verticalAlignment="center"/>
      </ActionItem>
    </ActionBar>
    <ScrollView>
      <StackLayout>

      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
export default {
  props: ['date'],
  data () {
    return {
      activities: []
    }
  },
  methods: {
    onEditButtonTap() {
      // this.$navigateTo(ActivityDetailsEdit, {
      //   transition: "slideTop",
      //   backstackVisible: false,
      //   props: {activity: this.activityData, edit:true}
      // })
    },
  }
}
</script>