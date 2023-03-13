<template>
  <v-overlay opacity="0.8" :absolute="true" :value="!isSubscriptionActive">
    <div
      style="width: 100%; height: 100%"
      class="d-flex flex-column align-center justify-center"
    >
      <h3 class="white--text text-h3">SUBSCRIPTION INACTIVE</h3>

      <template v-if="subscription">
        <p class="white--text text-body-1">
          Your subscription ends at:
          {{ $moment(subscription.end).format("DD MMM YYYY") }}
        </p>
        <v-btn
          exact
          :to="'/subscription'"
          color="primary"
          rounded
          depressed
          large
          >Renew my subscription</v-btn
        >
      </template>
    </div>
  </v-overlay>
</template>

<script>
export default {};
</script>

<style>
</style>