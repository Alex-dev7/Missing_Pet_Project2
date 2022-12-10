
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


