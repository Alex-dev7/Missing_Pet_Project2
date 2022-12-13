
 const statuss = document.querySelectorAll(".status")
// changing the background color of the status based on the current value
for(item of statuss) {
    // console.log(item.innerHTML)
    if(item.innerHTML.match("LOST")){
    //    console.log('yee boy')
       item.style.backgroundColor = "red"
       
    } else {
        item.style.backgroundColor = "green"
    }
}


// hamburger menu 
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

// event listener to toggle the class active
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
    
})

// event listener to remove the class active
document.querySelectorAll(".nav-link").forEach(item => {
    item.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
    })
})

