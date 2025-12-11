<template>
  <div class="block">
    <div class="block__title">{{ title }}</div>
    <div class="block__list">
      <div v-for="item in items" :key="item.label" class="row">
        <span class="label">{{ item.label }}</span>
        <span class="value">{{ item.value || '—' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  items: { type: Array, default: () => [] }
})
</script>

<style scoped>
.block {
  padding: 1rem;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: #f8fafc;
}

.block__title {
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text-strong);
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.row:last-child {
  border-bottom: none;
}

.label {
  color: var(--text-muted);
}

.value {
  font-weight: 700;
  color: var(--text-strong);
}
</style>

