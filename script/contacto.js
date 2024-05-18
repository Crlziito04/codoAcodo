let nameInput = document.getElementById("name");
let lastnameInput = document.getElementById("lastname");
let emailInput = document.getElementById("email");
let celInput = document.getElementById("cel");
let masculinoInput = document.getElementById("masculino");
let femeninoInput = document.getElementById("femenino");
let serviciosSelect = document.getElementById("servicios");
let archivoInput = document.getElementById("archivo");
let textareaInput = document.getElementById("textarea");
let aceptoCheckbox = document.getElementById("acepto");
let enviarBtn = document.getElementById("btn");
let formulario = document.getElementById("formulario");

enviarBtn.addEventListener("click", (e) => {
  validar(e);
});

const validar = (event) => {
  event.preventDefault();
  if (!nameInput.value) return alert("Por favor, ingresa un nombre.");
  if (!lastnameInput.value) return alert("Por favor, ingresa un apellido.");
  if (!emailInput.value)
    return alert("Por favor, ingresa un correo electrónico.");
  if (!celInput.value)
    return alert("Por favor, ingresa un número de teléfono.");
  if (!masculinoInput.checked && !femeninoInput.checked)
    return alert("Por favor, selecciona un género.");
  if (textareaInput.value.trim() === "")
    return alert("Por favor, ingresa un comentario en el área de texto.");
  if (!serviciosSelect) return alert("Por favor, selecciona un servicio.");

  if (serviciosSelect.value === "rrhh") {
    document.getElementById("file").style.display = "block";
  } else {
    document.getElementById("file").style.display = "none";
  }

  if (!aceptoCheckbox.checked)
    return alert("Por favor, acepta los términos y condiciones.");

  console.log({
    name: nameInput.value,
    lastname: lastnameInput.value,
    cel: celInput.value,
    email: emailInput.value,
    genre: masculinoInput.checked ? "Masculino" : "Femenino",
    servicios: serviciosSelect.value,
    textarea: textareaInput.value,
    check: aceptoCheckbox.checked,
  });
  formulario.reset();
};
