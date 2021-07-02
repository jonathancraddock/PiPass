$( document ).ready(function() {

//laptop asset number
var searchAsset=null;

//initiate a heartbeat every second
var listening = window.setInterval(pipassListen, 2000);

  //load password list
  var passwords = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/passwords.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
  })();

  //is PiPass listening?
  //change background colour of status box to indicate potential problem
  function pipassListen() {
    $.ajax({
      type: "POST",
      url: 'listen.php',
      timeout: 1000,
      error: function() { $('#lastStatus').css('background-color', '#dbc2bf'); },
      success: function() { $('#lastStatus').css('background-color', '#c1dbbf'); }
    });
  }
  
  //search for asset
  $('#assetTag').on("input", function(){
    searchAsset = $(this).val();
    if (passwords[searchAsset] === undefined)  {
      $('#confirm').prop('disabled', true);
      $('#confirm').prop('checked', false);
      $('#assetPass').val('');
      $('#assetPassGo').attr('disabled', 'disabled');
      return;
    } else if (passwords[searchAsset] != '') {
      $('#assetPass').val(passwords[searchAsset]);
      assetVal = passwords[searchAsset];
      $('#confirm').prop('disabled', false);
    }
  });

  //activate Go! button
  $('#confirm').click(function(){
    if( $('#confirm').prop('checked')==true ) {
      $('#assetPassGo').removeAttr('disabled');
    } else {
      $('#assetPassGo').attr('disabled', 'disabled');
    }
  });
  
  //send asset to USB inject script
  $("#assetPassGo").click(function(){
    if( $('#confirm').prop('checked')==true ) {
      $('#lastStatus').html("");
      $.post("inject.php",
      {
        asset: searchAsset
      },
      function(data,status){
        var dt = new Date();
        var utcDate = dt.toUTCString();
        $('#lastStatus').html(utcDate + "<br />PHP: " + status + "<br />BASH: " + data);
      });
    }
  });

});
