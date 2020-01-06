<template>
  <div class="uc-item">
    <img :style="{zIndex:zIndex,height:height,width:width}" :src="image" class="uc-thumb">
    <div class="uc-info">
      <div class="uc-info-roles-container">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UcThumb',
  props: {
    image: {
      type: String,
      required: true
    },
    zIndex: {
      type: Number,
      default: 1
    },
    width: {
      type: String,
      default: '150px'
    },
    height: {
      type: String,
      default: '150px'
    }
  }
};
</script>

<style scoped>
.uc-item {
  display: inline-block;
  position: relative;
  cursor: default;
}

.uc-info-roles-container {
  /* padding: 20px; */
  text-align: center;
}

.uc-thumb {
  width: 200px;
  height: 200px;
  background-size: 100%;
  border-radius: 50%;
  overflow: hidden;
  /* position: absolute; */
  transform-origin: 95% 40%;
  transition: all 0.3s ease-in-out;
}

.uc-thumb:after {
  content: '';
  width: 8px;
  height: 8px;
  position: absolute;
  border-radius: 50%;
  top: 40%;
  left: 95%;
  margin: -4px 0 0 -4px;
  background: radial-gradient(
      ellipse at center,
      rgba(14, 14, 14, 1) 0%,
      rgba(125, 126, 125, 1) 100%);
  box-shadow: 0 0 1px rgba(255, 255, 255, 0.9);
}

.uc-info {
  /* position: absolute; */
  top: 100%;
  width: inherit;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  /* box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05); */
}

.uc-info h3 {
  color: #fff;
  text-transform: uppercase;
  position: relative;
  letter-spacing: 2px;
  font-size: 18px;
  margin: 0 60px;
  padding: 22px 0 0 0;
  height: 85px;
  font-family: 'Open Sans', Arial, sans-serif;
  text-shadow: 0 0 1px #fff, 0 1px 2px rgba(0, 0, 0, 0.3);
}

.uc-info p {
  color: #fff;
  padding: 10px 5px;
  font-style: italic;
  margin: 0 30px;
  font-size: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
}

.uc-info p a {
  display: block;
  color: #333;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  color: #fff;
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 9px;
  letter-spacing: 1px;
  padding-top: 24px;
  margin: 7px auto 0;
  font-family: 'Open Sans', Arial, sans-serif;
  opacity: 0;
  transition:
    transform 0.3s ease-in-out 0.2s,
    opacity 0.3s ease-in-out 0.2s,
    background 0.2s linear 0s;
  transform: translateX(60px) rotate(90deg);
}

</style>
