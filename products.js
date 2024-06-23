document
  .getElementById("productsForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.target));

    for (const key in formData) {
      if (!formData[key]) {
        const label = document.querySelector(`label[for="${key}"]`).textContent;
        alert(`O campo "${label}" é obrigatório`);
        return;
      }
    }

    // aqui foi utilizado o localStorage para salvar produtos no armazenamento do navegador, o motivo disso foi para não precisar mesclar os formulários de vendas e de produtos (já tinhamos um form de products pronto, não queriamos acabar com ele), então para poder conectar o array de produtos desse formulário com o array de produtos na página de vendas, salvamos os produtos criados no localstorage para poder pegar os products dentro da página do form de vendas.
    // obs: os dados salvos no localStorage permanecem msm após o fechamento do navegador.
    if (formData.product) {
      let products = JSON.parse(localStorage.getItem("products")) || [];
      products.push(formData.product);
      localStorage.setItem("products", JSON.stringify(products));

      alert("Produto cadastrado com sucesso!");
      document.getElementById("productsForm").reset();
    }

    // const productName =
  });
