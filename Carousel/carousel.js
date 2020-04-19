const API_URL = 'https://picsum.photos/v2/list?page=5&limit=5'

const track = document.querySelector('.carousel__track')
const prevBtn = document.querySelector('.carousel__btn--left')
const nextBtn = document.querySelector('.carousel__btn--right')
const dotsNav = document.querySelector('.carousel__nav')
let slides = []
let dots = []

// FUNCTIONS
const getData = async API_URL => {
  const res = await fetch(API_URL)
  const data = await res.json()
  return data
}

const pushSlidesToArray = image => {
  const li = document.createElement('li')
  li.classList.add('carousel__slide')

  const img = new Image()
  img.src = image.download_url
  img.alt = image.author
  img.classList.add('carousel__img')

  li.appendChild(img)
  slides.push(li)
  slides[0].classList.add('current-slide')
}

const pushDotsToArray = () => {
  const button = document.createElement('button')
  button.classList.add('carousel__indicator')
  dots.push(button)
  dots[0].classList.add('active')
}

const pushElements = images => {
  images.forEach(image => {
    pushSlidesToArray(image)
    pushDotsToArray()
  })
}

const renderElements = (elements, container) => {
  const docFrag = document.createDocumentFragment()
  elements.forEach(el => docFrag.appendChild(el))

  container.appendChild(docFrag)
}

const moveToSlide = (track, currentSlide, targetSlide) => {
  const currentIndex = slides.findIndex(slide => slide === currentSlide)
  const targetIndex = slides.findIndex(slide => slide === targetSlide)
  currentSlide.classList.remove('current-slide')

  const lastIndex = slides.length - 1
  let position = `-${targetIndex * 100}%`
  let slide = targetSlide

  if (currentIndex === 0 && targetIndex === -1) {
    position = `-${lastIndex * 100}%`
    slide = slides[lastIndex]
  } else if (currentIndex === lastIndex && targetIndex === -1) {
    position = '0'
    slide = slides[0]
  }

  track.style.setProperty('--position', position)
  slide.classList.add('current-slide')
}

const run = async () => {
  const images = await getData(API_URL)
  pushElements(images)
  console.log(slides, dots)
  renderElements(slides, track)
  renderElements(dots, dotsNav)
}

// LISTENERS
prevBtn.addEventListener('click', () => {
  const currentSlide = slides.find(slide => slide.classList.contains('current-slide'))
  const prevSlide = currentSlide.previousElementSibling

  moveToSlide(track, currentSlide, prevSlide)
})

nextBtn.addEventListener('click', () => {
  const currentSlide = slides.find(slide => slide.classList.contains('current-slide'))
  const nextSlide = currentSlide.nextElementSibling

  moveToSlide(track, currentSlide, nextSlide)
})

run()
