<template>
  <label class="field">
    <div class="field__label">
      <span>{{ label }}</span>
      <span v-if="required" class="req">*</span>
    </div>
    <slot />
  </label>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  required: { type: Boolean, default: false }
})
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-weight: 600;
  color: var(--text-strong);
}

.field__label {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.req {
  color: #ef4444;
}
</style>

