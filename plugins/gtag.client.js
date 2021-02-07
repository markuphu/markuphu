export default ({ isDev }) => {
  if (isDev) {
    return
  }

  const MEASUREMENT_ID = 'G-KBJJEQQ02P'

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []

  function gtag () { dataLayer.push(arguments) }

  gtag('js', new Date())
  gtag('config', 'G-KBJJEQQ02P')
}
