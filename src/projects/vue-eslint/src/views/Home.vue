<template>
  <div class="home">
    <v-clork></v-clork>
    <el-switch
      active-text="按月付费"
      inactive-text="按年付费">
    </el-switch>
    <br />
    <el-button
      type="primary"
      v-track:demo="{arg1: 1}"
    >
      click me to track event
    </el-button>

    <h3>mock api return value</h3>
    <el-button
      type="primary"
      @click="genMockData"
    >
      click me to generator mock data
    </el-button>
    <h4>object</h4>
    <textarea name="object" cols="30" rows="10" :value="JSON.stringify(object)">
    </textarea>
    <h4>array</h4>
    <ul>
      <li v-for="item in pageList.list" :key="item.id">
        {{item.ip}}-{{item.time}}-{{item.number}}
      </li>
    </ul>

    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script src='./Home.js'></script>
