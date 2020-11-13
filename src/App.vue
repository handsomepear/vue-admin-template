<template>
  <div>
    <keep-alive v-if="$route.meta.isKeep">
      <router-view />
    </keep-alive>
    <router-view v-else />
  </div>
</template>

<style lang="scss"></style>
