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
      "Minas Gerais": ["Uberlândia", "Belo Horizonte", "Contagem", "Juiz de Fora","Araguari"],
      "Sao Paulo": ["Sao Paulo", "Campinas", "Santos", "Guarulhos", "Franca"],
      "Rio de Janeiro": ["Arraial do Cabo", "Angra dos Reis", "Petrópolis", "Búzios", "Paraty"],
      "Brasilia": ["Brazlândia","Ceilândia","Gama", "Planaltina","Sobradinho"],
    "Santa Catarina": ["Lages", "Joinville", "Blumenau", "Balneário Camboriú", "Florianópolis" ]
    };
  
    return cidades[estadoSelecionado] || [];
  }
  