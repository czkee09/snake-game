   var xmlhttp;
    function ok()
    {

        if(window.XMLHttpRequest)
        {
      xmlhttp = new XMLHttpRequest();
        }else
        {
      xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
 xmlhttp.open('get', 'http://localhost:8080/F/12345', true);//“Ï≤Ω


        xmlhttp.onreadystatechange = function(){
 //alert(xmlhttp.readyState); alert(xmlhttp.status);
    if(xmlhttp.readyState== 4 && xmlhttp.status == 200)
            {
    document.getElementById('id4').innerHTML = xmlhttp.responseText;

            }

}

        xmlhttp.send(null);

       // document.getElementById('id4').innerHTML = xmlhttp.responseText;
    }
