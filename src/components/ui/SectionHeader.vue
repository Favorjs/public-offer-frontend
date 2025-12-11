<template>
  <div class="header">
    <div class="icon" v-if="icon">
      <span>{{ icon }}</span>
    </div>
    <div>
      <h2>{{ title }}</h2>
      <p class="muted">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' }
})
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border);
}

.icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  display: grid;
  place-items: center;
  font-size: 1.3rem;
  box-shadow: 0 10px 28px rgba(91, 123, 254, 0.28);
}

h2 {
  margin: 0;
  color: var(--text-strong);
  font-size: 1.35rem;
}

.muted {
  margin: 0.1rem 0 0;
  color: var(--text-muted);
}
</style>

