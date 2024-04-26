<template>
  <div id="simon-game" class="simon-game">
    <h1>Simon The Game</h1>

    <button @click="startGame">Начать игру</button>

    <select v-model="difficulty">
      <option value="easy">Легкий</option>
      <option value="normal">Средний</option>
      <option value="hard">Сложный</option>
    </select>

    <div class="wrapper">
      <div v-for="color in ['red', 'blue', 'green', 'yellow']" :key="color"
           :aria-label="'Press ' + color + ' button'"
           :class="{'active': activeButton === color}"
           @click="handleButtonPress(color)"
           :style="{ backgroundColor: color, opacity: activeButton === color ? 0.6 : 1 }"
           class="button">
      </div>
    </div>

    <p> Раунд {{round}}</p>

    <p v-if="gameover">Игра окончена! Вы достигли раунда {{ round }}.</p>

  </div>
</template>

<script>
export default {
  name: "SimonGame",
  data() {
    return {
      sequence: [],
      copy: [],
      round: 0,
      active: true,
      mode: 'normal',
      difficulty: 'normal',
      gameover: false,
      difficultySettings: {
        easy: 1500,
        normal: 1000,
        hard: 400
      },
      activeButton: null,
    };
  },
  methods: {
    startGame() {
      this.sequence = [];
      this.copy = [];
      this.round = 0;
      this.active = false;
      this.gameover = false;
      this.activeButton = null;
      this.newRound();
    },
    newRound() {
      this.round++;
      this.sequence.push(this.randomNumber());
      this.copy = [];
      setTimeout(() => this.animate(), 1000);
    },
    registerClick(color) {
      const colors = ['red', 'blue', 'green', 'yellow'];
      const expectedColor = colors[this.sequence[this.copy.length]];
      if (color === expectedColor) {
        this.copy.push(color);
        if (this.copy.length === this.sequence.length) {
          setTimeout(() => this.newRound(), 1000);
        }
      } else {
        this.endGame();
      }
    },

    handleButtonPress(color) {
      if (!this.active || this.gameover) return;
      this.playSound(color);
      this.lightUp(color);
      this.registerClick(color);
    },
    endGame() {
      this.gameover = true;
      this.round = 0;
      this.activeButton = null;
    },
    changeMode(mode) {
      this.mode = mode;
    },
    randomNumber() {
      return Math.floor(Math.random() * 4);
    },
    animate() {
      let index = 0;
      this.active = false;
      const interval = setInterval(() => {
        const color = ['red', 'blue', 'green', 'yellow'][this.sequence[index]];
        this.lightUp(color);
        this.playSound(color);
        index++;
        if (index >= this.sequence.length) {
          clearInterval(interval);
          this.active = true;
        }
      }, this.difficultySettings[this.difficulty]);
    },

    lightUp(tile) {
      this.activeButton = tile;
      setTimeout(() => {
        this.activeButton = null;
      }, 300);
    },
    playSound(color) {
      const sounds = {
        red: '/sounds/1.mp3',
        blue: '/sounds/2.mp3',
        green: '/sounds/3.mp3',
        yellow: '/sounds/4.mp3'
      };
      const audio = new Audio(sounds[color]);
      audio.play()
    },
  },
}
</script>

<style lang="scss" scoped>
.simon-game{
  height: 100%;
  width: 100%;
  margin: 0 auto;
  max-width: 300px;

  .wrapper{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    justify-items: center;
    padding: 20px;
  }

  .button {
    border: none;
    border-radius: 10px;
    transition: background-color 0.3s, transform 0.2s;
    aspect-ratio: 1 / 1;
    height: 100px;

    &:hover {
      transform: scale(1.1);
    }

    &.active {
      opacity: 1;
      filter: brightness(150%);
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
    }
  }
}

</style>