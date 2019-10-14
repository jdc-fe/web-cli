<template>
  <div class="home">
    <v-clork></v-clork>
    <el-switch
      active-text="按月付费"
      inactive-text="按年付费">
    </el-switch>
    <br />
    <el-button v-track:demo="{arg1: 1}" type="primary" round>
      click me for track
    </el-button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script src='./Home.js'></script>
