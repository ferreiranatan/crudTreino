'use strict'



const openModal = ()=> document.getElementById('modal').classList.add('active')
const openModal2 = ()=> document.getElementById('modal2').classList.add('active')

const closeModal2 = () =>{
    document.getElementById('modal2').classList.remove('active')
}
        
const closeModal = () =>{
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

let  cadastroCl = {nome:'Natan', email: 'natan_ael@hotmail.com', celular: 999999, cidade: 'Fortaleza'};

let getLocalStorage = () => JSON.parse(localStorage.getItem("db_client"))??[cadastroCl]
let setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(cadastroCl))

//Crud
const deleteClient = (index) =>{
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(cadastroCl)
}

const updateClient = (index, client)=>{
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

const readClient = () => getLocalStorage()

const createClient = () => (client) =>{
    const dbClient = getLocalStorage()
    dbClient.push (client)
    setLocalStorage(dbClient)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}



const clearFields = () =>{
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value ="")
    document.getElementById('nome').dataset.index = 'new'
}

const saveClient = () => {
    debugger
    if (isValidFields()){
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new'){
            createClient(client)
            updateTable()
            closeModal()
        }else{
            updateClient(client)
            updateTable()
            closeModal()
        }
        }
    }

    const createRow = (client, index) =>{
        const newRow = document.createElement('tr')
        newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="editar-${index}">Editar</button>
            <button type="button" class="button red" id="apagar-${index}">Excluir</button>
        </td>
        `
        document.querySelector('#tableClient>tbody').appendChild(newRow)
    }

    const clearTable = () =>{
        const rows = document.querySelectorAll('#tableClient>tbody tr')
        rows.forEach(row => row.parentNode.removeChild(row))
    }

    const updateTable = () => {
        const dbClient = readClient()
        clearTable()
        dbClient.forEach(createRow)
    }

    const fillFields = (client)=>{
        document.getElementById('nome').value = client.nome
        document.getElementById('email').value = client.email
        document.getElementById('celular').value = client.celular
        document.getElementById('cidade').value = client.cidade
        document.getElementById('nome').dataset.index = client.nome
    }

    const editClient =(index)=> {
        const client = readClient()[index]
        client.index = index
        fillFields(client)
        openModal()
    }

    const editDelete = (event) =>{
        if(event.target.type == 'button'){

            const [action, index] = event.target.td.split('-')

        if (action == 'edit') {
            editClient(index)
        }else{
            const client = readClient()[index]
            let avisoDelete = document.querySelector('#avisoDelete')

            avisoDelete.textContent = `deseja realmente excluir o cliente ${client.nome}`
            openModal2()

        //apagar o registro
            document.getElementById('apagar').addEventListener('click', () =>{
                deleteClient(index)
                updateTable()
                closeModal2()
                })
            }
        }
    }
    
    updateTable()
    
    //eventos
    document.getElementById('cadastrarCliente')
        .addEventListener('click', openModal)

    document.getElementById('modalClose')
        .addEventListener('click', closeModal)

    //Modal apagar
    document.getElementById('modalClose2')
        .addEventListener('click', closeModal2)
    
    document.getElementById('salvar')
        .addEventListener('click', saveClient)
    
    document.getElementById('#tableClient>tbody')
        .addEventListener('click', editDelete)
    
    document.getElementById('Cancelar')
        .addEventListener('click', closeModal)
    
    //Modal apagar
    document.getElementById('cancelar2')
        .addEventListener('click', closeModal2)