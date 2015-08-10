function buscaAPI(urlB, temp, resu) {
    debugger;
    var url = urlB,
        callback = typeof retorno !== 'undefined' ? retorno : null;

    url += jQuery('#pesquisaForm').serialize();

    jQuery.get(url)
             .done(function (data) {
               
                 process(data.resultado, callback, temp, resu);
                 
                 jQuery('.paginador').pagination({
                     items: data.total,
                     itemsOnPage: data.itens,
                     cssStyle: 'light-theme',
                     prevText: 'Anterior',
                     nextText: 'Próximo',
                     onPageClick: function (page) {
                         jQuery.get(urlB + jQuery('#pesquisaForm').serialize() + '&page=' + page)
                             .done(function (d) {
                                 
                                 process(d.resultado, callback, temp, resu);
                                 jQuery('.paginador').pagination('updateItems', d.total);
                             });
                     }
                 });
             });

    jQuery('.itensPagina').change(function () {
      
        itens = jQuery(this).val();
        jQuery('.itensPagina, #itens').val(itens);
        jQuery('.paginador').pagination('updateItemsOnPage', itens);
    });

    jQuery('#pesquisaForm').submit(function (e) {
        debugger;
        e.preventDefault();
        
        jQuery('.paginador').pagination('updateItemsOnPage', jQuery('#itens').val());
    });

    jQuery("#dataIni").datepicker({
        defaultDate: "+1w",
        dateFormat: 'dd/mm/yy',
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        nextText: 'Próximo',
        prevText: 'Anterior',
        onClose: function (selectedDate) {
            jQuery("#dataFim").datepicker("option", "minDate", selectedDate);
        }
    });
    jQuery("#dataFim").datepicker({
        defaultDate: "+1w",
        dateFormat: 'dd/mm/yy',
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        nextText: 'Próximo',
        prevText: 'Anterior',
        onClose: function (selectedDate) {
            jQuery("#dataIni").datepicker("option", "maxDate", selectedDate);
        }
    });
};

function process(data, callback,temp, resu) {
    debugger;
    var template = jQuery.templates("#"+temp);
    var html = template.render(data, { format: formataData, formatitulo: formataTituloParaLink, folder: formataPastaAudio, formaTexto: formataTextoParaHiperLink });
    jQuery("#"+resu).html(html);
    if (resu == 'resultadoSecretaria') {
      
        jQuery("#nome_organismo").html(jQuery(".nome_organismo").val())
    }
    $(".txttelefone").mask("(00) 0000-00009");
    if (callback) {
        callback();
    }
}
function formataData(data) {
   
    var d = new Date(data);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var hour = d.getHours();
    var min = d.getMinutes();
    if (day < 10)
        day = "0" + day;
    if (month < 10)
        month = "0" + month;
    if (hour < 10)
        hour = '0' + hour;
    if (min < 10)
        min = '0' + min;
    var date = day + "/" + month + "/" + year + " | " + hour + ":" + min;

    return date;
}
function formataTituloParaLink(titulo) {
  
    var novoTitulo = titulo;
    return novoTitulo.replace(/ /g, "-");;
}
function formataPastaAudio(data) {
   
    var d = new Date(data);
    
    var day = d.getUTCDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10)
        day = "0" + day;
    if (month < 10)
        month = "0" + month;

    var pasta = day + "." + month + "." + year;

    return pasta;
}
function formataTextoParaHiperLink(texto, filtros) {
    var hiperTexto = texto;
    
    var RegExp = /[\[\"|\"\]]/g;
      filtros = filtros.split(',');
      
        for (var i = 0; filtros.length > i; i++) {
            
            var filtro = filtros[i].replace(RegExp, "");
          

            hiperTexto = hiperTexto.replace(filtro + " ", "<a style='text-decoration: underline ' href='/Noticias/" + filtro + "'> " + filtro + "</a> ");
           
        } return hiperTexto;

  
   
   
}
function formataTexto(texto) {
    var hiperTexto = texto;

     hiperTexto = hiperTexto.replace(filtro + " ", "<a style='text-decoration: underline ' href='/Noticias/" + filtro + "'> " + filtro + "</a> ");

     return hiperTexto;




}
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
function formataClasse(chapeu) {
    var classe = chapeu.toLowerCase();

    var tags = ['esporte', 'cidadania', 'infraestrutura', 'investimentos', 'planejamento'];
    if (tags.indexOf(classe) < 0) {
        switch (chapeu) {
            case 'promoção social':
                classe = 'promocao_social';
                break;
            case 'saúde':
                classe = 'saude';
                break;
            case 'segurança':
                classe = 'seguranca';
                break;
            case 'educação':
                classe = 'educacao';
                break;
            default:
                classe = 'cidadania';
        }
    }

    return classe;
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function criaPlayerDeAudio() {
    jQuery(".cp-container").each(function () {
        var id = $(this).attr("data-id");
        var data = $(this).attr("data-data");
        var arquivo = $(this).attr("data-arquivo");
        var myCirclePlayer = new CirclePlayer("#jquery_jplayer_"+$(this).attr("data-id"),
            {
                m4a: "http://www.redepara.com.br/imagens/anexo/"+data+"/"+arquivo,
              
            }, {
                cssSelectorAncestor: "#cp_container_" + $(this).attr("data-id")
            });
    });
}

