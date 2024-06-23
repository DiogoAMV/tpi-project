// essa função pega os produtos do localstorage criados na página de form de produtos.
function loadProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const selects = document.querySelectorAll('select[name="product"]');

  selects.forEach((select) => {
    products.forEach((product) => {
      const option = document.createElement("option");
      option.value = product;
      option.textContent = product;
      select.appendChild(option);
    });
  });
}

loadProducts();

function registerNewSale(product, date, price) {
  const salesTableBody = document
    .getElementById("salesTable")
    .querySelector("tbody");
  const newSale = document.createElement("tr");

  newSale.innerHTML = `
        <td>${product}</td>
        <td>${date}</td>
        <td>${price}</td>
    `;

  salesTableBody.appendChild(newSale);
  alert("Venda cadastrada com sucesso!");
}

document
  .getElementById("salesForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // formatação do formulário (conversão dos dados pra objeto)
    const formData = Object.fromEntries(new FormData(event.target));

    // validação de campos (verificar se tem campos não preenchidos)
    for (const key in formData) {
      if (!formData[key]) {
        const label = document.querySelector(`label[for="${key}"]`).textContent;
        alert(`O campo "${label}" é obrigatório`);
        return;
      }
    }

    // verificar se a data é inferior a data atual
    const currentDate = new Date().toISOString().split("T")[0].split("-");

    const formDate = formData.sale_date.split("-");

    for (let i = 0; i <= formDate.length; i++) {
      if (parseInt(formDate[i]) > parseInt(currentDate[i])) {
        return alert(
          "A data da venda deve ser igual ou inferior a data atual!"
        );
      }
    }

    registerNewSale(formData.product, formData.sale_date, formData.value);
  });
