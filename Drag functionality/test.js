const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

draggables.forEach(drag => {
    drag.addEventListener('dragstart', function() {
        drag.classList.add('dragging')
    })
    
    drag.addEventListener('dragend', function (){
        drag.classList.remove('dragging')
    })
})



containers.forEach(container => {
    container.addEventListener('dragover', function (e){
        // e.preventDefault()
        // The return of the reduce function   
        const afterElement = getDragAfterElement(container, e.clientY)
//         console.log(afterElement);
//         const draggable = document.querySelector('.dragging');
//         if (afterElement === null) {
//             container.appendChild(draggable)
//         } else {
//             container.insertBefore(draggable, afterElement)
//         }
        
    })
})

function getDragAfterElement (container, y) {
            // Determines every element that is not the one we are draging
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
//         const box = child.getBoundingClientRect() 
//         const offset = y - box.top - box.height / 2
//         if (offset < 0 && offset > closest.offset) {
//             return { offset: offset, element: child}
//         } else {
//             return closest
//         }
     }, {offset: Number.NEGATIVE_INFINITY}).element
}