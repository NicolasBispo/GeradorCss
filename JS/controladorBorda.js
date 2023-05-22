try {

    let inputTodasBordas = $('#input_all_ranges');
    let visualizador = $('.visualizador-borda');
    let estilo_borda = 'solid';
    let corBordaTotal = '#CCCCCC';


    //Array que armazena os valores de border-radius para analise
    //Estrutura 
    //1 Casa - border ativo true ou false
    //2 Casa - tipo de borda "todas" ou "separado"
    //3 Casa - regra css do border
    let todasBordasAtivo = [true, 'todos', ''];



    //Array que armazena os valores de border-radius para analise
    //Estrutura 
    //1 Casa - border-radius ativo true ou false
    //2 Casa - tipo de border-radius 0 -> todos  
    //       - tipo de border-radius 1 -> separado
    //3 Casa - regra css do border
    let tipoBorderRadius = [false, 0, ""]
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

    let colorSuperior = $('#colorSuperior');
    let colorEsquerda = $('#colorEsquerda');
    let colorDireita = $('#colorDireita');
    let colorInferior = $('#colorInferior');

    let coresBordasSeparadas = new Array(4).fill('#CCCCCC');

    let regraCssTodasBordas = "";

    //Atualiza todas as bordas do bloco
    function atualizarVisualizadorAll() {

        //Define o status da borda como ativo
        //Ou seja existe uma propriedade de borda no bloco
        todasBordasAtivo[0] = true;

        //Forma a string de css para mudar o estilo
        let css_borda = inputTodasBordas.val() + "px " + estilo_borda + " " + corBordaTotal;

        //Verifica se o valor do input é igual a zero, se for ele define o status da borda como false
        //Esse mecanismo serve para controlar na hora de exibir o css para o usuário
        if (inputTodasBordas.val() == 0) {
            todasBordasAtivo[0] = false;
        }
        //Define o tipo de borda como "todos" para imprimir como "border" para o usuário
        todasBordasAtivo[1] = "todos";

        //Armazena o valor do css para utiliza-lo para mostrar ao usuário
        todasBordasAtivo[2] = css_borda;



        //Atualiza o estilo do bloco, para o estilo de borda total
        visualizador.css('border', css_borda);

        //Executa a função para atualizar o código css que é exibido ao usuário
        atualizarCss();
    }

    //Atualiza as bordas de cada direçao do bloco
    function atualizarBordasSeparadas(top, left, right, bottom, bordaEstilo, bordaCor) {

        //Define o status da borda como ativo
        //Ou seja existe uma propriedade de borda no bloco
        todasBordasAtivo[0] = true;

        //Verifica se todos os valores de borda correspondem a 0
        //Caso sim ele desativa a propriedade de borda
        if (top == 0 && left == 0 && right == 0 && bottom == 0) {
            todasBordasAtivo[0] = false;
        }

        //Define o tipo de borda como separado, para alterar a forma como o css
        //Vai ser exibido ao usuário
        todasBordasAtivo[1] = 'separado';

        //Forma a string de cada regra css "top, left, right, bottom"
        //O formato de cada string fica no seguinte formato: "10px solid #FF0000"
        let top_css = top + "px" + " " + bordaEstilo[0] + " " + bordaCor[0];
        let left_css = left + 'px' + " " + bordaEstilo[1] + " " + bordaCor[1];
        let right_css = right + 'px' + " " + bordaEstilo[2] + " " + bordaCor[2];
        let bottom_css = bottom + "px" + " " + bordaEstilo[3] + " " + bordaCor[3];


        //Define dois arrays, um contendo as propriedades de css com cada casa com 1 string
        //O segundo contém os valores em inteiro das propriedades (dimensão)
        let cssProps = [top_css, left_css, right_css, bottom_css];
        let propriedades = [top, left, right, bottom];

        //Reseta o valor atual da regra css armazenada
        todasBordasAtivo[2] = "";

        //Percorre o array propriedades e analisa se o elemento dele é 0
        //Se for ele atribui ao invez do valor da regra css, o valor "propVazia"
        //Para que no futuro seja utilizado no tratamento da exibição do usuário
        $.each(propriedades, function (index, value) {
            if (parseInt(value) !== 0) {
                todasBordasAtivo[2] += cssProps[index] + "\n";
            }
            else {
                todasBordasAtivo[2] += "propVazia\n";
            }
        });

        //Aplica as propriedades CSS para o bloco
        visualizador.css('border-top', top_css);
        visualizador.css('border-left', left_css);
        visualizador.css('border-right', right_css);
        visualizador.css('border-bottom', bottom_css);

        //Atualiza o valor CSS exibido
        atualizarCss();
    }

    //Atualiza a border-radius total do bloco
    function atualizarBorderRadiusTotal() {

        tipoBorderRadius[0] = true;
        tipoBorderRadius[1] = "total";
        tipoBorderRadius[2] = borderRadiusTotal + "px";

        if (borderRadiusTotal == 0) {
            tipoBorderRadius[0] = false;
        }
        visualizador.css('border-radius', borderRadiusTotal + "px");
        atualizarCss();
    }
    //Atualiza a border-radius isolada de cada componente do bloco
    function atualizarBorderRadiusSeparado(ltop, rtop, lbottom, rbottom) {
        tipoBorderRadius[0] = true;
        tipoBorderRadius[1] = "separado";
        if (ltop == 0 && rtop == 0 && lbottom == 0 && rbottom == 0) {
            tipoBorderRadius[0] = false;
        }
        let ltopCss = ltop + "px";
        let rtopCss = rtop + "px";
        let lbottomCss = lbottom + "px";
        let rbottomCss = rbottom + "px";
        let cssFull = ltopCss + " " + rtopCss + " " + lbottomCss + " " + rbottomCss;

        tipoBorderRadius[2] = cssFull;

        visualizador.css('border-radius', cssFull);
    }

    function copiarCodigo() {
        var texto = $('.cssExibido').text().trim();

        // Criar um elemento temporário para armazenar o texto formatado
        var elementoTemporario = document.createElement('textarea');
        elementoTemporario.value = texto;

        // Adicionar o elemento temporário ao DOM
        document.body.appendChild(elementoTemporario);

        // Selecionar e copiar o texto formatado
        elementoTemporario.select();
        document.execCommand('copy');

        // Remover o elemento temporário do DOM
        document.body.removeChild(elementoTemporario);

        console.log("Texto copiado para a área de transferência: " + texto);
    }
    function atualizarCss() {
        //Limpa os valores contidos no html de .cssExibido
        $('.cssExibido').empty();

        //Verifica se o status da borda está como true
        if (todasBordasAtivo[0]) {


            //Se o valor armazenado em todasBordasAtivo[1] for "todos" exibe o CSS para borda totalitaria
            if (todasBordasAtivo[1] == 'todos') {

                $('.cssExibido').append(
                    `<div class='linha-css'><span class="propriedade-css">border</span>:<p class="valores-css">` + todasBordasAtivo[2] + `</p>;
<div>`
                );



            }
            //Caso seja igual a "separado" exibe o css da borda separado
            if (todasBordasAtivo[1] == "separado") {
                let propsDirecao = todasBordasAtivo[2].split('\n');
                let direcaoBorda = ['top', 'left', 'right', 'bottom'];
                $.each(propsDirecao, function (index, valor) {
                    let direcaoInserir = 'border-' + direcaoBorda[index];
                    if (valor !== "propVazia" && valor !== "") {
                        $('.cssExibido').append(
                            `<div class='linha-css'><span class="propriedade-css">` + direcaoInserir + `</span>:<p class="valores-css"> ` + valor + `</p>;
</div>`
                        )
                    }
                });

            }
        }

        //Verifica se o border radius está definido, se sim ele vai para as proximas diretrizes analisar
        if (tipoBorderRadius[0]) {
            if (tipoBorderRadius[1] == "total") {
                $('.cssExibido').append(
                    `<div class='linha-css'><span class="propriedade-css">border-radius</span>:<p class="valores-css"> ` + tipoBorderRadius[2] + `</p>;
</div>`
                )
            }
            if (tipoBorderRadius[1] == "separado") {
                $('.cssExibido').append(
                    `<div class='linha-css'><span class="propriedade-css">border-radius</span>:<p class="valores-css"> ` + tipoBorderRadius[2] + `</p>;
</div>`
                )

            }
        }
    }



    let triggerInput1 = true;
    //Adiciona evento para cada componenente
    function adicionarEventos() {

        //Evento de "input" no input do tipo range, que se refere a todas bordas
        $('#inputRangeBorderAll').on('input', function () {
            inputTodasBordas.val($(this).val()).trigger('change');
            $('#propriedades-bordaSimples .range-borda').val($(this).val()).trigger('change');
            $('#propriedades-bordaSimples .input-group input').val($(this).val()).trigger('change');
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

        //Evento de color picker de todas bordas
        $('#colorPickerAllBorders').on('input', function () {
            corBordaTotal = $(this).val();
            atualizarVisualizadorAll();
        })

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
                $('#inputRangeBorderAll').prop('disabled', false);

                //Desabilita todos os outros inputs restantes
                //No caso os que pertencem a cada borda isolada
                $("#propriedades-bordaSimples *").prop('disabled', true);

                atualizarVisualizadorAll();
                if (tipoBorderRadius[1] == "total") {
                    atualizarBorderRadiusTotal();
                }
                if (tipoBorderRadius[1] == "separado") {
                    atualizarBorderRadiusSeparado(borderRSuperior.val(), borderREsquerda.val(), borderRDireita.val(), borderRInferior.val());
                }

            } else {
                //Desmarcado

                triggerInput1 = false;
                //Desabilita o tipo o input do tipo select de todas bordas
                $('#estiloBordaTotal').prop('disabled', true);

                //Desabilita o input tipo text de todas bordas
                $('#input_all_ranges').prop('disabled', true);

                //Desabilita o input do tipo range de todas bordas
                $('#inputRangeBorderAll').prop('disabled', true);

                //Habilita todos inputs de cada borda
                $("#propriedades-bordaSimples *").prop('disabled', false);

                //atualizarEventos();
                atualizarBordasSeparadas(bordaSuperior.val(), bordaEsquerda.val(), bordaDireita.val(), bordaInferior.val(), estiloCadaBorda, coresBordasSeparadas);
            }

        });

        let contador = 0;
        //Evento de change para controle de select da borda
        $('#estiloBordaTotal').on('change', function () {
            estilo_borda = $(this).val();

            contador += 1;
            atualizarVisualizadorAll();
        });

        //Atribui o evento de input para os input do tipo text do border isolado
        $('.propriedades-separadas .propriedade-linha .input-group input').on('input', function () {
            if (triggerInput1) {

            }
            else {
                atualizarBordasSeparadas(bordaSuperior.val(), bordaEsquerda.val(), bordaDireita.val(), bordaInferior.val(), estiloCadaBorda, coresBordasSeparadas);
            }
        })
        //Atribui o evento de change para os input do tipo text do border isolado
        $('.propriedades-separadas .propriedade-linha .input-group input').on('change', function () {
            if (triggerInput1) {

            }
            else {
                atualizarBordasSeparadas(bordaSuperior.val(), bordaEsquerda.val(), bordaDireita.val(), bordaInferior.val(), estiloCadaBorda, coresBordasSeparadas);
            }
        })

        //Atribui o evento de tipo "input" para todos inputs do tipo text de borda
        $('.range-borda').on('input', function () {
            $(this).closest('.propriedade-linha').find('.input-group input').val($(this).val()).trigger('change');
        });

        //Evento que manipula todos color picker
        $('#propriedades-bordaSimples .flexbox-container .corPick input').on('input', function () {

            let id = $(this).attr('id');
            if (id == "colorSuperior") {
                coresBordasSeparadas[0] = $(this).val();
            }
            else if (id == "colorEsquerda") {
                coresBordasSeparadas[1] = $(this).val();
            }
            else if (id == "colorDireita") {
                coresBordasSeparadas[2] = $(this).val();
            }
            else if (id == "colorInferior") {
                coresBordasSeparadas[3] = $(this).val();
            }
            atualizarBordasSeparadas(bordaSuperior.val(), bordaEsquerda.val(), bordaDireita.val(), bordaInferior.val(), estiloCadaBorda, coresBordasSeparadas);

        })


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
        $('#propriedades-bordaSimples .tipoBorda select').on('change', function () {
            if (tipoBorderRadius[1] = 'separado') {
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
                atualizarBordasSeparadas(bordaSuperior.val(), bordaEsquerda.val(), bordaDireita.val(), bordaInferior.val(), estiloCadaBorda, coresBordasSeparadas);
            }

        })

        //Evento de input no range input de border-radius para todos
        $('#rangeinput_all_border').on('input', function () {
            $('#input_border_all').val($(this).val()).trigger('change');
            $('#propriedades-borderRadius .range-borda').val($(this).val()).trigger('change');
            $('#propriedades-borderRadius .input-group input').val($(this).val()).trigger('change');
            atualizarBorderRadiusTotal();
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
                atualizarBorderRadiusTotal();

            } else {
                //Habilitar os inputs de todo border radius
                $('#input_border_all').prop('disabled', true);
                $('#rangeinput_all_border').prop('disabled', true);

                //Desabilitar todos outros inputs de border-radius
                $('#propriedades-borderRadius *').prop('disabled', false);
                atualizarBorderRadiusSeparado(borderRSuperior.val(), borderREsquerda.val(), borderRDireita.val(), borderRInferior.val());



            }

        });

        $('.propriedades-separadas .propriedade-linha .input-group input').on('change', function () {
            if ($('#inputTodasBordas').is(':checked')) {
                atualizarBorderRadiusSeparado(borderRSuperior.val(), borderREsquerda.val(), borderRDireita.val(), borderRInferior.val());
                atualizarVisualizadorAll();
            }
            else {
                atualizarBorderRadiusSeparado(borderRSuperior.val(), borderREsquerda.val(), borderRDireita.val(), borderRInferior.val());
                atualizarBordasSeparadas(bordaSuperior.val(), bordaEsquerda.val(), bordaDireita.val(), bordaInferior.val(), estiloCadaBorda, coresBordasSeparadas);
            }

        });
    }

    function removerEventos() {
        $('#rangeinput_all').off();
        inputTodasBordas.off();
        $('#colorPickerAllBorders').off();
        $('#inputTodasBordas').off();
        $('#estiloBordaTotal').off();
        $('.propriedades-separadas .propriedade-linha .input-group input').off();
        $('.range-borda').off();
        $('#propriedades-bordaSimples .flexbox-container .corPick input').off();
        $('.propriedade-borda-alterar button').off();
        $('.tipoBorda select').off();
        $('#rangeinput_all_border').off();
        $('#input_border_all').off();
        $('#inputTodasBorderRadius').off();
        $('.propriedades-separadas .propriedade-linha .input-group input').off();
    }

    function atualizarEventos() {
        removerEventos();
        adicionarEventos();
    }
    adicionarEventos();
}
catch (error) {
    console.log('Erro capturado: ' + error + " Prosseguindo execução")
}