var HOST = 'http://localhost:8983/solr/products';

Solr = {
  commands: {
    full_import: HOST + '/dataimport?command=full-import&clean=false&commit=true&wt=json&indent=true',
    status: HOST + '/dataimport?command=status&wt=json',
    find: HOST + '/select?wt=json&indent=true&rows=100&q='

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
    $('table').addClass('hide');
    $('table thead').html('');
    $('table tbody').html('');
  }

  $("#indexar").click(function() {
    clear();
    $.ajax({
      url: Solr.commands.full_import
    }).done(function(data) {

      $('div.status').removeClass('hide');
      $('table').removeClass('hide');
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

  $('#keyword').keypress(function(e) {
    if(e.which == 13) $('#search').trigger('click');
  });

  $("#search").click(function() {
    clear();
    term = ''
    if ($('#keyword').val() != '') {
      term = $('#keyword').val();
    }

    q = 'category:' + term + '* ';
    q += 'product_name:' + term + '* ';
    q += 'price:' + term + '* ';
    q += 'description:' + term + '*';

    var facet = ' ';
    if ($('#facets').is(':checked')) {
      facet += '&facet=true&facet.field=category&facet.mincount=1'
    }

    $.ajax({
      url: Solr.commands.find + q + ' surprise:' + (term || '*') + facet
    }).done(function(data) {

      if ($('#facets').is(':checked')) {
        $('div.facets').removeClass('hide');
        $('div.facets').html('<ul></ul>');;
        for (var i=0,size = data.facet_counts.facet_fields.category.length; i < size; i++) {
          item = data.facet_counts.facet_fields.category[i++];
          count = data.facet_counts.facet_fields.category[i];
          $('div.facets ul').append('<li>')
            .append(' ').append(item + ' (').append(count).append(')');
          $('div.facets ul').append('</li>');
        }
      }

      $('table').removeClass('hide');
      $('table thead').append('<tr>');
      $('table thead tr').append('#');
      $('table thead tr').append(thead("Categoria"));
      $('table thead tr').append(thead("Nome"));
      $('table thead tr').append(thead("Descrição"));
      $('table thead tr').append(thead("Preço"));
      $('table thead').append('</tr>');

      var i = 1;
      var body = '';
      for (var item in data.response.docs) {
        body += ('<tr>');
        body += (tbody(i++));
        body += (tbody(data.response.docs[item]["category"]));
        body += (tbody(data.response.docs[item]["product_name"]));
        body += (tbody(data.response.docs[item]["description"]));
        body += (tbody(data.response.docs[item]["price"] + ',00'));
        body += ('</tr>');
      }
      $('table tbody').append(body);

      $('div.status').removeClass('hide');
      $('div.status').html("<b>Query:</b><br/><pre>" + q + "</pre>");
      if(facet.trim() != '') $('div.status').append("<br/><b>Facet Query:</b><br/><pre>" + facet + "</pre>");
    });
  });
})
