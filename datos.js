const { cursos } = require('./cursos')
const fs = require('fs')




const opciones = {
    id: {
      demand: true,
      alias: "i"
    },
    nombre: {
      demand: true,
      alias: "n"
    },
    cedula: {
      demand: true,
      alias: "c"
    }
  }

  const argv = require('yargs')
  .command('inscribir', 'listar cursos', opciones)
  .argv;

  //función para mostrar la lista de cursos con una espera de  dos segundos
function listarCurso(cursos, posicion, callback) {
    const curso = cursos[posicion];
    setTimeout(function () {
        let { id, nombre, duracion, valor } = curso;
      console.log('El codigo del curso es: ' + id + ' El nombre del curso es ' + nombre + ',La duración del curso es: ' + duracion + ' horas' + ', El curso tiene un valor de $' + valor + ' pesos')
      callback(posicion)
    }, 2000);
  }

//funcion para recorrer todos los cursos
var cont = 0
function recorrer() {
  listarCurso(cursos, cont, posicion => {
    if (posicion < cursos.length - 1) {
      cont = posicion + 1;
      recorrer();
    }
  })
}



//Crear el archivo con los datos de la inscripción
function crearArchivo (cedula, nombreEstudiante, curso) {
  var { id, nombre: nombreCurso, duracion, valor } = curso;
      var texto = `El nombre del estudiante es  ${nombreEstudiante} \n 
     La cédula es:  ${cedula} \n El id cel curso es: ${id}
    \n El nombre del curso es:  ${nombreCurso} \n
     Con una duración de:  ${duracion} horas Y un valor de: $  ${valor} pesos`;

fs.writeFile('matricula.txt', texto, (err) => {
    if(err) throw (err);
    console.log('Se creó el archivo correctamente y se realizó la inscripción')


});
}


//Inscribir un curso
function inscribirCurso(id, nombre, cedula) {
  let curso = cursos.find(function (curso) {
    return curso.id == id
  })
  if (curso == undefined) {
    console.log("id no válido, no pertenece a ningún curso");
    recorrer();
  } else {
    crearArchivo(cedula, nombre, curso);
  }
}

if (argv._[0] == "inscribir") {
  var { i, n, c } = argv;
  inscribirCurso(i, n, c)
} else {
 recorrer();
}