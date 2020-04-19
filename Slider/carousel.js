const track = document.querySelector('.carousel__track')
const slides = [...track.children]
const prevBtn = document.querySelector('.carousel__button--left')
const nextBtn = document.querySelector('.carousel__button--right')
const dotsNav = document.querySelector('.carousel__nav')
const dots = [...dotsNav.children]

const slideWidth = slides[0].getBoundingClientRect().width

const setSlidePosition = (slide, index) => {
  slide.style.left = `${slideWidth * index}px`
}
slides.forEach(setSlidePosition)

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`
  currentSlide.classList.remove('current-slide')
  targetSlide.classList.add('current-slide')
}

const udpateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('active')
  targetDot.classList.add('active')
}

const hideShowArrows = (slides, prevBtn, nextBtn, targetIndex) => {
  if (targetIndex === 0) {
    prevBtn.classList.add('is-hidden')
    nextBtn.classList.remove('is-hidden')
  } else if (targetIndex === slides.length - 1) {
    prevBtn.classList.remove('is-hidden')
    nextBtn.classList.add('is-hidden')
  } else {
    prevBtn.classList.remove('is-hidden')
    nextBtn.classList.remove('is-hidden')
  }
}

prevBtn.addEventListener('click', () => {
  const currentSlide = track.querySelector('.current-slide')
  const prevSlide = currentSlide.previousElementSibling

  const currentDot = dotsNav.querySelector('.active')
  const prevDot = currentDot.previousElementSibling

  const prevIndex = slides.findIndex(slide => slide === prevSlide)

  moveToSlide(track, currentSlide, prevSlide)
  udpateDots(currentDot, prevDot)
  hideShowArrows(slides, prevBtn, nextBtn, prevIndex)
})

nextBtn.addEventListener('click', () => {
  const currentSlide = track.querySelector('.current-slide')
  const nextSlide = currentSlide.nextElementSibling

  const currentDot = dotsNav.querySelector('.active')
  const nextDot = currentDot.nextElementSibling

  const nextIndex = slides.findIndex(slide => slide === nextSlide)

  moveToSlide(track, currentSlide, nextSlide)
  udpateDots(currentDot, nextDot)
  hideShowArrows(slides, prevBtn, nextBtn, nextIndex)
})

dotsNav.addEventListener('click', e => {
  const targetDot = e.target.closest('button')

  if (!targetDot) return

  const currentSlide = track.querySelector('.current-slide')
  const currentDot = dotsNav.querySelector('.active')

  const targetIndex = dots.findIndex(dot => dot === targetDot)
  const targetSlide = slides[targetIndex]

  moveToSlide(track, currentSlide, targetSlide)
  udpateDots(currentDot, targetDot)
  hideShowArrows(slides, prevBtn, nextBtn, targetIndex)
})
