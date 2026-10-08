# TOYORENAULT · perfiles por función

Acceso: https://toyorenault-cjd.pages.dev/panel. Clave pública de demostración para todos: `demo123`.

| Usuario | Función y acciones | Límites |
|---|---|---|
| admin | Administración: todos los módulos y operaciones demo | Sin acceso a datos reales ni a CJD |
| gerente | Gerencia: consulta de módulos, costes y actividad | No crea ni modifica registros |
| vendedor | Ventas: clientes, CRM, seguimiento, cotizaciones y pedidos | Sin costes, compras, emisión de ventas internas ni devoluciones |
| compras | Compras: ofertas de proveedor, costes e importación CSV; prepara compras | Sin CRM, documentos de ventas, recepciones ni ajustes de existencias |
| bodega | Bodega: ajustes de existencias, recepciones y consulta de pedidos | Sin importes, precios, costes ni contactos; no crea referencias ni compras |
| contabilidad | Contabilidad: consulta documentos, emite ventas internas y registra devoluciones | Sin CRM, compras, tarifas de proveedor, costes ni configuración de precios |

La vista inicial cambia con la función: operaciones de venta, compras, recepciones, documentos o supervisión. La pantalla «Mi perfil y permisos» explica las acciones permitidas, los módulos disponibles y los límites.

Los permisos se comprueban en el servidor para cada acción. Las lecturas y las respuestas a escrituras eliminan los campos restringidos. La función procede de la sesión autenticada; enviar otro rol o permisos desde el navegador no cambia el acceso. Se mantienen comprobación de origen, protección CSRF, sesiones limitadas, versiones de registro y aislamiento de datos.

Cada inicio de sesión crea un espacio ficticio independiente durante dos horas. Incluye un pedido y una compra de muestra para probar contabilidad y recepción sin necesitar otra cuenta. No se han creado cuentas personales de producción: estos accesos públicos no deben usarse para clientes, inventario real o tarifas confidenciales. Los documentos internos no son facturas electrónicas DIAN. CJD conserva sus datos y sesiones separados.

Validación local: 192 comprobaciones, incluidas acciones permitidas y bloqueadas por cada perfil, campos restringidos, intento de cambio de rol desde el navegador, concurrencia de inventario, emisión única y cierre de sesión.
