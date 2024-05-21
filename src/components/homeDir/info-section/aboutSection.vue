<!-- src\components\homeDir\info-section\aboutSection.vue -->

<script>
export default {
  name: "AboutSection",
};
</script>

<template>
  <div class="about-section">
    <h1>Welcome to CoPlaylist!</h1>
    <p>
      CoPlaylist is at the forefront of personalized music streaming, transforming how users discover and enjoy music. By leveraging advanced algorithms, CoPlaylist tailors every playlist to the unique tastes and situational preferences of its users.
    </p>
    <p>
      Whether you're looking to set the mood with the right vibes or dive deep into a specific musical tone, CoPlaylist is your ultimate musical companion. Our platform is designed not just to play music but to understand and enhance your listening experience.
    </p>
    <h2>Features at a Glance:</h2>
    <ul>
      <li><strong>User Profiles:</strong> Tailor your music experience by recording your musical tastes and favorite tracks.</li>
      <li><strong>Vibes and Tone:</strong> Select your current mood or desired ambiance and let CoPlaylist do the rest, ensuring every playlist matches your current state.</li>
      <li><strong>Dynamic Playlists:</strong> Experience adaptive playlists that not only reflect the time of day but the ebb and flow of your life.</li>
      <li><strong>Social Sharing:</strong> Share your music experiences, discover community favorites, and connect with friends through music.</li>
    </ul>
    <p>
      At CoPlaylist, we are passionate about music and the ways it can connect and inspire people. We are constantly refining our technology to ensure that your next favorite song is always at your fingertips, personalized just for you.
    </p>
    <h2>Join Us on Our Musical Journey</h2>
    <p>
      Ready to explore a new era of music streaming? Sign up today and start your personalized musical adventure with CoPlaylist. It's more than a music app—it's your personal music journey, crafted uniquely for you.
    </p>
  </div>
</template>

<style scoped>
.about-section {
  padding: 10px;
  padding-bottom: 40px;
  line-height: 1.6;
  font-size: 1rem;
  color: #333;
  width: 100%;
  margin-bottom: 2rem;
}

.about-section h1, .about-section h2 {
  color: #507cac;
}

.about-section h1 {
  font-size: 1.6rem;
}

.about-section ul {
  margin-top: 10px;
  list-style-type: none;
  padding-left: 20px;
}

.about-section ul li::before {
  content: "✔";
  color: #507cac;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1.5em;
}
</style>
