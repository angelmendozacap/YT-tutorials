const track = document.querySelector('.carousel__track')
const slides = [...track.children]
const prevBtn = document.querySelector('.carousel__button--left')
const nextBtn = document.querySelector('.carousel__button--right')
const dotsNav = document.querySelector('.carousel__nav')
const dots = [...dotsNav.children]

const slideSize = slides[0].getBoundingClientRect()
const slideWidth = slideSize.width


console.log(slideSize)
