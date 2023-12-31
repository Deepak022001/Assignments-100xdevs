function createDomElements(data) {
    var parentElement = document.getElementById("mainArea");

    // parentElement.innerHTML='';

    var currentChildren = Array.from(parentElement.children);

    console.log(currentChildren);
    let added = 0, deleted = 0, updated = 0;

    data.forEach(function (item) {
        var existingChild = currentChildren.find(function (child) {
            return child.dataset.id === String(item.id);
        });
        if (existingChild) {
            updated++;
            existingChild.children[0].innerHTML = item.title;
            existingChild.children[1].innerHTML = item.description;
        } else {
            added++;
            var childElement = document.createElement("div");
            childElement.dataset.id = item.id;

            var grandChildElement1 = document.createElement('div');
            grandChildElement1.innerHTML = item.title;

            var grandChildElement2 = document.createElement("span");
            grandChildElement2.innerHTML = item.description;

            var grandChildElement3 = document.createElement("button");
            grandChildElement3.textContent = "Delete";
            grandChildElement3.onclick = function () {
                deleteTodo(item.id);
            };

            childElement.appendChild(grandChildElement1);
            childElement.appendChild(grandChildElement2);
            childElement.appendChild(grandChildElement3);

            parentElement.appendChild(childElement);
        }
    });

    currentChildren.forEach(function (child) {
        deleted++;
        parentElement.removeChild(child);
    });

    console.log("Added: ", added);
    console.log("Updated: ", updated);
    console.log("Deleted: ", deleted);
}

window.setTimeout(()=>{
    let todos=[];
    for(let i=0;i<Math.floor(Math.random()*100);i++){
        todos.push({
            title:"Go to gym",
            description:"Go to "

        })
    }
})