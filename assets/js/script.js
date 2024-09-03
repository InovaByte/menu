document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-toggle');
    const overlay = document.getElementById('overlay');
    const overlayContent = document.getElementById('overlay-content');
    const productDetailsOverlay = document.getElementById('product-details-overlay');
    const closeButtons = document.querySelectorAll('.back-to-menu');
    const saveDetailsButton = document.getElementById('adicionar-details');
    const addButtons = document.querySelectorAll('.add-button');
    const cartIndicator = document.getElementById('cart-indicator');
    let cartCount = 0;

    // Função para mostrar o conteúdo da categoria no modal
    const showCategoryContent = (targetId) => {
        const categoryContent = document.getElementById(targetId).innerHTML;
        overlayContent.innerHTML = categoryContent;
        overlay.classList.add('show');
    };

    // Função para fechar o modal
    const closeOverlay = () => {
        overlay.classList.remove('show');
    };

    // Adiciona o evento de clique para os botões de categoria
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            showCategoryContent(targetId);
        });
    });

    // Adiciona o evento de clique para os botões de fechar
    closeButtons.forEach(button => {
        button.addEventListener('click', closeOverlay);
    });

    // Fechar o modal ao clicar fora do conteúdo
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeOverlay();
        }
    });

    // Fechar o modal de detalhes do produto ao clicar fora do conteúdo
    productDetailsOverlay.addEventListener('click', (e) => {
        if (e.target === productDetailsOverlay) {
            productDetailsOverlay.classList.remove('show');
        }
    });

    // Função para exibir detalhes do produto
    const showProductDetails = (productName, productImage) => {
        const productNameElement = document.getElementById('product-name');
        const productImageElement = document.getElementById('product-image');
        
        productNameElement.textContent = productName;
        productImageElement.src = productImage;

        productDetailsOverlay.classList.add('show');
    };

    // Evento para abrir detalhes do produto
    overlayContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-button')) {
            const menuItem = e.target.closest('.menu-item');
            const productName = menuItem.querySelector('img').alt;
            const productImage = menuItem.querySelector('img').src;
            
            showProductDetails(productName, productImage);
        }
    });

    // Função para salvar detalhes do produto
    const saveProductDetails = () => {
        const productName = document.getElementById('product-name').textContent;
        const productImage = document.getElementById('product-image').src;

        // Lógica para salvar os detalhes, como enviar para um servidor
        console.log('Salvando detalhes do produto:', { productName, productImage });

        // Fechar o modal de detalhes após salvar
        productDetailsOverlay.classList.remove('show');
    };

    // Adiciona o evento de clique para o botão de salvar detalhes
    if (saveDetailsButton) {
        saveDetailsButton.addEventListener('click', saveProductDetails);
    }

    // Função para atualizar o carrinho
    const updateCart = () => {
        cartCount++;
        cartIndicator.textContent = cartCount;
    };

    // Adiciona o evento de clique para os botões de adicionar ao carrinho
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            updateCart();
        });
    });

    // Inicialize o contador do carrinho
    updateCart();
});
