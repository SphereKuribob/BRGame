document.addEventListener('DOMContentLoaded', () => {
    
    const ui = document.querySelector('.ui')
    new ResizeObserver(() => {
        document.documentElement.style.setProperty("--scale", Math.min(
            ui.parentElement.offsetWidth / ui.offsetWidth, 
            ui.parentElement.offsetHeight / ui.offsetHeight
        ))
    }).observe(ui.parentElement)

});