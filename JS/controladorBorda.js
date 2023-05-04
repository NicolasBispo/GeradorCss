let inputTodasBordas = $('#input_all_ranges');
let visualizador = $('.visualizador-borda');
let estilo_borda = 'solid';
let corBordaTotal = 'red';
let todasBordasAtivo = true;
let estiloCadaBorda = new Array(4).fill('solid');

let borderRadiusTotal = "0";
$('#propriedades-bordaSimples *').prop('disabled', true);
$('#propriedades-borderRadius *').prop('disabled', true);

let bordaSuperior = $('#bordaSuperior');
let bordaEsquerda = $('#bordaEsquerda');
let bordaDireita = $('#bordaDireita');
let bordaInferior = $('#bordaInferior');

let borderRSuperior = $('#bordaSuperiorR');
let borderREsquerda = $('#bordaEsquerdaR');
let borderRDireita = $('#bordaDireitaR');
let borderRInferior = $('#bordaInferiorR');


//Atualiza todas as bordas do bloco
function atualizarVisualizadorAll() {
    let css_borda = estilo_borda + " " + inputTodasBordas.val() + "px " + corBordaTotal;
    visualizador.css('border', css_borda);
}

//Atualiza as bordas de cada direçao do bloco
function atualizarBordasSeparadas(top, left, right, bottom, bordaEstilo) {
    
    let estilo_css_bordas = " " + corBordaTotal;
    let top_css = top + "px" + estilo_css_bordas + " " + bordaEstilo[0];
    let left_css = left + 'px' + estilo_css_bordas + " " + bordaEstilo[1];
    let right_css = right + 'px' + estilo_css_bordas + " " + bordaEstilo[2];
    let bottom_css = bottom + "px" + estilo_css_bordas + " " + bordaEstilo[3];

    console.log(top_css, left_css, right_css, bottom_css);
    visualizador.css('border-top', top_css);
    visualizador.css('border-left', left_css);
    visualizador.css('border-right', right_css);
    visualizador.css('border-bottom', bottom_css);
}

//Atualiza a border-radius total do bloco
function atualizarBorderRadiusTotal() {
    visualizador.css('border-radius', borderRadiusTotal + "px");
}

//Atualiza a border-radius isolada de cada componente do bloco
function atualizarBorderRadiusSeparado(ltop, rtop, lbottom, rbottom) {
    let ltopCss = ltop + "px";
    let rtopCss = rtop + "px";
    let lbottomCss = lbottom + "px";
    let rbottomCss = rbottom + "px";
    let cssFull = ltopCss + " " + rtopCss + " " + lbottomCss + " " + rbottomCss;
    console.log('Css full' + cssFull)
    visualizador.css('border-radius', cssFull);
}

//Adiciona evento para cada componenente
function adicionarEventos() {

    //Evento de "input" no input do tipo range, que se refere a todas bordas
    $('#rangeinput_all').on('input', function () {
        inputTodasBordas.val($(this).val()).trigger('change');
    });

    //Evento de "input" no input do tipo text 
    inputTodasBordas.on('input', function () {
        if (inputTodasBordas.val() > 200) {
            $('#mensagem_borda_1').html('Valor não pode ser superior a 200');

        }
        else {
            $('#mensagem_borda_1').html('');
            atualizarVisualizadorAll();
        }
    });
    //Evento de tipo "change" no input do tipo text
    inputTodasBordas.on('change', function () {

        //Atribui verificação, para evitar valores superiores a 200
        if (inputTodasBordas.val() > 200) {
            $('#mensagem_borda_1').html('Valor não pode ser superior a 200');
        }
        else {
            $('#mensagem_borda_1').html('');
            atualizarVisualizadorAll();
        }
    });

    //Evento ao input de checkbox que habilita ou desabilita
    //Os inputs de borda isolada ou borda total
    //Se estiver marcada "checked" ela desabilita os inputs do tipo text e range
    //de borda total
    //Se estiver desmarcada ela habilita os inputs de cada borda
    $('#inputTodasBordas').click(function (e) {

        //Verifica se o input está marcado "checked"
        if ($(this).is(':checked')) {
            //Está marcado!
            //Habilita o tipo o input do tipo select
            $('#estiloBordaTotal').prop('disabled', false);

            //Habilita o input tipo text de todas bordas
            $('#input_all_ranges').prop('disabled', false);

            //Habilita o input do tipo range de todas bordas
            $('#rangeinput_all').prop('disabled', false);

            //Desabilita todos os outros inputs restantes
            //No caso os que pertencem a cada borda isolada
            $("#propriedades-bordaSimples *").prop('disabled', true);
            
        } else {
            //Desmarcado
            //Desabilita o tipo o input do tipo select de todas bordas
            $('#estiloBordaTotal').prop('disabled', true);

            //Desabilita o input tipo text de todas bordas
            $('#input_all_ranges').prop('disabled', true);

            //Desabilita o input do tipo range de todas bordas
            $('#rangeinput_all').prop('disabled', true);

            //Habilita todos inputs de cada borda
            $("#propriedades-bordaSimples *").prop('disabled', false);

            //atualizarEventos();
            atualizarBordasSeparadas(bordaSuperior.val(), bordaEsquerda.val(), bordaDireita.val(), bordaInferior.val(), estiloCadaBorda);
        }

    });

    //Evento de change para controle de select da borda
    $('#estiloBordaTotal').on('change', function () {
        estilo_borda = $(this).val();
        atualizarVisualizadorAll();
    });

    //Atribui o evento de input para os input do tipo text do border isolado
    $('.propriedades-separadas .propriedade-linha .input-group input').on('input', function () {
        atualizarBordasSeparadas(bordaSuperior.val(), bordaEsquerda.val(), bordaDireita.val(), bordaInferior.val(), estiloCadaBorda);
    })
    //Atribui o evento de change para os input do tipo text do border isolado
    $('.propriedades-separadas .propriedade-linha .input-group input').on('change', function () {
        atualizarBordasSeparadas(bordaSuperior.val(), bordaEsquerda.val(), bordaDireita.val(), bordaInferior.val(), estiloCadaBorda);
    })

    //Atribui o evento de tipo "input" para todos inputs do tipo text de borda
    $('.range-borda').on('input', function () {        
        $(this).closest('.propriedade-linha').find('.input-group input').val($(this).val()).trigger('change');
    });


    //Atribui evento de clique aos botoes de "Borda" e "Raio da borda"
    $('.propriedade-borda-alterar button').click(function (e) {
        var id = $(this).attr('id');
        if (id === 'borda') {
            $('.border_bottom_text').css('left', '0%');
            $('.container-propriedades').animate({
                scrollLeft: -1000
            }, 500);
        } else if (id === 'border-radius') {
            $('.border_bottom_text').css('left', '50%');
            $('.container-propriedades').animate({
                scrollLeft: 1000
            }, 500);
        }


    });

    //Atribui evento de mudança ao select, para atribuir conforme for o tipo
    // de borda selecionada para cada borda unica
    $('.tipoBorda select').on('change', function () {
        let id = $(this).attr('id');
        if (id == "estiloBordaSuperior") {
            estiloCadaBorda[0] = $(this).val();
        }
        else if (id == "estiloBordaEsquerda") {
            estiloCadaBorda[1] = $(this).val();
        }
        else if (id == "estiloBordaDireita") {
            estiloCadaBorda[2] = $(this).val();
        }
        else if (id == "estiloBordaInferior") {
            estiloCadaBorda[3] = $(this).val();
        }
        atualizarBordasSeparadas(bordaSuperior.val(), bordaEsquerda.val(), bordaDireita.val(), bordaInferior.val(), estiloCadaBorda);
    })

    //Evento de input no range input de border-radius para todos
    $('#rangeinput_all_border').on('input', function () {
        $('#input_border_all').val($(this).val()).trigger('change');
    });
    $('#input_border_all').on('input', function () {
        borderRadiusTotal = $(this).val();
        atualizarBorderRadiusTotal();
    })
    $('#input_border_all').on('change', function () {
        borderRadiusTotal = $(this).val();
        atualizarBorderRadiusTotal();
    });

    //Evento de check para habilitar e desabilitar os inputs de border-radius
    $('#inputTodasBorderRadius').click(function (e) {

        if ($(this).is(':checked')) {

            //Habilitar os inputs de todo border radius
            $('#input_border_all').prop('disabled', false);
            $('#rangeinput_all_border').prop('disabled', false);

            //Desabilitar todos outros inputs de border-radius
            $('#propriedades-borderRadius *').prop('disabled', true);

            atualizarBorderRadiusTotal()
        } else {
            //Habilitar os inputs de todo border radius
            $('#input_border_all').prop('disabled', true);
            $('#rangeinput_all_border').prop('disabled', true);

            //Desabilitar todos outros inputs de border-radius
            $('#propriedades-borderRadius *').prop('disabled', false);

            
            
        }

    });

    $('.propriedades-separadas .propriedade-linha .input-group input').on('change', function(){   
        if($('#inputTodasBordas').is(':checked')){
            atualizarBorderRadiusSeparado(borderRSuperior.val(), borderREsquerda.val(), borderRDireita.val(), borderRInferior.val());
            atualizarVisualizadorAll();
        }
        else{
            atualizarBorderRadiusSeparado(borderRSuperior.val(), borderREsquerda.val(), borderRDireita.val(), borderRInferior.val());
            atualizarBordasSeparadas(bordaSuperior.val(), bordaEsquerda.val(), bordaDireita.val(), bordaInferior.val(), estiloCadaBorda);
        }
             
    });
}

function removerEventos() {
    $('#rangeinput_all').off();
    inputTodasBordas.off();
    $('#inputTodasBordas').off();
    $('#estiloBordaTotal').off();
    $('.propriedades-separadas .propriedade-linha .input-group input').off();
    $('.range-borda').off();
    $('.propriedade-borda-alterar button').off();
    $('.tipoBorda select').off();
    $('#rangeinput_all_border').off();
}

function atualizarEventos() {
    removerEventos();
    adicionarEventos();
}
adicionarEventos();