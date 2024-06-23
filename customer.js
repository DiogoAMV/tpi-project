function PreencherCidade() {
  // Obter o estado selecionado
  const estadoSelecionado = document.getElementById("Estado").value;

  // Obter o select de cidades
  const cidadeSelect = document.getElementById("Cidade");

  // Limpar as opções existentes
  cidadeSelect.innerHTML = "";

  // Criar a opção "Selecione uma cidade"
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "-- Selecione uma cidade --";
  cidadeSelect.appendChild(defaultOption);

  // Obter as cidades do estado selecionado
  const cidadesDoEstado = ObterCidadesDoEstado(estadoSelecionado);

  // Popular o select de cidades com as cidades do estado selecionado
  for (const cidade of cidadesDoEstado) {
    const cidadeOption = document.createElement("option");
    cidadeOption.value = cidade;
    cidadeOption.text = cidade;
    cidadeSelect.appendChild(cidadeOption);
  }
}

// Função auxiliar para obter as cidades do estado selecionado
// (Substitua esta função com sua lógica de obtenção de cidades)
function ObterCidadesDoEstado(estadoSelecionado) {
  // Exemplo de lógica utilizando um array de cidades
  const cidades = {
    "Minas Gerais": [
      "Uberlândia",
      "Belo Horizonte",
      "Contagem",
      "Juiz de Fora",
      "Araguari",
    ],
    "Sao Paulo": ["Sao Paulo", "Campinas", "Santos", "Guarulhos", "Franca"],
    "Rio de Janeiro": [
      "Arraial do Cabo",
      "Angra dos Reis",
      "Petrópolis",
      "Búzios",
      "Paraty",
    ],
    Brasilia: ["Brazlândia", "Ceilândia", "Gama", "Planaltina", "Sobradinho"],
    "Santa Catarina": [
      "Lages",
      "Joinville",
      "Blumenau",
      "Balneário Camboriú",
      "Florianópolis",
    ],
  };

  return cidades[estadoSelecionado] || [];
}

document
  .getElementById("customerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // formatação do formulário (conversão dos dados pra objeto)
    const formData = Object.fromEntries(new FormData(event.target));

    console.log(JSON.stringify(formData));

    // validação de campos (verificar se tem campos não preenchidos)
    for (const key in formData) {
      if (!formData[key] && key !== "complement") {
        const label = document.querySelector(`label[for="${key}"]`).textContent;
        alert(`O campo "${label}" é obrigatório`);
        return;
      }
    }

    // verificar se tem sobrenome no input "name"
    const fullName = formData.name.split(" ");

    if (fullName.length < 2 || fullName[1] === "") {
      return alert("O sobrenome é obrigatório!");
    }

    // verificar se a data é inferior a data atual
    const currentDate = new Date().toISOString().split("T")[0].split("-");

    const formDate = formData.birthdate.split("-");

    for (let i = 0; i <= formDate.length; i++) {
      if (parseInt(formDate[i]) > parseInt(currentDate[i])) {
        return alert("A data de nascimento deve ser inferior a data atual!");
      }
    }

    // verificar se os ultimos digitos são a soma dos demais numeros
    const allDocDigits = formData.cpf
      .split("-")
      .join("")
      .split("/")
      .join("")
      .split(".")
      .join("")
      .split("");

    let sumOfAllDigits = 0;

    for (let i = 0; i < allDocDigits.length - 2; i++) {
      sumOfAllDigits += parseInt(allDocDigits[i]);
    }

    const lastDocDigits = formData.cpf.toString().slice(-2);

    if (parseInt(sumOfAllDigits) !== parseInt(lastDocDigits)) {
      return alert(
        "Os dois últimos números devem ser iguais a soma de todos os números anteriores."
      );
    }

    // verificar se o telefone possuí 9 dígitos (exceto hífen) e verificar se o hífen está após o quinto dígito ou não
    const phoneNumber = formData.phone.split("-").join("");

    if (phoneNumber.length !== 9 || formData.phone.length > 10) {
      return alert(
        "O número de telefone inserido possuí mais/menos de 9 digitos."
      );
    }

    if (formData.phone.includes("-")) {
      const phoneArray = formData.phone.split("");
      const validatePhoneFormat = phoneArray[5] === "-";
      if (!validatePhoneFormat) {
        return alert("O formato do número de telefone está errado!");
      }
    }

    // verificar formatação do email
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      return alert("O formato do email está incorreto!");
    }

    const email = formData.email.split("@");
    if (email[0].includes(".")) {
      return alert("O formato do email está incorreto!");
    }
  });
