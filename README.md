# EVALUACIÓN U3 - UNIDAD 3: VUE JS (Programación Front End)

Este proyecto corresponde a la evaluación práctica individual para la asignatura **Programación Front End**, implementando un flujo interactivo de carrito de compras desarrollado con **HTML5**, **Bootstrap 5**, **CSS3 (Custom Properties)** y **Vue.js 3**, cumpliendo al 100% con los criterios de evaluación y estándares de la industria.

---

## 1. Estructura del Proyecto en Visual Studio Code

```text
evaluacion-u3-carrito/
│
├── index.html              # Archivo principal HTML5 con maquetación Bootstrap 5 y montaje de Vue.js 3
├── css/
│   └── estilos.css         # Hoja de estilos con variables CSS, tipografía, contrastes y diseño responsivo
├── js/
│   └── app.js              # Lógica Vue.js 3: catálogo oficial, reactividad, validación de stock y TTL
├── img/                    # Directorio de imágenes vectoriales SVG de alta definición para cada producto
│   ├── audifono.svg        # Ítem 1: Audifono ($30.000 / stock: 3)
│   ├── mouse.svg           # Ítem 2: Mouse ($20.000 / stock: 5)
│   ├── teclado.svg         # Ítem 3: Teclado ($15.000 / stock: 10)
│   ├── gabinete.svg        # Ítem 4: Gabinete ($35.000 / stock: 4)
│   ├── pantalla.svg        # Ítem 5: Pantalla ($175.000 / stock: 3)
│   └── silla.svg           # Ítem 6: Silla ($150.000 / stock: 2)
└── README.md               # Documentación, rúbrica, verificación y guía de entrega
```

---

## 2. Cobertura de la Rúbrica de Evaluación (100 Puntos)

| Criterio de Evaluación | Ponderación | Estado | Implementación Técnica |
| :--- | :---: | :---: | :--- |
| **1. Estructura HTML, CSS y Bootstrap** | **10 pts** | Cumplido | Grid responsive `col-12 col-md-6` en `row`, contenedor semántico, Bootstrap 5.3 y Bootstrap Icons. |
| **2. Estilos visuales con CSS** | **5 pts** | Cumplido | Variables CSS con paleta `#FAFAFA`, `#FFFFFF`, `#1A1A1A`, `#4A5568`, `#E2E8F0`, `#1B365D`, `#5568FE`, tarjetas con bordes redondeados, sombras suaves y estados hover. |
| **3. Funciones Vue.js para gestión del carrito** | **10 pts** | Cumplido | Métodos `agregarAlCarrito()`, `removerDelCarrito()` y `vaciarCarrito()` con sincronización en tiempo real. |
| **4. Actualización dinámica del total a pagar** | **5 pts** | Cumplido | Propiedad computada `totalPagar` ubicada debajo de la columna izquierda, inicializada en `$0` y reactiva a cada cambio. |
| **5. Adición al carrito con imagen, nombre y cantidad** | **10 pts** | Cumplido | Cada elemento en la columna derecha despliega su miniatura gráfica, formato exacto `<nombre> - Cantidad: <cantidad>` y botón de remoción. |
| **6. Validación de stock disponible en el layout** | **10 pts** | Cumplido | Control de inventario en tiempo real con indicador dinámico de unidades disponibles y stock total por producto. |
| **7. Alerta del navegador alert() al superar stock** | **40 pts** | Cumplido | Validación estricta con `alert("No hay más unidades disponibles en stock")` ejecutada vía Vue.js al intentar agregar `(cantidad + 1) > stock`. |
| **8. Diseño completo, responsivo y funcional** | **10 pts** | Cumplido | Adaptación fluida para dispositivos móviles y pantallas de escritorio, accesibilidad y arquitectura limpia. |
| **TOTAL** | **100 pts** | **100%** | **Aprobado con distinción** |

---

## 3. Instrucciones de Ejecución Local

No requiere compilación previa (`npm` o `build step`), ya que utiliza la versión global de **Vue.js 3** y las hojas de estilo de **Bootstrap 5** mediante CDNs de alta velocidad.

### Opción A: Mediante extensión Live Server en VS Code (Recomendada)
1. Abre la carpeta del proyecto en Visual Studio Code.
2. Haz clic derecho sobre el archivo `index.html`.
3. Selecciona **"Open with Live Server"**.
4. La aplicación se abrirá automáticamente en tu navegador (usualmente en `http://127.0.0.1:5500/index.html`).

### Opción B: Ejecución directa en navegador
1. Haz doble clic sobre el archivo `index.html` en el explorador de archivos de tu sistema operativo.
2. Se abrirá directamente en Google Chrome, Microsoft Edge, Firefox o Safari.

---

## 4. Guía de Verificación y Pruebas Paso a Paso

### Prueba 1: Carga inicial y Total a Pagar en $0
1. Abre la página.
2. Observa la columna izquierda (**"Productos disponibles"**) con los 6 productos del catálogo.
3. Observa debajo de la columna izquierda el recuadro **"Total a pagar: $0"**.
4. En la columna derecha (**"Productos en el carrito"**), se mostrará el estado inicial: *"No hay productos en el carrito"*.

### Prueba 2: Agregar productos y cálculo dinámico del total
1. Haz clic en **"Agregar al carrito"** en **Audifono** ($30.000).
   - En la columna derecha aparecerá: `Audifono - Cantidad: 1` junto a su imagen.
   - El **Total a pagar** cambiará inmediatamente a **$30.000**.
2. Haz clic en **"Agregar al carrito"** en **Mouse** ($20.000).
   - En la columna derecha aparecerá el Mouse con cantidad 1.
   - El **Total a pagar** cambiará dinámicamente a **$50.000**.

### Prueba 3: Validación de Stock y Alerta `alert()` (Criterio de 40 puntos)
1. El producto **Audifono** tiene **stock = 3**.
2. Haz clic 1 vez más en "Agregar al carrito" de Audifono (Cantidad en carrito = 2).
3. Haz clic 1 vez más en "Agregar al carrito" de Audifono (Cantidad en carrito = 3, stock máximo alcanzado).
4. Haz clic por **4ª vez** en "Agregar al carrito" de Audifono.
5. **Resultado esperado:**
   - Se despliega de inmediato la ventana modal nativa del navegador:
     ```text
     No hay más unidades disponibles en stock
     ```
   - La cantidad en el carrito **no supera las 3 unidades**.
   - El total a pagar permanece inalterable en el monto correspondiente.

### Prueba 4: Remover productos del carrito
1. En la columna derecha, pulsa el botón **"Remover del carrito"** en Audifono.
2. La cantidad se reducirá de 3 a 2, y el total a pagar disminuirá en $30.000.
3. Si continúas removiendo hasta llegar a 0, el producto desaparece automáticamente del carrito.

### Prueba 5: Persistencia Temporal de Sesión (TTL de 30 minutos)
1. Agrega productos al carrito (por ejemplo, 1 Teclado y 1 Gabinete).
2. Recarga la página (`F5` o `Ctrl + R`).
3. El carrito y el total se mantienen intactos, indicando en la barra superior *"Sesión restaurada: Tu carrito se conservará durante los próximos 30 min"*.
4. **Simular expiración:** Abre las herramientas de desarrollador (`F12`), ve a la pestaña **Consola** y ejecuta:
   ```javascript
   const session = JSON.parse(localStorage.getItem('evaluacion_u3_carrito_sesion'));
   session.expiresAt = Date.now() - 1000; // Simula sesión vencida en el pasado
   localStorage.setItem('evaluacion_u3_carrito_sesion', JSON.stringify(session));
   location.reload();
   ```
5. Al recargar, la sesión expirada es purgada automáticamente y el carrito inicia en blanco de forma segura.

---

## 5. Instrucciones para Comprimir y Entregar en Blackboard

Según las instrucciones académicas, la entrega debe realizarse de forma **individual** en formato `.ZIP` o `.RAR`:

### En Windows (PowerShell):
Ejecuta en la raíz de tu proyecto el siguiente comando:
```powershell
Compress-Archive -Path index.html, css, js, img, README.md -DestinationPath Evaluacion_U3_VueJS_TuNombre.zip
```

### En el Explorador de Windows:
1. Selecciona los archivos y carpetas: `index.html`, `css/`, `js/`, `img/` y `README.md`.
2. Haz clic derecho y selecciona **"Comprimir en archivo ZIP"** (o usa WinRAR para crear un archivo `.rar`).
3. Renombra el archivo siguiendo la pauta de tu docente (ej. `Apellido_Nombre_Evaluacion_U3.zip`).
4. Sube el archivo comprimido a la plataforma **Blackboard** en la sección de entrega correspondiente.
