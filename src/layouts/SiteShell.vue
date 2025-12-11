<template>
  <div class="shell">
    <header class="topbar">
      <div class="page-width topbar__inner">
        <div class="brand" @click="goHome">
          <div class="brand__mark">TIP</div>
          <div class="brand__text">
            <strong>The Initiates PLC</strong>
            <small>Public Offer</small>
          </div>
        </div>
        <nav class="nav">
          <RouterLink to="/" class="nav__link" exact-active-class="is-active">Overview</RouterLink>
          <RouterLink to="/apply" class="nav__link" active-class="is-active">Apply</RouterLink>
          <RouterLink to="/submission/demo" class="nav__link nav__ghost">Sample PDF</RouterLink>
        </nav>
        <RouterLink to="/apply" class="cta">Start Application</RouterLink>
      </div>
    </header>

    <main class="page-width content">
      <RouterView />
    </main>

    <footer class="footer page-width">
      <div class="footer__brand">
        <div class="brand__mark">TIP</div>
        <div>
          <div class="footer__title">The Initiates PLC</div>
          <div class="footer__sub">Sustainable Waste Management Leaders</div>
        </div>
      </div>
      <div class="footer__links">
        <a href="mailto:support@initiatesplc.com">support@initiatesplc.com</a>
        <span>•</span>
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
      </div>
    </footer>
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
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
}

.topbar__inner {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.brand__mark {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 800;
  letter-spacing: 0.5px;
  box-shadow: 0 12px 30px rgba(91, 123, 254, 0.25);
}

.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  color: var(--text-strong);
}

.brand__text small {
  color: var(--text-muted);
}

.nav {
  display: inline-flex;
  gap: 0.75rem;
  align-items: center;
}

.nav__link {
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  color: var(--text-muted);
  font-weight: 600;
  transition: all 0.2s ease;
}

.nav__link:hover {
  color: var(--text-strong);
  background: rgba(91, 123, 254, 0.08);
}

.nav__link.is-active {
  color: var(--primary-dark);
  background: rgba(91, 123, 254, 0.14);
}

.nav__ghost {
  background: rgba(14, 165, 233, 0.08);
  color: #0284c7;
}

.cta {
  justify-self: end;
  padding: 0.7rem 1.4rem;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  font-weight: 700;
  box-shadow: 0 15px 35px rgba(91, 123, 254, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 40px rgba(91, 123, 254, 0.45);
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0 2rem;
  border-top: 1px solid rgba(226, 232, 240, 0.8);
  color: var(--text-muted);
  flex-wrap: wrap;
  gap: 1rem;
}

.footer__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.footer__title {
  font-weight: 700;
  color: var(--text-strong);
}

.footer__links {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
}

@media (max-width: 900px) {
  .topbar__inner {
    grid-template-columns: 1fr;
    justify-items: start;
  }

  .nav {
    order: 3;
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0.25rem;
  }

  .cta {
    order: 2;
    justify-self: start;
  }
}
</style>

