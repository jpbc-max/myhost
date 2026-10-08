# TOYORENAULT · tienda, garaje privado y panel de demostración

Sitio: https://toyorenault-cjd.pages.dev/

## Accesos

El panel en `/panel.html` tiene seis perfiles públicos: `admin`, `gerente`, `vendedor`, `compras`, `bodega` y `contabilidad`. Todos utilizan `demo123`. Son perfiles de demostración, no cuentas personales de una empresa real. Cada inicio de sesión crea su propio espacio en el servidor durante dos horas. No hay clientes, inventarios ni documentos del taller CJD en esta base. Al salir o expirar el acceso no se recuperan los cambios; las sesiones vencidas se limpian al crear otras nuevas. No introducir datos reales ni tarifas confidenciales.

Administración opera todos los módulos. Gerencia consulta sin modificar. Ventas gestiona CRM, cotizaciones, pedidos y seguimiento, sin costes ni emisión de ventas. Compras importa ofertas y prepara compras, sin recibir mercancía ni acceder al CRM. Bodega ajusta existencias y recibe compras, sin precios ni contactos de clientes. Contabilidad emite documentos internos y registra devoluciones, sin modificar CRM, compras ni precios. `Mi perfil y permisos` muestra las acciones y módulos de cada función. Se comprueban permisos en el servidor y se eliminan los campos restringidos antes de devolver datos, incluidas las respuestas a escrituras. Detalle en ROLES-TOYORENAULT.md.

Cada sesión incluye una cotización, un pedido y una compra ficticios para probar las funciones sin depender de otra cuenta. Los seis perfiles no comparten sus sesiones demo. La validación ampliada cubre 192 comprobaciones, incluida la matriz de acciones permitidas y denegadas para los seis perfiles y la protección de campos.

## Garaje personal

El cliente puede crear una cuenta individual y conservar sus vehículos en el servidor. Se recuperan dentro de su propia cuenta por placa, VIN o bastidor, incluso después de cerrar sesión. Son datos aportados por el cliente, no una consulta RUNT ni una verificación OEM. Esta área usa tablas, cookie y permisos separados de los perfiles públicos del panel. Detalle en GARAJE-TOYORENAULT.md.

## Funciones implementadas

- Clientes B2B/B2C, descuentos configurables y oportunidades CRM por etapa.
- Seguimientos con fecha y estado; sin envío de mensajes ni avisos externos.
- Referencias de prueba, ubicaciones, mínimos y ajustes de stock con motivo.
- Cotización → pedido → documento interno de venta, con importes calculados en el servidor.
- Descuento B2B e impuesto configurado por producto, ambos explícitos; no se supone una tarifa fiscal para todas las piezas.
- Emisión única por documento, control de stock al emitir y rechazo de cantidades negativas o insuficientes.
- Compras demo por oferta y recepción que suma stock una sola vez; no se envían compras a proveedores.
- Devoluciones con motivo y límite de unidades vendidas. No emiten notas fiscales ni reembolsos.
- Vista imprimible para guardar PDF y descarga del documento en JSON.
- Directorio inicial de ocho empresas, con fuente pública y fecha de consulta. No incluye todas las importadoras colombianas.
- Ofertas de proveedores mediante CSV de prueba. El panel permite 200 filas; el portafolio local de la web admite 10.000. Los costes de proveedor se distinguen del precio de venta.
- Mapa de siete sistemas, zoom 100–400%, selección y listado de piezas. Los esquemas incluidos son conceptuales, no un EPC OEM por VIN.
- Despiece propio mediante JPG/PNG/WebP y mapa JSON con coordenadas porcentuales. Solo permanece en la página; no se sube al servidor ni se comprueba su licencia o aplicabilidad.
- Tarjeta de propiedad en vista local, con transcripción manual; la imagen no se sube. Consulta opcional de datos básicos del VIN mediante NHTSA, con consentimiento y cobertura parcial. No hay OCR, RUNT ni compatibilidad OEM automática.
- Inicio «Pon tu placa», emblemas reales del mismo conjunto de CJD con movimiento y pausa, identidad dorada/blanca/negra y diseño móvil.
- Contactos de TOYORENAULT GR Neiva: WhatsApp, teléfono, dirección, horario, mapa, TikTok, correo y descarga de tarjeta de contacto. Instagram/Facebook pendientes de confirmar.
- ToyoBot animado con guía local y clasificación opcional mediante Workers AI. La IA interpreta la intención; los datos y enlaces se producen a partir de reglas y fuentes de la web. No se envían registros del panel ni documentos al modelo. Identificadores evidentes permanecen locales. Tiene límites de 10 consultas por IP/hora y 50 para la aplicación/día; usa la guía local si se alcanza el límite o falla la IA.
- Emblema circular TR propio versión v7 con T completa; emblemas de marcas y logo CJD alojados localmente. Accesos rápidos y guía de cinco pasos. `/espacio.html` reúne TOYORENAULT y el sitio CJD independiente en https://cjd-autoxpress.prb1.workers.dev/panel, sin depender de sesión ChatGPT. Los negocios y sesiones son independientes.

## Integraciones pendientes para operar una empresa real

Los portales de Omniparts, Dispartes, USA, Celeste y otros no se conectaron con cuentas comerciales. Las páginas públicas sirven de directorio; no permiten confirmar stock, tarifa de cliente o plazo de una referencia. Hay que obtener un archivo autorizado actualizado o una API y preparar una sincronización para cada proveedor.

El EPC OEM por VIN requiere una fuente autorizada con cobertura del vehículo y del mercado colombiano. Los esquemas demo no contienen números OEM inventados. La referencia Toyota pública enlazada corresponde al mercado norteamericano y no garantiza aplicación en Colombia.

Los documentos internos **no son facturas electrónicas DIAN**. No tienen CUFE, firma digital, resolución de numeración ni validación. Para emitir electrónicamente se debe configurar la empresa y una solución habilitada (servicio DIAN, software propio habilitado o proveedor tecnológico). Fuente oficial: https://www.dian.gov.co/impuestos/factura-electronica/como-hacerlo/Paginas/ser-facturador-electronico.aspx

No hay pagos, envío automático por WhatsApp/email, OCR, inicio de sesión compartido, sincronización con CJD ni contratación de licencias. WhatsApp abre una consulta que el cliente revisa y envía por su cuenta. El garaje tiene cuentas privadas persistentes; el panel de operaciones continúa en demostración. Antes de operar CRM e inventarios reales hacen falta cuentas individuales de personal, recuperación de acceso por correo, respaldo, revisión de la política de datos e integraciones comerciales. Las claves demo no deben reutilizarse en producción.

## Código y publicación

Se continúa el mismo repositorio https://github.com/jpbc-max/myhost. `TOYO8.html` es la versión autocontenida de la tienda; `panel.html` y `espacio.html` son autocontenidos. El `index.html` anterior de MyHoster se conserva. No publicar ese `index.html` como la tienda.

`toyorenault-cloudflare.zip` contiene el sitio completo que se publica como raíz en el proyecto Cloudflare Pages existente `toyorenault-cjd`. Incluye `index.html` del almacén, `panel.html`, `espacio.html`, assets, `_headers`, `_routes.json` y `_worker.js`.

El servidor usa Pages advanced mode. Vincular exclusivamente la base `toyorenault-demo` como `DB` y Workers AI como `AI`. El panel público solo puede acceder a sus datos ficticios; las cuentas del garaje usan tablas privadas separadas en esta misma base. No importar CRM ni inventarios reales en las sesiones demo. Las tablas se inicializan al primer acceso. Las consultas usan parámetros y se restringen al espacio de la sesión; las escrituras comprueban origen, token CSRF, perfil y versión del registro. La cookie de sesión es HttpOnly, Secure y SameSite=Strict, y solo se guarda su hash en la base.

`TOYO8-server.test.mjs` y `TOYO8-d1-local.mjs` ejecutan los flujos del servidor sobre SQLite con Node 24: `node TOYO8-server.test.mjs`. `TOYO8-garage.test.mjs` añade 54 comprobaciones del registro, persistencia, aislamiento entre cuentas, sesiones y consulta VIN; 246 comprobaciones en total. La prueba local no reemplaza la verificación de publicación en Cloudflare.

El enlace de vuelta desde el sitio CJD queda preparado en `ENLACE-PARA-CJD.html`. Esta sesión no pudo restaurar/publicar el código del sitio CJD porque la revisión automática rechazó la operación que transporta la credencial de repositorio por la entrada del proceso. La web CJD conserva su versión existente.
