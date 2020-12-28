<script>
export default {
  props: {
    type: {
      type: String,
      default: 'normal',
    },
    text: {
      type: String,
      default: '',
    },
  },

  render(h) {
    return h('button', {
      class: {
        btn: true,
        ['btn-' + this.type]: true,
      },
      domProps: {
        innerText: this.text,
      },
      on: {
        click: this.handleClick,
      },
    })
  },
  methods: {
    handleClick() {
      this.$emit('click')
    },
  },
}
</script>

<style scoped>
.btn {
  width: 100px;
  height: 40px;
  line-height: 40px;
  border: 0;
  border-radius: 5px;
  color: #fff;
}
.btn-success {
  background: #2ecc71;
}
.btn-danger {
  background: #e74c3c;
}
.btn-warning {
  background: #f39c12;
}
.btn-normal {
  background-color: var(--primary-color);
}
</style>
