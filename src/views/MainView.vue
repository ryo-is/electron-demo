<template lang="pug">
  .home
    //- v-btn(to="/users") users
    //- v-btn(@click="onNotification") notification
    .timer-area.mt-8
      v-progress-circular(
        rotate=270
        size=240
        :value="value"
        width=24
        :color="color"
      )
        v-row.justify-center
          v-col(cols=12)
            .display-1 {{ elapsedTime }}
          v-col(cols=12).pa-0
            .title {{ minites }}
            .caption mins
      v-row.mt-6.justify-center.align-center
        v-col(cols=3).pa-0
          v-text-field(v-model.number="minites", type="number", label="Set minutes", min=1, :disabled="disabled")
        v-col(cols=1).pa-0 mins
        v-col(cols=12).pa-0
          v-row(justify="center")
            v-col(cols=3).pa-0
              v-btn(color="primary", @click="timerStart") Start
            //- v-col(cols=3).pa-0
            //-   v-btn(color="warning", @click="timerStop") Stop
            v-col(cols=3).pa-0
              v-btn(color="error", @click="timerReset") Reset
</template>

<script lang="ts">
import Vue from 'vue'

type DataType = {
  value: number
  color: string
  minites: number
  disabled: boolean
  elapsedTime: number
  setSeconds: number
  intervalEvent: null | NodeJS.Timeout
}

enum Color {
  PRIMARY = 'primary',
  WARNING = 'warning',
  ERROR = 'error',
}

export default Vue.extend({
  data(): DataType {
    return {
      value: 0,
      color: Color.PRIMARY,
      minites: 1,
      disabled: false,
      elapsedTime: 0,
      setSeconds: 0,
      intervalEvent: null,
    }
  },
  watch: {
    color(newColor: string) {
      switch (newColor) {
        case Color.WARNING:
          this.onNotification('75% digested')
          break
        case Color.ERROR:
          this.onNotification('90% digested')
          break
        default:
          break
      }
    },
  },
  methods: {
    timerStart() {
      this.disabled = true
      this.setSeconds = this.minites * 60
      this.intervalEvent = setInterval(() => {
        this.elapsedTime++
        this.value = (this.elapsedTime / this.setSeconds) * 100
        console.log(this.value)
        if (
          this.value >= 75 &&
          this.value < 90 &&
          this.color !== Color.WARNING
        ) {
          this.color = Color.WARNING
        } else if (
          this.value >= 90 &&
          this.value < 100 &&
          this.color !== Color.ERROR
        ) {
          this.color = Color.ERROR
        } else if (this.value >= 100) {
          this.timerReset()
          this.onNotification('Time Over')
        }
      }, 1000)
    },
    timerStop() {
      // TimerのStopは一旦後回し
      console.log('stop')
    },
    timerReset() {
      if (this.intervalEvent !== null) clearInterval(this.intervalEvent)
      this.value = 0
      this.elapsedTime = 0
      this.color = Color.PRIMARY
      this.disabled = false
    },
    onNotification(bodyText: string) {
      // actionはServiceWorker内でのみサポート
      new Notification('Timer notification', {
        body: bodyText,
      })
    },
  },
})
</script>
