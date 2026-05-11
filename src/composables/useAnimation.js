import { onMounted, ref } from 'vue'

export function useScrollReveal() {
  const elements = ref([])

  const observe = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el)
    })
  }

  const setupCharAnimation = () => {
    document.querySelectorAll('.char-by-char').forEach((el) => {
      const text = el.textContent || ''
      el.textContent = ''
      el.style.visibility = 'visible'
      text.split('').forEach((char, i) => {
        const span = document.createElement('span')
        span.className = 'char-animate'
        span.textContent = char === ' ' ? '\u00A0' : char
        span.style.animationDelay = `${i * 0.03 + 0.2}s`
        el.appendChild(span)
      })
    })
  }

  onMounted(() => {
    observe()
    setupCharAnimation()
  })

  return { observe }
}
