<template>
  <div class="container">
    <h1>Welcome to Heroes & Villains</h1>

    <audio src="../../public/superhero.mp3" autoplay loop>
        <p>If you are reading this, it is because your browser does not support the audio element.</p>
    </audio>

    <div class="album">
      <img src="https://www.danstafaceb.com/wp-content/uploads/2022/12/76d7b31e5541233de4e4067ec2644ae5.jpeg" alt="METROOOOO" width="50%">
      <iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/7txGsnDSqVMoRl6RQ9XyZP?utm_source=generator&theme=0" width="500" height="500" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'HomeView',
  }
</script>

<style scoped>
.container {
  width: 100vw;
}

h1 {
  text-align: center;
}

.album {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.album > * {
  margin: auto 1rem;
}
</style>