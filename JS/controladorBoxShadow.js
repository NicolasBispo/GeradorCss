try{

    let tamanhoHorizontal = $('#tamanhoHorizontal').val();
    let tamanhoVertical = $('#tamanhoVertical').val();
    let nivelDesfoque = $('#nivelDesfoque').val();
    let raioDesfoque = $('#raioDesfoque').val();

    tamanhoHorizontal = 10;
    tamanhoVertical = 10;
    nivelDesfoque = 10;
    raioDesfoque = 10;
    let tipoBoxShadow = $("input[name='opcao']:checked").val();
    let corBoxShadow = "rgba(0, 0, 0, 0.75)"

    function alterarParametros(tamanhoHorizontalNovo, tamanhoVerticalNovo, nivelDesfoqueNovo, raioDesfoqueNovo, tipoBoxShadowNovo, corBoxShadowNovo){
        let visualizador = $('.visualizador-boxshadow');
        let novoCss = tipoBoxShadowNovo + " " + tamanhoHorizontalNovo + "px " + tamanhoVerticalNovo + "px " + nivelDesfoqueNovo + "px " + raioDesfoqueNovo + "px " + corBoxShadowNovo;
        console.log("Nova regra css: ", novoCss)
        visualizador.css("-webkit-box-shadow", novoCss);
        visualizador.css("-moz-box-shadow", novoCss);
        visualizador.css("box-shadow", novoCss);
        atualizarCss(novoCss);
    }

    function atualizarCss(regraCss){
        $('.css-exibido').html('');
        $('.css-exibido').append(
            `
            <div class="propriedade-linha-css" id="prop-bx-1">
            <code>
                <span class="propriedade-css">-webkit-box-shadow</span>: <span class="valor-prop-css">` + regraCss +`</span>;
            </code>            
        </div>
        <div class="propriedade-linha-css" id="prop-bx-1">
        <code>
            <span class="propriedade-css">-moz-box-shadow</span>: <span class="valor-prop-css">` + regraCss +`</span>;
        </code>            
    </div>
    <div class="propriedade-linha-css" id="prop-bx-1">
    <code>
        <span class="propriedade-css">box-shadow</span>: <span class="valor-prop-css">` + regraCss +`</span>;
    </code>            
</div>
    `

        )
    }
    function adicionarEventos(){

        //Adicionar evento de controlar todos inputs do tipo range
        //Para que quando seu valor altere ele também altere os
        //Inputs do tipo text
        $('.range_input').on('input', function(){
            $(this).closest('.propriedade-input').find('.prop-l1 input').val($(this).val()).trigger('change');
        });
        $('.range_input').on('change', function(){
            $(this).closest('.propriedade-input').find('.prop-l1 input').val($(this).val()).trigger('change');
        });

        //Adicionar evento de mudança por input e change
        //Nos inputs de tipo text
        //Input tamanhoHorizontal
        $(".prop-l1 input").on('input', function(){
            let id = $(this).attr('id');

            if(id == "tamanhoHorizontal"){
                tamanhoHorizontal = $(this).val();
            }
            if(id == "tamanhoVertical"){
                tamanhoVertical = $(this).val();
            }
            if(id == "nivelDesfoque"){
                nivelDesfoque = $(this).val();
            }
            if(id == "raioDesfoque"){
                raioDesfoque = $(this).val();
            }
            console.log("Evento capturado", tamanhoHorizontal, tamanhoVertical, nivelDesfoque, raioDesfoque, tipoBoxShadow, corBoxShadow)
            alterarParametros(tamanhoHorizontal, tamanhoVertical, nivelDesfoque, raioDesfoque, tipoBoxShadow, corBoxShadow)
        });
        $(".prop-l1 input").on('change', function(){
            let id = $(this).attr('id');

            if(id == "tamanhoHorizontal"){
                tamanhoHorizontal = $(this).val();
            }
            if(id == "tamanhoVertical"){
                tamanhoVertical = $(this).val();
            }
            if(id == "nivelDesfoque"){
                nivelDesfoque = $(this).val();
            }
            if(id == "raioDesfoque"){
                raioDesfoque = $(this).val();
            }
            console.log("Evento capturado", tamanhoHorizontal, tamanhoVertical, nivelDesfoque, raioDesfoque, tipoBoxShadow, corBoxShadow)
            alterarParametros(tamanhoHorizontal, tamanhoVertical, nivelDesfoque, raioDesfoque, tipoBoxShadow, corBoxShadow)
        });

        //Evento de alteração do tipo de box shadow
        $('input[type="radio"][name="opcao"]').change(function() {
            tipoBoxShadow = $(this).val();
            alterarParametros(tamanhoHorizontal, tamanhoVertical, nivelDesfoque, raioDesfoque, tipoBoxShadow, corBoxShadow)
          });
        
          //Evento de colorpick do tipo input
          $('#colorpick-shadow').on('input', function(){
            $('#textcolor-shadow').val($(this).val()).trigger('change');
            corBoxShadow = $(this).val();
            alterarParametros(tamanhoHorizontal, tamanhoVertical, nivelDesfoque, raioDesfoque, tipoBoxShadow, corBoxShadow)
          });
          $('#textcolor-shadow').on('input', function(){
            $('#colorpick-shadow').val($(this).val())
            corBoxShadow = $(this).val();
            alterarParametros(tamanhoHorizontal, tamanhoVertical, nivelDesfoque, raioDesfoque, tipoBoxShadow, corBoxShadow)
          })


        
    }
    adicionarEventos();
    alterarParametros(tamanhoHorizontal, tamanhoVertical, nivelDesfoque, raioDesfoque, tipoBoxShadow, corBoxShadow);

}
catch(error){
    console.log("Erro capturado, prosseguindo.");
}