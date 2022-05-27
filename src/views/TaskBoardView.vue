<template>
  <div>
    <div class="header">Trello Board</div>
    <div class="">
      <div class="cardwall w-100 d-flex bd-highlight overflow-scroll">
        <div v-for="index in range(7)" :key="index" class="p-2 lane">
          <div class="lane-title">{{ laneTitle() }}</div>

          <div class="card" v-for="index in range(1)" :key="index">
            <div>Card Header</div>
            <div class="card-body">
              <div class="card-title">Title</div>
              <div class="card-text">
                {{ sentence() }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum();

const sentence = () => lorem.generateSentences(2);
const laneTitle = () => lorem.generateWords(2);
const range = (max) => Math.floor(Math.random() * max + 3);
</script>

<style>
.cardwall {
}
.lane {
  min-width: 250px;
  max-width: 250px;
  border: 1px solid blue;
  background-color: lightblue;
}
.lane-title {
  background-color: beige;
  font-weight: 900;
  padding-bottom: 10px;
}
.card {
  margin-bottom: 10px;
}
.card-body {
  border-top: 2px solid darkgray;
}
.bd-highlight {
  border: 1px solid gray;
  background-color: lightcyan;
}
</style>
