export default function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  const value = input.validity.valid;
  if (value) {
    input.parentElement.classList.remove(".input-container");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector("input-message-error").innerHTML =
      mostrarMesajeDeError(tipoDeInput, input);
  }
}

const tipoErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "El campo nombre puede estar vacio",
  },
  email: {
    valueMissing: "El campo correo no puede estar vacio",
    typeMismatch: "El correo no es valido",
  },
  password: {
    valueMissing: "Este campo correo no puede estar vacio",
    patternMismatch:
      "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
  },
  nacimiento: {
    valueMissing: "El campo nacimiento no puede estar vacio",
    customError: "Debes tener al menos 18 años de edad",
  },
  numero: {
    valueMissing: "El campo Numero es  requerido",
    patternMismatch : " el formato requerido es XXXXXXXXXX 10 numeros"
  },
  direccion: {
    valueMissing: "El campo direccion es  requerido",
    patternMismatch : "la direccion debe contener entre 10 a 40 caracteres"
  },
  ciudad: {
    valueMissing: "El campo ciudad es  requerido",
    patternMismatch : "la ciudad debe contener entre 10 a 40 caracteres"
  },
  estado: {
    valueMissing: "El campo estado es  requerido",
    patternMismatch : "la estado debe contener entre 10 a 40 caracteres"
  }
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMesajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tipoErrores.forEach(error => {
    if(input.validity[error]){
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }
  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFecha = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  const validaEdad = diferenciaFecha <= fechaActual;
  return validaEdad;
}
