
//Variaveis globais
var grau_atual = "180deg";
let regraCssAtual = "#FF0000";
let regraCssAtual2 = "linear-gradient(" + grau_atual + ", #FF0000 0%, #000000 100%)";


//Adicionar cor a lista
function adicionarCor() {
  $('.posicoes').append(`
  <div class="item-cor">
  <input type="color" class="color-picker-input" value="#000000">
        <input type="text" class="cor-hexadecimal" value="#000000">
        <input type="text" class="posicao-atual" value="100%">
        <button type='button' class="remove">X</button>
      </div>
      `);
  atualizarEventos();
  editarCorTexto();
}

function removerCor(elemento) {
  elemento.closest('.item-cor').remove();
  atualizarEventos();
}

function editarCorTexto() {


  //vetores que armazenaram os valores de cor e posição
  let cores = [];
  let posicoes = [];

  //Percorre cor hexadecimal e adiciona seus valores ao vetor cores
  $('.cor-hexadecimal').each(function (index) {
    cores[index] = $(this).val();
  });

  //Percore posicao-atual e adiciona seus valores ao vetor posicoes
  $('.posicao-atual').each(function (index) {
    posicoes[index] = $(this).val();
  });

  //Inicializando o vetor dicionario que vai receber os valores
  let gradientArray = [];

  //Adiciona os valores de cores e posicao para esse array
  for (let i = 0; i < cores.length; i++) {
    gradientArray.push({ cor: cores[i], porcentagem: parseInt(posicoes[i]) });
  }

  //Organiza o array da menor para a maior porcentagem
  gradientArray.sort(function (a, b) {
    return a.porcentagem - b.porcentagem;
  });


  //Essa parte forma a string que vai atualizar o valor de css do gradiente
  let gradientCSS = 'linear-gradient(' + grau_atual + ',';
  console.log("GradientCSS Atual: " + gradientCSS)
  for (let i = 0; i < gradientArray.length; i++) {
    gradientCSS += hexToRgb(gradientArray[i].cor) + ' ' + gradientArray[i].porcentagem + '%';
    if (i < gradientArray.length - 1) {
      gradientCSS += ', ';
    }
  }
  gradientCSS += ')';



  //Atualiza os valores de variáveis globais
  regraCssAtual = hexToRgb(gradientArray[0].cor);
  regraCssAtual2 = gradientCSS;


  atualizarCor();
  editarValoresCssExibidos();
};

function hexToRgb(hex) {
  // Transforma o hex em um array com os valores correspondentes em decimal
  var r = parseInt(hex.substring(1, 3), 16);
  var g = parseInt(hex.substring(3, 5), 16);
  var b = parseInt(hex.substring(5, 7), 16);

  // Retorna a string no formato RGB
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function atualizarAnguloSeta(elemento) {
  $('.angulo').val(elemento.data('graus')).trigger('change');
  atualizarEventos();
}

function atualizarTextoAngulo(elemento) {
  grau_atual = elemento.val();
  grau_atual = grau_atual + 'deg';
  editarCorTexto();
}


function atualizarCor() {
  $('.gradiente-visualizacao').css('background', hexToRgb(regraCssAtual))
  $('.gradiente-visualizacao').css('background', regraCssAtual2);
}

function mudarTipoRadial(elemento) {

}

function adicionarEventos() {
  //Adicionando eventos de adição
  $('.add_button').click(function (e) {
    e.preventDefault();
    adicionarCor();
  });

  //Evento de remover
  $('.remove').click(function (e) {
    e.preventDefault();
    removerCor($(this));
  });

  //Evento de mudança no texto de hexadecimal
  $('.cor-hexadecimal').on('change', function (e) {
    e.preventDefault();
    $(this).closest('.item-cor').find('.cor-exibida').css('background', $(this).val());
    editarCorTexto();
  });

  //Evento de mudança no botao de angulo
  $('.container-direcoes button').click(function (e) {
    e.preventDefault();
    atualizarAnguloSeta($(this));
  })
  $('.angulo').on('change', function (e) {
    e.preventDefault();
    atualizarTextoAngulo($(this))
  });

  $('.color-picker-input').on('change', function (e) {
    e.preventDefault();
    console.log('mudou')
    $(this).closest('.item-cor').find('.cor-hexadecimal').val($(this).val()).trigger('change');
    console.log('valor' + $(this).val())
  })

  $('.estilo-radial button').click(function (e) {
    e.preventDefault();

  });
}

function removerEventos() {

  //Remove os eventos de add_button
  $('.add_button').off();

  //Remove os eventos de 'remove'
  $('.remove').off();

  //Remove os eventos de cor-hexadecimal
  $('.cor-hexadecimal').off();

  //Remove os eventos de container-direcoes button
  $('.container-direcoes button').off();

  //Remove os eventos de .angulo
  $('.angulo').off();

  $('.color-picker-input').off();

  $('.estilo-radial button').off();
}

function atualizarEventos() {
  removerEventos();
  adicionarEventos();
}


function editarValoresCssExibidos() {
  $('#prop-bg1 .color-1').html(regraCssAtual);
  $('#prop-bg2 .color-1').html(regraCssAtual2);
}
atualizarEventos();