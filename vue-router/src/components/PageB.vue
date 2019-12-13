<template>
  <div>
    page-B
    {{$route.params['id']}}
    {{id}}
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: ['id'],
  beforeCreate() {},
  created() {

  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>

<style scoped>
</style>