<template>
  <div class="modal">
    <div class="overlay" @click="emit('close')"></div>
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>

<script>
import useKeydown from '../../composables/use-keydown'

export default {
  setup(props, { emit }) {
    useKeydown([
      { key: 'Escape', action: () => emit('close')},
      { key: 'Enter', action: () => console.log('We can handle several key events with a single instance of this composable') },
  ])

    return {
      emit,
    }
  }
}
</script>

<style lang="scss" scoped></style>