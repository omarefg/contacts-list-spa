var idContactNumber=0; //Esta variable permite añadirle una id diferente a cada contacto

var contactos=-1; //Esta variable almacena en el localStorage la cantidad de contactos

//Esta función permite añadir nuevos contactos, y almacena sus datos en el localStorage
function addNewContact(){
    const bienvenida = document.getElementById('bienvenida')
    const deleteButton = document.getElementById('deletebutton')
    const editButton = document.getElementById('editbutton')
    const saveData = document.getElementById('saveData')
    bienvenida.style.display = 'none'
    const contactN = idContactNumber.toString()
    deleteButton.setAttribute('onclick',`deleteContact("contact${contactN}")`)
    editButton.setAttribute('onclick', `editContact("contact${contactN}")`)
    const clone = contact.cloneNode(true);
    clone.classList.remove('ref')
    clone.id='contact'+contactN
    const newContact = contact.parentNode.children[1].appendChild(clone)
    newContact.children[0].children[1].children[0].value = saveData.children[0].children[1].children[0].children[0].value
    newContact.children[0].children[1].children[1].value = saveData.children[0].children[1].children[0].children[1].value
    newContact.children[0].children[1].children[2].value = saveData.children[0].children[1].children[0].children[2].value
    idContactNumber++
    contactos++;
    localStorage.setItem('cantidad.contactos', contactos)
    saveData.style.display = 'none'
    localStorage.setItem(`contact${contactN}.nombre`, newContact.children[0].children[1].children[0].value)
    localStorage.setItem(`contact${contactN}.direccion`, newContact.children[0].children[1].children[1].value)
    localStorage.setItem(`contact${contactN}.telefono`, newContact.children[0].children[1].children[2].value)
}

//Esta función permite borrar los contactos y sus datos del localStorage
function deleteContact(id){
  if (confirm('¿Deseas borrar éste contacto?')) {
    const contact = document.getElementById(id)
    contact.parentNode.removeChild(contact)
    const contacts = document.getElementById('submain22')
    const contactDivs = contacts.getElementsByClassName('contact')
    const datas = [].map.call(contactDivs, function(div){
      return div
    })
    for(let i=0; i<datas.length; i++){
      datas[i].id = 'contact'+i.toString()
      datas[i].children[1].children[1].removeAttribute('onclick',`deleteContact("contact${id}")`)
      datas[i].children[1].children[1].setAttribute('onclick',`deleteContact("contact${i}")`)
      datas[i].children[1].children[0].removeAttribute('onclick',`editContact("contact${id}")`)
      datas[i].children[1].children[0].setAttribute('onclick',`editContact("contact${i}")`)
    }
    idContactNumber=datas.length
    if(datas.length == 0){
      const bienvenida = document.getElementById('bienvenida')
      bienvenida.style.display = 'inline'
    }
    const contactInputs = contacts.getElementsByTagName('input')
    const inputDatas = [].map.call(contactInputs, function(input){
      return input
    })
    let contador = 0
    let contador2 = 0
    for(let i = 0; i<inputDatas.length+3; i+=3){
      localStorage.removeItem(`contact${contador2}.nombre`)
      localStorage.removeItem(`contact${contador2}.direccion`)
      localStorage.removeItem(`contact${contador2}.telefono`)
      contador2++;
    }
    for(let i = 0; i<inputDatas.length; i+=3){
      let nombre = `${id.slice(0, id.length-1)}${contador}`
      nombre = document.getElementById(nombre).children[0].children[1].children[0].value
      let direccion = `${id.slice(0, id.length-1)}${contador}`
      direccion = document.getElementById(direccion).children[0].children[1].children[1].value
      let telefono = `${id.slice(0, id.length-1)}${contador}`
      telefono = document.getElementById(telefono).children[0].children[1].children[2].value
      localStorage.setItem(`contact${contador}.nombre`, nombre)
      localStorage.setItem(`contact${contador}.direccion`, direccion)
      localStorage.setItem(`contact${contador}.telefono`, telefono)
      contador++;
    }
    contactos--;
    localStorage.setItem('cantidad.contactos', contactos)
  }
}

//Esta función permite editar los datos del contacto y almacena los datos nuevos en el localStorage
function editContact(id){
  const contact = document.getElementById(id)
  const nombre = contact.children[0].children[1].children[0]
  const direccion = contact.children[0].children[1].children[1]
  const telefono = contact.children[0].children[1].children[2]
  const botones = contact.children[1]
  nombre.disabled = false
  direccion.disabled = false
  telefono.disabled = false
  nombre.style.border = '1px solid #155263'
  direccion.style.border = '1px solid #155263'
  telefono.style.border = '1px solid #155263'
  const button = document.createElement('BUTTON')
  const textButton = document.createTextNode('Guardar')
  button.appendChild(textButton)
  const button2 = document.createElement('BUTTON')
  const cancelButton = document.createTextNode('Cancelar')
  button2.appendChild(cancelButton)
  const valorAnteriorNombre = nombre.value
  const valorAnteriorDireccion = direccion.value
  const valorAnteriorTelefono = telefono.value
  if(!contact.children[1].children[2]){
    botones.appendChild(button)
    botones.appendChild(button2)
    button.addEventListener('click', function(){
      nombre.disabled = true
      direccion.disabled = true
      telefono.disabled = true
      nombre.style.border = '0px solid black'
      direccion.style.border = '0px solid black'
      telefono.style.border = '0px solid black'
      botones.removeChild(button)
      botones.removeChild(button2)
      localStorage.setItem(`${id}.nombre`, nombre.value)
      localStorage.setItem(`${id}.direccion`, direccion.value)
      localStorage.setItem(`${id}.telefono`, telefono.value)
    })
    button2.addEventListener('click', function(){
      nombre.disabled = true
      direccion.disabled = true
      telefono.disabled = true
      nombre.style.border = '0px solid black'
      direccion.style.border = '0px solid black'
      telefono.style.border = '0px solid black'
      botones.removeChild(button)
      botones.removeChild(button2)
      nombre.value = valorAnteriorNombre
      direccion.value = valorAnteriorDireccion
      telefono.value = valorAnteriorTelefono
    })
  }
  nombre.focus()
}

//Esta función permite buscar filtrar por nombre entre la lista de contactos haciendo click en el botón buscar
function searchContact(){
  const search = document.getElementById('searcher').value.toLowerCase()
  const contacts = document.getElementById('submain22')
  const contactInputs = contacts.getElementsByClassName('nombre')
  const datas = [].map.call(contactInputs, function(input){
    return input.value.toLowerCase()
  })
  const backButton = document.getElementById('backButton')
  for(let i=0; i<datas.length; i++){
     let contactFounded = document.getElementById(`contact${i}`).children[0].children[1].children[0]
     if(search==''){}
     else if(contactFounded.value.toLowerCase().indexOf(search)==-1){
          contactFounded.parentNode.parentNode.parentNode.style.display = 'none'
          backButton.style.display = 'inline'
    }
    else if(contactFounded.parentNode.parentNode.parentNode.style.display=='none' || contactFounded.value.toLowerCase().indexOf(search)>=0){
      contactFounded.parentNode.parentNode.parentNode.style.display = 'flex'
    }
  }
}

//Esta función refresca la lista de contactos haciendo que aparezcan todos
function recoverContacts(){
  const search = document.getElementById('searcher')
  const contacts = document.getElementById('submain22')
  const contactInputs = contacts.getElementsByClassName('nombre')
  const datas = [].map.call(contactInputs, function(input){
    return input.value.toLowerCase()
  })
  const backButton = document.getElementById('backButton')
  for(let i=0; i<datas.length;i++){
    const contactFounded = document.getElementById(`contact${i}`).children[0].children[1].children[0]
    contactFounded.parentNode.parentNode.parentNode.style.display = 'flex'
  }
  search.value= ''
  backButton.style.display = 'none'
}

//Esta función genera una nueva ventana cuando se va a agregar un contacto por primera vez, permite que el usuario le pase los datos en primera instancia
function newContact(){
  const saveData = document.getElementById('saveData')
  const nombre = saveData.children[0].children[1].children[0].children[0]
  const direccion = saveData.children[0].children[1].children[0].children[1]
  const telefono = saveData.children[0].children[1].children[0].children[2]
  const bienvenida = document.getElementById('bienvenida')
  nombre.placeholder = ''
  bienvenida.style.display = 'none'
  nombre.value=''
  direccion.value=''
  telefono.value=''
  saveData.style.display = 'flex'
  nombre.focus()
}

//Esta función es llamada si el usuario quiere cancelar el proceso de creación del nuevo contacto
function cancelNewContact(){
  const saveData = document.getElementById('saveData')
  const nombre = saveData.children[0].children[1].children[0].children[0]
  const direccion = saveData.children[0].children[1].children[0].children[1]
  const telefono = saveData.children[0].children[1].children[0].children[2]
  const bienvenida = document.getElementById('bienvenida')
  const contacts = document.getElementById('submain22')
  const contactDivs = contacts.getElementsByClassName('contact')
  const datas = [].map.call(contactDivs, function(div){
    return div
  })
  nombre.value=''
  direccion.value=''
  telefono.value=''
  saveData.style.display = 'none'
  if(datas.length == 0){
    bienvenida.style.display = 'inline'
  }
}

//Esta función es llamada cuando es cargado el body, añade la cantidad de contactos creados previamente hace el llamado al localStorage para añadirles sus datos
function onload(){
  const cantidadContactos = parseInt(localStorage.getItem('cantidad.contactos'))

  if(cantidadContactos>=0){
    for(let i=0;i<=cantidadContactos;i++){
      addNewContactOnLoad()
    }
    const contacts = document.getElementById('submain22')
    const contactDivs = contacts.getElementsByClassName('contact')
    const datas = [].map.call(contactDivs, function(div){
      return div
    })
    for(let i = 0; i<datas.length; i++){
      const nombre = datas[i].children[0].children[1].children[0]
      const direccion = datas[i].children[0].children[1].children[1]
      const telefono = datas[i].children[0].children[1].children[2]
      nombre.value = localStorage.getItem(`contact${i}.nombre`)
      direccion.value = localStorage.getItem(`contact${i}.direccion`)
      telefono.value = localStorage.getItem(`contact${i}.telefono`)

    }
  }
}

//Es la función que es llamada por onload() para agregar los contactos previamente creados
function addNewContactOnLoad(){
    const bienvenida = document.getElementById('bienvenida')
    const deleteButton = document.getElementById('deletebutton')
    const editButton = document.getElementById('editbutton')
    const saveData = document.getElementById('saveData')
    bienvenida.style.display = 'none'
    const contactN = idContactNumber.toString()
    deleteButton.setAttribute('onclick',`deleteContact("contact${contactN}")`)
    editButton.setAttribute('onclick', `editContact("contact${contactN}")`)
    const clone = contact.cloneNode(true);
    clone.classList.remove('ref')
    clone.id='contact'+contactN
    contact.parentNode.children[1].appendChild(clone)
    idContactNumber++
    contactos++;
}

//Esta función permite buscar y refrescar la lista de contactos usando la tecla enter desde el buscador
function searchWithKey(event){
  const input = document.getElementById('searcher')
  const keyCode = event.which || event.keyCode;
  if(keyCode === 13){
    searchContact()
  }
  if(keyCode === 13 && input.value==''){
    recoverContacts()
  }
}
