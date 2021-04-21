<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@font-face {
  font-family: 'MyFontName';
  src:url(assets/font/myFont.ttf);
}
body, html{
  margin: 0;
  padding: 0;
  font-family:MyFontName;
}
</style>
