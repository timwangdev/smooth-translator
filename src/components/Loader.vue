<template>
  <div class="loader"></div>
</template>

<style lang="scss">
$color_loader_dark: #8fc2e4;
$color_loader_light: #eeeeee;

.loader {
	position: absolute;
	top: 0;
	left: 0;
  width: 100%;
  height: 2px;
  
  background-color: #eeeeee;
  background-image: linear-gradient(-45deg, $color_loader_light, $color_loader_dark );
  background-size: 120px 2px;
  animation: move 1s linear infinite;
}
@keyframes move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 120px 0;
  }
}
</style>
