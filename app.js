// ****** SELECT ITEMS **********

const alert = document.querySelector('.alert');
const submitBtn = document.querySelector('.submit-btn')
const form = document.querySelector('.grocery-form')
const grocery = document.getElementById('grocery')
const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list')
const clearBtn = document.querySelector('.clear-btn')

// ****** EVENT LISTENERS **********

form.addEventListener('submit', addItems)

clearBtn.addEventListener('click', clearList)

window.addEventListener('DOMContentLoaded', setupItems)
// list.addEventListener('click', (e) => {
//   if(e.target.classList.contains('delete-btn'))
//   {
//     deleteItem(e);
//   }
//   if(e.target.classList.contains('edit-btn'))
//   {
//     editItem(e);
//   }
// })

// edit option

let editElement;
let editFlag = false;
let editId = "";

// ****** FUNCTIONS **********

function addItems(e)
{
  e.preventDefault();

  const item = grocery.value;

  // id 
  let uniqueId = new Date().getTime().toString(); 

  grocery.value = ``;

  if(item && !editFlag)
  {
    createListItems(uniqueId, item)


    displayAlert(`item added to the list`, `success`)

    addToLocalStorage(uniqueId, item)
    setBackToDefault()
  }
  else if(item && editFlag)
  {
    editElement.innerHTML = item;
    displayAlert(`Value Changed`, `success`)
    editLocalStorage(editId, item)
    setBackToDefault();
  }
  else {
    displayAlert(`Please Enter Value`, `danger`)
  }
}

function clearList()
{
  const elements = list.querySelectorAll('.grocery-item')

  elements.forEach(element => {
    list.removeChild(element)
  })

  container.classList.remove('show-container')
  displayAlert(`Empty List`, `danger`)
  setBackToDefault()
  localStorage.removeItem('list')
}

function deleteItem(e) 
{
    const element = e.currentTarget.parentElement.parentElement;

    const id = element.dataset.id;
    element.remove();
  
  if(list.children.length === 0)
  {
    container.classList.remove('show-container')
  }

  displayAlert(`Item Removed`, 'danger')

  removeLocalStorage(id);
}

function setBackToDefault()
{
  submitBtn.innerHTML = `submit`
  grocery.value = ``
  editFlag = false
  editId = ``
}

function editItem(e)
{

  const element = e.currentTarget.parentElement.parentElement;

  const id = element.dataset.id;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  grocery.value = editElement.innerHTML

  submitBtn.textContent = `edit`

  editId = id;

  editFlag = true
}

function addToLocalStorage(id, value)
{
  const grocery = {
    id: id,
    value: value
  }

  let items = giveLocalStorage();
  items.push(grocery)

  localStorage.setItem('list', JSON.stringify(items))
}

function giveLocalStorage()
{
  let items = []
  if(localStorage.getItem('list'))
  {
    items = JSON.parse(localStorage.getItem('list'))
  }

  return items;
}

function removeLocalStorage(id)
{
  let items = giveLocalStorage();
  
  items = items.filter(item => {
    if(item.id !== id)
    {
      return item
    }
  })

  localStorage.setItem('list', JSON.stringify(items));
}

function editLocalStorage(id, value)
{
  let items = giveLocalStorage()
  console.log(items);
  
  items.forEach(item => {
    if(item.id == id)
    {
      item.value = value;
    }
  })
  console.log(items);


  localStorage.setItem('list', JSON.stringify(items))
}

function displayAlert(text, style)
{
  alert.textContent = `${text}`
  alert.classList.add(`alert-${style}`)

  setTimeout(() => {
    alert.textContent = ``;
    alert.classList.remove(`alert-${style}`)
  }, 1000)
}

function createListItems(id, value)
{
  const element = document.createElement('article')
    element.classList.add('grocery-item')
    
    const attr = document.createAttribute('data-id')
    
    attr.value = id;
    element.setAttributeNode(attr)

    element.innerHTML = `<p class="title">${value}</p>
                        <div class="btn-container">
                          <button class="edit-btn" type="button">
                            <i class="fas fa-edit"></i>
                          </button>
                          <button class="delete-btn" type="button">
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>`

    list.appendChild(element)

    const deleteBtns = document.querySelectorAll('.delete-btn') 
    const editBtns = document.querySelectorAll('.edit-btn')

    deleteBtns.forEach(deleteBtn => {
      deleteBtn.addEventListener('click', deleteItem)
    })
    
    editBtns.forEach(editBtn => {
      editBtn.addEventListener('click', editItem)
    })

    container.classList.add('show-container')
}
// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********

function setupItems()
{
  let items = giveLocalStorage()

  if(items.length > 0)
  {
    items.forEach(item => {
      createListItems(item.id, item.value)
      container.classList.add('show-container')
    })
  }
}






















































