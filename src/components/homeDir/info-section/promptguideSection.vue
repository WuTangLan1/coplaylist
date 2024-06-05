<!-- src\components\homeDir\info-section\promptguideSection.vue -->

<script>
export default {
  name: "PromptGuideSection",
};
</script>

<template>
  <div class="prompt-guide-section">
    <h1>How to Provide Effective Inputs</h1>
    <p>Getting the most out of CoPlaylist depends on how well the system understands your musical preferences. Here’s how you can provide effective inputs:</p>
    
    <h2>1. Selecting Genres and Eras</h2>
    <p>Choose genres and eras that you feel most resonate with your current mood or the atmosphere you wish to create. Selecting a diverse range of genres and eras can help the system discover and blend a wider array of music that still aligns with your tastes.</p>
    
    <h2>2. Defining Vibes</h2>
    <p>Vibes are crucial for setting the tone of your playlist. Think about what you are currently doing or how you want to feel while listening to your playlist. Whether you’re looking to relax or energize yourself, selecting the appropriate vibe can greatly influence the playlist’s direction.</p>
    
    <h2>3. Activities and Settings</h2>
    <p>Link your music to specific activities or settings (like studying, working out, or a quiet evening) to get playlists that enhance those experiences. This contextual information helps the system tailor its selections more accurately.</p>
    
    <h2>4. Song Preferences</h2>
    <p>While the system won’t include these songs directly in your playlists, mentioning a few of your favorite songs helps establish a baseline for your tastes. This is especially useful for discovering new music with similar vibes or elements.</p>
    
    <h2>5. Using the Feedback System</h2>
    <p>After listening to the playlists, rate them. This feedback is invaluable for refining future playlists. The more you interact with the rating system, the better CoPlaylist becomes at predicting what you’ll love.</p>
    
    <h2>Challenges with Working with AI</h2>
    <p>Working with AI can sometimes be challenging, especially for those who are not familiar with how it operates. Here are some common issues and tips on how to navigate them:</p>
    
    <h3>1. Understanding AI Limitations</h3>
    <p>AI systems, like the one used in CoPlaylist, are incredibly powerful but not infallible. They rely on the data they have been trained on and the inputs they receive from users. Sometimes, the recommendations may not be perfect, especially in the beginning. Over time, as you provide more feedback and interact with the system, it will improve.</p>
    
    <h3>2. Providing Clear and Specific Inputs</h3>
    <p>The quality of the output greatly depends on the quality of the input. When selecting genres, eras, or vibes, be as specific as possible. Vague inputs can lead to less accurate playlist recommendations. For example, instead of just selecting "Rock," try specifying "Classic Rock" or "Indie Rock" if that's more in line with your taste.</p>
    
    <h3>3. Regularly Updating Preferences</h3>
    <p>Your musical tastes might evolve over time. It’s important to regularly update your preferences to ensure that the playlists continue to match your current tastes. This includes updating your favorite and disliked artists, as well as any new songs you might have discovered.</p>
    
    <h3>4. Patience and Iteration</h3>
    <p>Getting the perfect playlist might take a few tries. Be patient and willing to iterate. The more you use CoPlaylist and provide feedback, the better it will get at understanding your preferences. Think of it as a collaborative process between you and the AI.</p>
    
    <h3>5. Understanding Privacy Concerns</h3>
    <p>AI systems require data to function effectively, and it’s natural to have concerns about privacy. CoPlaylist takes data security seriously, ensuring that your personal information and musical preferences are kept safe. You can review our privacy policy to understand how your data is used and protected.</p>
    
    <h3>6. Balancing Personalization and Discovery</h3>
    <p>While it's great to have playlists tailored to your tastes, don't forget to leave room for discovery. Allowing the system to introduce new genres or artists can enrich your musical experience. Balance your preferences with an openness to explore new musical horizons.</p>

    <p>By carefully selecting each input and regularly updating your preferences, you can continually enhance the personalization of your playlists. Enjoy a musical experience that is uniquely yours with CoPlaylist!</p>
  </div>
</template>

<style scoped>
.prompt-guide-section {
  padding: 10px;
  line-height: 1.6;
  font-size: 1rem;
  color: #333;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding-bottom: 50px;
}

.prompt-guide-section h1 {
  color: #507cac;
  font-size: 1.7rem;
  margin-bottom: 1rem;
}

.prompt-guide-section h2 {
  color: #507cac;
  font-size: 1.4rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.prompt-guide-section h3 {
  color: #345f8d;
  font-size: 1.2rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.prompt-guide-section p {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  text-align: justify;
}

.prompt-guide-section ul {
  list-style-type: disc;
  margin-left: 20px;
}

.prompt-guide-section li {
  margin-bottom: 0.5rem;
}
</style>
