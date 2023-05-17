function renderHeader() {
    $("header").load("./header.html");
}

function renderGerador() {
    
    $('.nav-itens li a').click(function (event) {
        event.preventDefault();
        let page = $(this).data('pagina');
        $('#conteudo-exibir').fadeOut(function () {
            $('#conteudo-exibir').load(page, function () {
                $('#conteudo-exibir').fadeIn();
            })
        })        
    })
}