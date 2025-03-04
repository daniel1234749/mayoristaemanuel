document.addEventListener('DOMContentLoaded', () => {
    const descripcionInput = document.getElementById('descripcion');
    const precioInput = document.getElementById('precio');
    const proveedorInput = document.getElementById('proveedor');
    const agregarBtn = document.getElementById('agregarBtn');
    const registroTabla = document.getElementById('registroTabla').getElementsByTagName('tbody')[0];
    const exportarBtn = document.getElementById('exportarBtn');
    
    // Función para obtener la fecha actual en formato YYYY-MM-DD
    function obtenerFecha() {
      const fecha = new Date();
      const year = fecha.getFullYear();
      const month = String(fecha.getMonth() + 1).padStart(2, '0');
      const day = String(fecha.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    
    // Función para agregar un registro a la tabla
    function agregarRegistro() {
      const descripcion = descripcionInput.value;
      const precio = precioInput.value;
      const proveedor = proveedorInput.value;
      const fecha = obtenerFecha();
      
      if (!descripcion || !precio || !proveedor) {
        alert("Por favor, complete todos los campos.");
        return;
      }
      
      // Crear una nueva fila en la tabla
      const nuevaFila = registroTabla.insertRow();
      nuevaFila.insertCell(0).textContent = descripcion;
      nuevaFila.insertCell(1).textContent = precio;
      nuevaFila.insertCell(2).textContent = proveedor;
      nuevaFila.insertCell(3).textContent = fecha;
      
      // Limpiar los campos
      descripcionInput.value = '';
      precioInput.value = '';
      proveedorInput.value = '';
      
      // Foco al campo de descripción
      descripcionInput.focus();
    }
    
    // Evento para agregar el registro al presionar el botón "Agregar"
    agregarBtn.addEventListener('click', agregarRegistro);
    
    // Evento para cambiar el foco al siguiente campo al presionar Enter
    descripcionInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') precioInput.focus();
    });
    
    precioInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') proveedorInput.focus();
    });
    
    proveedorInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') agregarRegistro();
    });
    
    // Función para exportar la tabla a Excel
    exportarBtn.addEventListener('click', () => {
      let tabla = document.getElementById("registroTabla");
      let filas = tabla.rows;
      let csv = [];
  
      for (let i = 0; i < filas.length; i++) {
        let celdas = filas[i].cells;
        let fila = [];
        for (let j = 0; j < celdas.length; j++) {
          fila.push(celdas[j].innerText);
        }
        csv.push(fila.join(","));
      }
  
      let csvFile = new Blob([csv.join("\n")], { type: "text/csv" });
      let enlace = document.createElement("a");
      enlace.href = URL.createObjectURL(csvFile);
      enlace.download = "registro_precios.csv";
      enlace.click();
    });
  });
  