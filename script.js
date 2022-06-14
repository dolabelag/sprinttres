const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sDescricao = document.querySelector('#m-descricao')
const sQuantidade = document.querySelector('#m-quantidade')
const sPreco = document.querySelector('#m-preco')
const sContato = document.querySelector('#m-contato')
const bntSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }
    if (edit) {
        sNome.value = itens[index].nome
        sDescricao.value = itens[index].descricao
        sQuantidade.value = itens[index].quantidade
        sPreco.value = itens[index].preco
        sContato.value = itens[index].contato
        id = index
    } else {
        sNome.value = ''
        sDescricao.value = ''
        sQuantidade.value = ''
        sPreco.value = ''
        sContato.value = ''
    }
}

function editItem(index) {
    openModal(true, index)
}

function deleteItem(index){
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.descricao}</td>
    <td>${item.quantidade}</td>
    <td>R$ ${item.preco}</td>
    <td>${item.contato}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
    tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
    if (sNome.value == '' || sDescricao.value == '' || sQuantidade.value == '' || sPreco.value == '' || sContato.value == '') {
      return
    }
  
    e.preventDefault();
  
    if (id !== undefined) {
      itens[id].nome = sNome.value
      itens[id].descricao = sDescricao.value
      itens[id].quantidade = sQuantidade.value
      itens[id].preco = sPreco.value
      itens[id].contato = sContato.value
    } else {
      itens.push({'nome': sNome.value, 'descricao': sDescricao.value, 'quantidade': sQuantidade.value, 'preco': sPreco.value, 'contato': sContato.value})
    }
  
    setItensBD()
  
    modal.classList.remove('active')
    loadItens()
    id = undefined
  }
  
  function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
      insertItem(item, index)
    })
  
  }
  
  const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
  const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))
  
  loadItens()