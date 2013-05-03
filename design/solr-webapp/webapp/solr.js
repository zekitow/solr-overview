var HOST = 'http://localhost:8983/solr/products';

Solr = {
  commands: {
    full_import: HOST + '/dataimport?command=full-import&clean=false&commit=true&wt=json&indent=true',
    status: HOST + '/dataimport?command=status&wt=json'
  }
}

$(document).ready(function() {
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
      $('div.status').toggleClass('hide');
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
      $('div.status').toggleClass('hide');
      $('div.status').html("<b>Status: </b>" + data["status"]);
    });
  });
})
