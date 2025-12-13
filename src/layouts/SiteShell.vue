<template>
  <div class="shell">
    <header class="topbar">
      <div class="page-width topbar__inner">
        <div class="brand" @click="goHome">
  
          <div class="brand__text">
            <strong>The Initiates PLC</strong>
            <small>Public Offer</small>
          </div>
        </div>
        <nav class="nav">
          <a
            class="nav__link nav__ghost"
            href="https://res.cloudinary.com/apelng/image/upload/v1761666927/TIP_PUBLIC_OFFER_cqmqxz.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Download PDF
          </a>
        </nav>
      </div>
    </header>

    <main class="page-width content">
      <RouterView />
    </main>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'SiteShell',
  setup() {
    const router = useRouter()
    const goHome = () => router.push('/')
    return { goHome }
  }
}
</script>

<style scoped>
.shell {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  gap: 2rem;
}

.content {
  flex: 1;
  width: 100%;
  padding: 1rem 0 3rem;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e5e7eb;
}

.topbar__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1rem 1.25rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  min-width: 200px;
}

.brand__mark {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #107b5f;
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  color: #1f2937;
}

.brand__text small {
  color: #6b7280;
}

.nav {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.nav__link {
  padding: 0.55rem 1rem;
  border-radius: 8px;
  color: #6b7280;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.nav__link:hover {
  color: #1f2937;
  background: #f3f4f6;
}

.nav__link.is-active {
  color: #107b5f;
  background: rgba(16, 123, 95, 0.1);
}

.nav__ghost {
  background: rgba(37, 99, 235, 0.08);
  color: #2563eb;
}

.nav__ghost:hover {
  background: rgba(37, 99, 235, 0.12);
}

@media (max-width: 640px) {
  .topbar__inner {
    gap: 0.75rem;
    padding: 0.75rem 1rem;
  }

  .brand {
    min-width: auto;
    flex: 1;
  }

  .brand__text {
    font-size: 0.9rem;
  }

  .brand__text strong {
    font-size: 0.95rem;
  }

  .brand__text small {
    font-size: 0.75rem;
  }

  .nav {
    flex-shrink: 0;
  }

  .nav__link {
    padding: 0.5rem 0.875rem;
    font-size: 0.85rem;
    white-space: nowrap;
  }
}
</style>
