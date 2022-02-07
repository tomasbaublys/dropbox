"use strict";

let images = [];
let selectedItems = [];

let upload = document.getElementById('uploadBtn');


upload.onchange = function (e) {
    for (let i = 0; i < document.getElementById('uploadBtn')?.files.length; i++) {
      const element = document.getElementById('uploadBtn')?.files[i];
      images.push({
        name: element.name,
        size: element.size,
        path: URL.createObjectURL(element),
        date: element.lastModifiedDate,
        });
    }
    render(images);
};

const render = (arr) => {
    document.getElementById("gallery").innerHTML = '';
    arr?.forEach((element, index) => {

        const imageItem = document.createElement('div');
        const image = document.createElement('img');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        p1.textContent = element.name;
        p2.textContent = `${convertBytes(element.size)} MB`;
        p1.className = 'photo-title';
        p2.className = 'photo-capasity';
        imageItem.className = 'photo';
        image.setAttribute('src', element.path);
        imageItem.appendChild(image);
        imageItem.appendChild(p1);
        imageItem.appendChild(p2);
        imageItem.setAttribute('id', index);
        const selectedDiv = document.createElement("div");
        selectedDiv.setAttribute('class', 'selected');
        imageItem.appendChild(selectedDiv);
        document.getElementById('gallery').appendChild(imageItem);

        imageItem.addEventListener('click', function () {

            if (selectedItems.includes(this.id)) {
              const indexOf = selectedItems.indexOf(this.id);
              selectedItems.splice(indexOf, 1);
            } else {
              selectedItems.push(this.id);
            }
        });
    });
    getCapacity(arr);
};

document.getElementById('delete').addEventListener('click', function () {
    images = images.filter((item, index) => !selectedItems.includes(index.toString()));
    selectedItems = [];
    render(images);
});


const searchInput = document.getElementById('search')

searchInput.addEventListener('input', e => {
  let value = e.target.value.toLowerCase()
  let filteredImages = images.filter(image => image.name.toLowerCase().includes(value))
  render(filteredImages)
})

function convertBytes(bytes) {
  return (bytes / 10485).toFixed(2);
}

function getCapacity(arr) {
    let capacityBytes = 0;
    for (let item of arr) {
      capacityBytes += item.size;
    }
    const capacityMb = convertBytes(capacityBytes);
    document.getElementById('capacityVal').textContent = `${capacityMb} MB / 100 MB`;
    document.getElementById('capacity').value = capacityMb;
} 

function sortByName() {
  images.sort((a, b) => { 
    let nameA = a.name.toUpperCase()
    let nameB = b.name.toUpperCase() 
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  })
  render(images);
}

function sortBysize() {
  images.sort((a, b) => { 
    return a.size - b.size;
  })
  render(images);
}





















    
