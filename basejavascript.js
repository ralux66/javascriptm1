function mostrarFormulario(clear) {
  document.getElementById("containerForm").style.display = "block";
  document.getElementById("tableContacto").style.display = "none";
  //Borrar informacion anterior.
  if (clear) {
    document.getElementById("pnombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("country").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("idguicontact").value = "";
  } 
}

function ocultarFormulario() {
  document.getElementById("containerForm").style.display = "none";
  document.getElementById("tableContacto").style.display = "block";
}

function crearTable() {
  var divObj = document.getElementById("tableContacto");
  var tableObje = document.createElement("table");
  tableObje.id = "tableContent";

  //Header
  var filaHeaderObj = document.createElement("tr");
  var headerContactObj = document.createElement("th");
  var headerNombreObj = document.createElement("th");
  var headerApellidoObj = document.createElement("th");
  var headerPaisObj = document.createElement("th");
  var headerTelefonoObj = document.createElement("th");
  var headerEmailObj = document.createElement("th");
  var headerEditarObj = document.createElement("th");
  var headerBorrarObj = document.createElement("th");

  headerContactObj.textContent = "Contact";
  headerNombreObj.textContent = "Nombre";
  headerApellidoObj.textContent = "Apellido";
  headerPaisObj.textContent = "Pais";
  headerTelefonoObj.textContent = "Telefono";
  headerEmailObj.textContent = "Email";
  headerEditarObj.textContent = "Editar";
  headerBorrarObj.textContent = "Borrar";

  filaHeaderObj.appendChild(headerContactObj);
  filaHeaderObj.appendChild(headerNombreObj);
  filaHeaderObj.appendChild(headerApellidoObj);
  filaHeaderObj.appendChild(headerPaisObj);
  filaHeaderObj.appendChild(headerTelefonoObj);
  filaHeaderObj.appendChild(headerEmailObj);
  filaHeaderObj.appendChild(headerEditarObj);
  filaHeaderObj.appendChild(headerBorrarObj);
  tableObje.appendChild(filaHeaderObj);
  divObj.appendChild(tableObje);
  //end Header
}

function guardarContacto() {
  try {
    var nombre, apellido, email, pais, contactid;
    contactid = document.getElementById("idguicontact").value;

    if (contactid) {
      editRow(contactid, false);
    } else {
      var tableObje = document.getElementById("tableContent");
      nombre = document.getElementById("pnombre").value;
      apellido = document.getElementById("apellido").value;
      pais = document.getElementById("country").value;
      email = document.getElementById("email").value;
      phone = document.getElementById("phone").value;
      var randomNum = Math.floor(Math.random() * 11);

      //#region row edit
      var filaObj = document.createElement("tr");
      var imgObj = document.createElement("td");
      var nombreObj = document.createElement("td");
      var apellidoObj = document.createElement("td");
      var countryObj = document.createElement("td");
      var emailObj = document.createElement("td");
      var phoneObj = document.createElement("td");
      var editObj = document.createElement("td");
      var borrarObj = document.createElement("td");

      var guidObj = document.createElement("td");
      guidObj.textContent = CreateGuid();
      guidObj.style.display = "none";

      var buttonEdit = document.createElement("a");
      buttonEdit.href = `javascript:editRow('${guidObj.textContent}',true);`;
      buttonEdit.className = "linkEditar";
      buttonEdit.textContent = "Editar";
      editObj.appendChild(buttonEdit);
      var buttonBorrar = document.createElement("a");
      buttonBorrar.href = `javascript:borrarRow('${guidObj.textContent}');`;
      buttonBorrar.textContent = "Borrar";
      buttonBorrar.className = "linkBorrar";
      borrarObj.appendChild(buttonBorrar);

      nombreObj.textContent = nombre;
      apellidoObj.textContent = apellido;
      countryObj.textContent = pais;
      emailObj.textContent = email;
      phoneObj.textContent = phone;

      var imgObjEle = document.createElement("IMG");
      imgObjEle.src = `https://randomuser.me/api/portraits/men/${randomNum}.jpg`;
      imgObj.appendChild(imgObjEle);

      filaObj.appendChild(imgObj);
      filaObj.appendChild(nombreObj);
      filaObj.appendChild(apellidoObj);
      filaObj.appendChild(countryObj);
      filaObj.appendChild(emailObj);
      filaObj.appendChild(phoneObj);
      filaObj.appendChild(editObj);
      filaObj.appendChild(borrarObj);
      filaObj.appendChild(guidObj);
      tableObje.appendChild(filaObj);
      //#endregion
    }
    ocultarFormulario();
  } catch (error) {
    alert(error);
  }
}

function editRow(rowid, editrow = true) {
  var xObj = document.getElementById("tableContent").rows;
  var breakRow = false;
  if (editrow) {
    for (let index = 1; index < xObj.length; index++) {
      var celdas = xObj[index].cells.length;
      for (let p = 1; p < celdas; p++) {
        var guid = xObj[index].cells[p].innerHTML;
        if (rowid === guid) {
          document.getElementById("pnombre").value =
            xObj[index].cells[1].innerHTML;
          document.getElementById("apellido").value =
            xObj[index].cells[2].innerHTML;
          document.getElementById("country").value =
            xObj[index].cells[3].innerHTML;
          document.getElementById("phone").value =
            xObj[index].cells[4].innerHTML;
          document.getElementById("email").value =
            xObj[index].cells[5].innerHTML;
          document.getElementById("idguicontact").value =
            xObj[index].cells[8].innerHTML;
          breakRow = true;
          break;
        }
        if (breakRow) break;
      }
    }
    mostrarFormulario(false);
  } else {
    for (let index = 1; index < xObj.length; index++) {
      var celdas = xObj[index].cells.length;
      for (let p = 1; p < celdas; p++) {
        var guid = xObj[index].cells[p].innerHTML;
        if (rowid === guid) {
          xObj[index].cells[1].innerHTML =
            document.getElementById("pnombre").value;
          xObj[index].cells[2].innerHTML =
            document.getElementById("apellido").value;
          xObj[index].cells[3].innerHTML =
            document.getElementById("country").value;
          xObj[index].cells[4].innerHTML =
            document.getElementById("phone").value;
          xObj[index].cells[5].innerHTML =
            document.getElementById("email").value;
          xObj[index].cells[8].innerHTML =
            document.getElementById("idguicontact").value;
          breakRow = true;
          break;
        }
        if (breakRow) break;
      }
    }
    ocultarFormulario();
  }
}

function borrarRow(rowid){
  var breakRow = false;
  var xObj = document.getElementById("tableContent").rows;
  for (let index = 1; index < xObj.length; index++) {
    var celdas = xObj[index].cells.length;
    for (let p = 1; p < celdas; p++) {
      var guid = xObj[index].cells[p].innerHTML;
      if (rowid === guid) {
        document.getElementById("tableContent").deleteRow(index);
        breakRow = true;
        break;
      }
      if (breakRow) break;
    }
  }
}

//Utility
function CreateGuid() {
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}


