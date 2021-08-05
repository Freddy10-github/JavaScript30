const video = document.querySelector('video')
const toggle = document.querySelector('.toggle')
const volumes = document.querySelectorAll('input[type="range"]')
const playerButtons = document.querySelectorAll('.player__button')
// const progressFilled = document.querySelector('.progress__filled')
const progress = document.querySelector('.progress')
let isMouseDown = false

function videoPlay (){
  video[video.paused?'play':'pause']()
  toggle.textContent = video.paused?'►':'❚ ❚'
}

const setProgress=(e)=>{
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

video.addEventListener('click',videoPlay)
toggle.addEventListener('click',videoPlay)

volumes[0].addEventListener('input',(e)=>{
  video.volume = e.target.value
})
volumes[1].addEventListener('input',(e)=>{
  video.playbackRate  = e.target.value
})

playerButtons.forEach(button=>{
  button.addEventListener('click',(e)=>{
    console.log(Object.prototype.toString.call(e.target.getAttribute("data-skip")))
    const setCurrentTine = video.currentTime + Number(e.target.getAttribute("data-skip"))
    video.currentTime = setCurrentTine < 0 ? 0 : video.currentTime + Number(e.target.getAttribute("data-skip"))
  })
})

video.addEventListener('timeupdate', ()=>{
  progressFilled.style.flexBasis = `${video.currentTime/video.duration*100}%`
});
progress.addEventListener('mousedown',(e)=>{
  isMouseDown = true
  setProgress(e)  
})
progress.addEventListener('mouseup',()=>isMouseDown = false)

progress.addEventListener('mousemove',(e)=>isMouseDown&&setProgress(e))
progress.addEventListener('click',setProgress)

