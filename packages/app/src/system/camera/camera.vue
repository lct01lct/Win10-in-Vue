<script lang="ts" setup>
  import { Base } from '../../';
  import { cameraAppName, CameraLogo } from '.';

  navigator.mediaDevices
    .getUserMedia({ video: { width: 340, height: 280 }, audio: true })
    .then((MediaStream) => {
      const video = document.querySelector<HTMLVideoElement>('#camera-app-video');

      if (video) {
        video.srcObject = MediaStream;
        video.play();
      } else {
        alert('敬请期待!');
      }
    });

  onBeforeUnmount(() => {
    const video = document.querySelector<HTMLVideoElement>('#camera-app-video');
    const stream = video?.srcObject;

    // @ts-ignore
    const tracks = stream?.getTracks();
    // @ts-ignore
    tracks?.forEach(function (track) {
      track.stop(); //停止视频流
    });

    if (video) {
      video.srcObject = null;
    }
  });

  const takePhoto = () => {
    const canvas = document.querySelector<HTMLCanvasElement>('#camera-app-canvas');
    const video = document.querySelector<HTMLVideoElement>('#camera-app-video');
    console.log(1, video, canvas);
    if (video && canvas) {
      const ctx = canvas?.getContext('2d');
      ctx?.drawImage(video, 0, 0, 340, 280);
      const img = ctx?.canvas.toDataURL('image/png');
      // TODO:
      console.log(img);
    }
  };
</script>

<template>
  <Base :appName="cameraAppName" :appLogo="CameraLogo">
    <template #body>
      <div class="camera-app__body">
        <video id="camera-app-video" autoplay></video>
        <div class="take-photo-btn" @click="takePhoto" style="color: #fff">photo</div>
        <canvas id="camera-app-canvas"></canvas>
      </div>
    </template>
  </Base>
</template>

<style scoped lang="scss">
  .camera-app__body {
    width: 100%;
    height: 100%;
    background-color: #000;

    .camera-app-video {
      width: 340px;
      height: 280px;
    }
  }

  #camera-app-canvas {
    display: none;
  }
</style>
