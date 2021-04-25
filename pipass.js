$( document ).ready(function() {

var searchAsset=null;

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
    $.post("inject.php",
    {
      asset: searchAsset
    },
    function(data,status){
      alert("Asset: " + data + "\nStatus: " + status);
    });
  });

});
