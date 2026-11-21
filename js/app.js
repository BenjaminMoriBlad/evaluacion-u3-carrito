/**
 * ============================================================================
 * EVALUACIÓN U3 - UNIDAD 3: VUE JS
 * Archivo: js/app.js
 * Descripción: Lógica reactiva con Vue.js 3, gestión de carrito de compras,
 *              cálculo dinámico de total, validación estricta de stock con alert()
 *              y persistencia temporal de sesión con TTL de 30 minutos.
 * ============================================================================
 */

// Constante de configuración: Tiempo de vida de la sesión (30 minutos en milisegundos)
const SESSION_TTL_MS = 30 * 60 * 1000;
const STORAGE_KEY = 'evaluacion_u3_carrito_sesion';

const { createApp } = Vue;

createApp({
  data() {
    return {
      // 1. Catálogo oficial e inmutable según la rúbrica y especificación
      productos: [
        { id: 1, nombre: 'Audifono', precio: 30000, stock: 3, imagen: 'img/audifono.jpg' },
        { id: 2, nombre: 'Mouse', precio: 20000, stock: 5, imagen: 'img/mouse.jpg' },
        { id: 3, nombre: 'Teclado', precio: 15000, stock: 10, imagen: 'img/teclado.jpg' },
        { id: 4, nombre: 'Gabinete', precio: 35000, stock: 4, imagen: 'img/gabinete.jpg' },
        { id: 5, nombre: 'Pantalla', precio: 175000, stock: 3, imagen: 'img/pantalla.jpg' },
        { id: 6, nombre: 'Silla', precio: 150000, stock: 2, imagen: 'img/silla.jpg' }
      ],

      // 2. Estado reactivo del carrito de compras
      carrito: [],

      // 3. Estado de la sesión restaurada
      sesionRestaurada: false,
      minutosRestantes: 30,
      intervaloTimer: null
    };
  },

  computed: {
    /**
     * Total a pagar calculado dinámicamente sumando (precio * cantidad) de cada ítem en el carrito.
     * Inicia en 0 y se actualiza reactivamente al agregar o remover productos.
     */
    totalPagar() {
      return this.carrito.reduce((acumulado, item) => {
        const precioValido = Number(item.precio) || 0;
        const cantidadValida = Number(item.cantidad) || 0;
        return acumulado + (precioValido * cantidadValida);
      }, 0);
    },

    /**
     * Total de unidades físicas actualmente presentes en el carrito.
     */
    totalUnidadesEnCarrito() {
      return this.carrito.reduce((acumulado, item) => acumulado + (Number(item.cantidad) || 0), 0);
    }
  },

  methods: {
    /**
     * Agrega una unidad de un producto al carrito previa validación estricta de stock.
     * Criterio de evaluación:
     * - Si (cantidadEnCarrito + 1) > stock: muestra alert() del navegador y cancela la acción.
     * - Si hay disponibilidad: añade el producto o incrementa su cantidad.
     * @param {Object} producto - Producto del catálogo a agregar
     */
    agregarAlCarrito(producto) {
      if (!producto || typeof producto.id === 'undefined') {
        return;
      }

      // Buscar si el producto ya existe en el carrito
      const itemEnCarrito = this.carrito.find(item => item.id === producto.id);
      const cantidadActual = itemEnCarrito ? itemEnCarrito.cantidad : 0;
      const nuevaCantidad = cantidadActual + 1;

      // VALIDACIÓN ESTRICTA DE STOCK (Puntaje mayor de la rúbrica: 40 pts)
      if (nuevaCantidad > producto.stock) {
        alert("No hay más unidades disponibles en stock");
        return;
      }

      // Si pasa la validación de stock, se actualiza el carrito
      if (itemEnCarrito) {
        itemEnCarrito.cantidad = nuevaCantidad;
      } else {
        this.carrito.push({
          id: Number(producto.id),
          nombre: String(producto.nombre),
          precio: Number(producto.precio),
          stock: Number(producto.stock),
          imagen: String(producto.imagen),
          cantidad: 1
        });
      }

      // Persistir cambios en localStorage con TTL de 30 minutos
      this.guardarSesion();
    },

    /**
     * Remueve una unidad de un producto del carrito.
     * Si la cantidad llega a 0, elimina el elemento del carrito y actualiza el total a pagar.
     * @param {number} idProducto - ID del producto a decrementar/remover
     */
    removerDelCarrito(idProducto) {
      const indice = this.carrito.findIndex(item => item.id === idProducto);
      if (indice === -1) {
        return;
      }

      const item = this.carrito[indice];
      if (item.cantidad > 1) {
        item.cantidad -= 1;
      } else {
        // Si la cantidad es 1, se remueve completamente del array
        this.carrito.splice(indice, 1);
      }

      // Persistir estado actualizado en localStorage
      this.guardarSesion();
    },

    /**
     * Obtiene la cantidad actual de un producto específico que ya está en el carrito.
     * Útil para indicar visualmente el stock remanente en la interfaz.
     * @param {number} idProducto
     * @returns {number}
     */
    obtenerCantidadEnCarrito(idProducto) {
      const item = this.carrito.find(i => i.id === idProducto);
      return item ? item.cantidad : 0;
    },

    /**
     * Calcula el stock disponible restante considerando lo que ya se agregó al carrito.
     * @param {Object} producto
     * @returns {number}
     */
    obtenerStockDisponible(producto) {
      const enCarrito = this.obtenerCantidadEnCarrito(producto.id);
      return Math.max(0, producto.stock - enCarrito);
    },

    /**
     * Formateador de moneda en pesos con separadores de miles estándar.
     * @param {number} valor
     * @returns {string}
     */
    formatearPrecio(valor) {
      const num = Number(valor) || 0;
      return num.toLocaleString('es-CL');
    },

    /**
     * Controlador de respaldo (@error) para imágenes de productos.
     * Garantiza que nunca se visualicen imágenes rotas cargando fotos de hardware reales.
     * @param {Event} event - Evento de error del elemento <img>
     * @param {string} nombreProducto - Nombre del producto para resolver el fallback
     */
    manejarErrorImagen(event, nombreProducto) {
      const fotosRespaldo = {
        'Audifono': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80',
        'Mouse': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&q=80',
        'Teclado': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&q=80',
        'Gabinete': 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300&q=80',
        'Pantalla': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&q=80',
        'Silla': 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=300&q=80'
      };

      const target = event.target;
      if (!target.dataset.fallbackFase) {
        target.dataset.fallbackFase = 'remota';
        target.src = fotosRespaldo[nombreProducto] || `img/${nombreProducto.toLowerCase()}.svg`;
      } else if (target.dataset.fallbackFase === 'remota') {
        target.dataset.fallbackFase = 'svg';
        target.src = `img/${nombreProducto.toLowerCase()}.svg`;
      }
    },

    /**
     * Vacía completamente el carrito y limpia el almacenamiento persistente.
     */
    vaciarCarrito() {
      this.carrito = [];
      this.sesionRestaurada = false;
      this.eliminarSesionStorage();
    },

    /**
     * Guarda el estado del carrito en localStorage con metadatos de TTL (30 minutos).
     * Incluye control seguro try/catch frente a restricciones del navegador.
     */
    guardarSesion() {
      try {
        if (this.carrito.length === 0) {
          this.eliminarSesionStorage();
          return;
        }

        const ahora = Date.now();
        const payload = {
          carrito: this.carrito,
          savedAt: ahora,
          expiresAt: ahora + SESSION_TTL_MS
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        this.actualizarMinutosRestantes(payload.expiresAt);
      } catch (error) {
        console.warn('No se pudo guardar la sesión en localStorage:', error);
      }
    },

    /**
     * Carga y valida la sesión desde localStorage al montar la aplicación.
     * Si la sesión expiró (Date.now() > expiresAt) o está corrupta, se reinicia.
     * Sanitiza los datos contra el catálogo oficial.
     */
    cargarSesion() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          return;
        }

        const session = JSON.parse(raw);
        const ahora = Date.now();

        // Verificación de expiración (TTL 30 minutos)
        if (!session.expiresAt || ahora > session.expiresAt) {
          console.info('La sesión de 30 minutos ha expirado. Reiniciando carrito.');
          this.eliminarSesionStorage();
          return;
        }

        // Sanitización y reconciliación contra el catálogo oficial
        if (Array.isArray(session.carrito)) {
          const carritoSanitizado = [];

          for (const item of session.carrito) {
            const productoCatalogo = this.productos.find(p => p.id === item.id);
            if (productoCatalogo) {
              const cantidad = Math.min(
                Math.max(1, parseInt(item.cantidad, 10) || 1),
                productoCatalogo.stock
              );

              carritoSanitizado.push({
                id: productoCatalogo.id,
                nombre: productoCatalogo.nombre,
                precio: productoCatalogo.precio,
                stock: productoCatalogo.stock,
                imagen: productoCatalogo.imagen,
                cantidad: cantidad
              });
            }
          }

          if (carritoSanitizado.length > 0) {
            this.carrito = carritoSanitizado;
            this.sesionRestaurada = true;
            this.actualizarMinutosRestantes(session.expiresAt);
          } else {
            this.eliminarSesionStorage();
          }
        }
      } catch (error) {
        console.warn('Error al leer o parsear la sesión previa:', error);
        this.eliminarSesionStorage();
      }
    },

    /**
     * Elimina de forma segura la clave de sesión en localStorage.
     */
    eliminarSesionStorage() {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.warn('Error al limpiar localStorage:', error);
      }
    },

    /**
     * Actualiza el indicador de minutos restantes de la sesión.
     * @param {number} expiresAt - Timestamp Unix de expiración
     */
    actualizarMinutosRestantes(expiresAt) {
      const ahora = Date.now();
      const diffMs = Math.max(0, expiresAt - ahora);
      this.minutosRestantes = Math.ceil(diffMs / (60 * 1000));
    }
  },

  mounted() {
    // Restaurar sesión persistida (TTL 30 min) al iniciar
    this.cargarSesion();

    // Actualizar periódicamente el tiempo restante y vigilar expiración
    this.intervaloTimer = setInterval(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;

        const session = JSON.parse(raw);
        if (Date.now() > session.expiresAt) {
          this.vaciarCarrito();
        } else {
          this.actualizarMinutosRestantes(session.expiresAt);
        }
      } catch (e) {
        // Silencioso en caso de error de lectura
      }
    }, 60000);
  },

  beforeUnmount() {
    if (this.intervaloTimer) {
      clearInterval(this.intervaloTimer);
    }
  }
}).mount('#app');
