<template>
  <div class="instruction-block">
    <h2>{{ heading }}</h2>
    <div class="instruction-container">
      <Instruction
        v-for="(instruction, ix) in instructions"
        :key="ix"
        :instruction="instruction"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    instructionBlock: {
      type: Object,
      required: true
    }
  },
  computed: {
    heading() {
      return this.instructionBlock?.heading
    },
    instructions() {
      return this.instructionBlock?.instructions
    }
  }
}
</script>

<style lang="scss">
.instruction-block {
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-bottom: 64px;
  }

  .instruction-container {
    @include breakpoint('tablet') {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 54px;
    }
  }
}
</style>
