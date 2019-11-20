<template>
  <div class="home">
    <img src="../assets/logo.png">
    <v-clork></v-clork>
    <div class="btn" v-track:demo="{arg1: 1}">click me</div>
    <h3>mock api return value</h3>
    <h4>object</h4>
    <textarea name="object" cols="30" rows="10" :value="JSON.stringify(object)">
    </textarea>
    <h4>array</h4>
    <ul>
      <li v-for="item in list" :key="item.id">
        {{item.ip}}-{{item.time}}-{{item.number}}
      </li>
    </ul>

    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script src='./Home.js'></script>
