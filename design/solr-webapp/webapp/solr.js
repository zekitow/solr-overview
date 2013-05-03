var HOST = 'http://localhost:8983/solr/products';

Solr = {
  commands: {
    full_import: HOST + '/dataimport?command=full-import&clean=false&commit=true&wt=json&indent=true',
    status: HOST + '/dataimport?command=status&wt=json',
    find: HOST + '/select?wt=json&indent=true&q='
    
  }
}

$(document).ready(function() {
  jQuery.fn.exists = function(){return this.length>0;}
  thead = function(data) { return '<th>' + data + '</th>' }
  tbody = function(data) { return '<td>' + data + '</td>' }
  
  clear = function() {
    $('div.status').removeClass('hide'); 
    $('div.status').addClass('hide'); 
    $('div.status').html('');
    $('table thead').html('');
    $('table tbody').html('');
  }
  
  $("#indexar").click(function() {
    clear();
    $.ajax({
      url: Solr.commands.full_import
    }).done(function(data) {
      $('div.status').removeClass('hide');
      $('div.status').html("<b>Indexando...</b>");
      
      $('table thead').append('<tr>');
      $('table thead tr').append(thead("Committed"));
      $('table thead tr').append(thead("Time Taken"));
      $('table thead tr').append(thead("Total Documents"));
      $('table thead').append('</tr>');

      $('table tbody').append('<tr>');
      $('table tbody tr').append(tbody(data.statusMessages["Committed"]));
      $('table tbody tr').append(tbody(data.statusMessages["Time taken"]));
      $('table tbody tr').append(tbody(data.statusMessages["Total Documents Processed"]));
      $('table tbody').append('</tr>');
    });
  });
  
  $("#status").click(function() {
    clear();
    $.ajax({
      url: Solr.commands.full_import
    }).done(function(data) {
      $('div.status').removeClass('hide');
      $('div.status').html("<b>Status: </b>" + data["status"]);
    });
  });
  
  $("#search").click(function() {
    clear();
    term = '*'
    if ($('#keyword').val() != '') term = $('#keyword').val();
    
    var q = term + '*';
    $.ajax({
      url: Solr.commands.find + q
    }).done(function(data) {
      $('table thead').append('<tr>');
      $('table thead tr').append(thead("Categoria"));
      $('table thead tr').append(thead("Nome"));
      $('table thead tr').append(thead("Preco"));
      $('table thead').append('</tr>');
  
      var body = '';
      for (var item in data.response.docs) {
        body += ('<tr>');
        body += (tbody(data.response.docs[item]["category"]));
        body += (tbody(data.response.docs[item]["product_name"]));
        body += (tbody(data.response.docs[item]["price"]));
        body += ('</tr>');
      }
      $('table tbody').append(body);
    });
  });  
})
