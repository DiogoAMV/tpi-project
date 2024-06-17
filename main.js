document
  .getElementById("supplierForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // formatação do formulário (conversão dos dados pra objeto)
    const formData = Object.fromEntries(new FormData(event.target));

    console.log(JSON.stringify(formData));

    // validação de campos (verificar se tem campos não preenchidos)
    for (const key in formData) {
      if (!formData[key]) {
        alert(`O campo ${key} é obrigatório`);
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
