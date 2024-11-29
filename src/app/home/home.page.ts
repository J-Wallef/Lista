import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  newItem: string = ''; // Novo item a ser adicionado
  items: { id: number; name: string; isChecked: boolean }[] = []; // Itens da lista

  constructor() {}

  ngOnInit() {
    this.loadItems(); // Carregar itens do Local Storage ao iniciar
  }

  // Carregar itens do Local Storage
  loadItems() {
    const storedItems = localStorage.getItem('shoppingList');
    if (storedItems) {
      this.items = JSON.parse(storedItems); // Carrega a lista existente
      console.log('Itens carregados do Local Storage:', this.items);
    } else {
      console.log('Nenhum item encontrado no Local Storage.');
    }
  }

  // Adicionar item à lista
  addItem() {
    if (this.newItem.trim() === '') {
      alert('Por favor, adicione um item!');
      return;
    }

    // Adiciona o novo item com ID único
    const newItem = {
      id: Date.now(), // Usando timestamp como ID único
      name: this.newItem.trim(),
      isChecked: false,
    };

    // Adiciona o novo item à lista
    this.items.push(newItem);

    console.log(`Novo item adicionado: "${this.newItem.trim()}"`);

    // Limpa o campo de entrada
    this.newItem = '';

    // Salva a lista atualizada no Local Storage
    this.saveItems();
  }

  // Excluir item da lista
  deleteItem(index: number) {
    console.log('Excluindo item:', this.items[index]);
    this.items.splice(index, 1); // Remove o item da lista
    this.saveItems(); // Atualizar no Local Storage
  }

  // Marcar/desmarcar item como "pego"
  toggleItem(index: number) {
    this.items[index].isChecked = !this.items[index].isChecked;
    console.log(
      `Item "${this.items[index].name}" marcado como: ${
        this.items[index].isChecked ? 'Pego' : 'Não Pego'
      }`
    );
    this.saveItems(); // Atualizar no Local Storage
  }

  // Editar nome do item
  editItem(index: number) {
    const newName = prompt('Editar item:', this.items[index].name);
    if (newName && newName.trim() !== '') {
      console.log(
        `Renomeando item de "${this.items[index].name}" para "${newName.trim()}"`
      );
      this.items[index].name = newName.trim();
      this.saveItems(); // Atualizar no Local Storage
    }
  }

  // Salvar itens no Local Storage
  saveItems() {
    localStorage.setItem('shoppingList', JSON.stringify(this.items)); // Salva toda a lista
    console.log('Itens salvos no Local Storage:', this.items);
  }
}
