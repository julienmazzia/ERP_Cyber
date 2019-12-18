<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/client">Client</router-link> |
      <router-link to="/rh">RH</router-link> |
      <router-link to="/plan">Plan</router-link> |
      <router-link to="/pieces">Pièces</router-link>
    </div>
    <router-view/>
  </div>
</template>
