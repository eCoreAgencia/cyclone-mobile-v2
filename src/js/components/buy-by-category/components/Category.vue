<template>
  <li>
    <a @click="$emit('onButtonClick', id)">
      {{ name }}
    </a>
  </li>
</template>

<script>

  export default {
    props: {
      id: Number,
      name: String,
      url: String

    }
  }
</script>
