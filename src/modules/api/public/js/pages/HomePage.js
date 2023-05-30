import ButtonCounter from "../components/ButtonCounter.js"

export default {
  data() {
    return {
      title: 'Home 1',
    }
  },
  components: [ButtonCounter],
  template: /*html*/`
  <div>
    Hello {{ title }}
  </div>
  <button-counter></button-counter>
  `,
  methods: {
    alertHello() {
      alert("hello")
    }
  }
}
