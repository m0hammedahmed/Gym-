import img1 from '../data/2.jpg';
import img2 from '../data/3.jpg';
import img3 from '../data/4.jpg';
import img4 from '../data/5.jpg';
import img5 from '../data/6.jpg';

import vid1 from '../data/ved.mp4';
import vid2 from '../data/ved.mp4';
import vid3 from '../data/ved.mp4';
import vid4 from '../data/ved.mp4';
import vid5 from '../data/ved.mp4';

const workoutData = [
  {
    title: "Beginner Friendly",
    image: img1,
    video: vid1,
    description: "This program is designed for complete beginners with easy-to-follow workouts to build base strength and mobility.",
  },
  {
    title: "Moderate to Advanced",
    image: img2,
    video: vid2,
    highlighted: true,
    description: "Targeted for intermediate and advanced users looking to challenge themselves with progressive training techniques.",
  },
  {
    title: "Weight Loss",
    image: img3,
    video: vid3,
    description: "Burn fat and boost metabolism with this high-intensity cardio and strength combo plan.",
  },
  {
    title: "No Equipment",
    image: img4,
    video: vid4,
    description: "A bodyweight-only program you can do anytime, anywhere. Perfect for home workouts.",
  },
  {
    title: "Strength Training",
    image: img5,
    video: vid5,
    description: "Focused on building muscle and improving strength through compound lifts and hypertrophy work.",
  }
];

export default workoutData;
