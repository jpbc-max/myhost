# TOYORENAULT · plataforma de demostración

Sitio: https://toyorenault-cjd.pages.dev/

## Accesos

El panel en `/panel.html` tiene tres usuarios públicos: `admin`, `vendedor` y `bodega`. Todos utilizan `demo123`. Son perfiles de demostración, no administradores de una empresa real. Cada inicio de sesión crea su propio espacio en el servidor durante dos horas. No hay clientes, inventarios ni documentos del taller CJD en esta base. Al salir o expirar el acceso no se recuperan los cambios; las sesiones vencidas se limpian al crear otras nuevas. No introducir datos reales ni tarifas confidenciales.

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
- Tarjeta de propiedad en vista local, con transcripción manual de VIN y vehículo. No hay OCR ni consulta oficial del vehículo.
- ToyoBot animado con guía local y clasificación opcional mediante Workers AI. La IA interpreta la intención; los datos y enlaces se producen a partir de reglas y fuentes de la web. No se envían registros del panel ni documentos al modelo. Identificadores evidentes permanecen locales. Tiene límites de 10 consultas por IP/hora y 50 para la aplicación/día; usa la guía local si se alcanza el límite o falla la IA.
- Emblema circular TR propio y acceso `/espacio.html` a TOYORENAULT y CJD. La identidad visual se coordina; los negocios y sesiones son independientes.

## Integraciones pendientes para operar una empresa real

Los portales de Omniparts, Dispartes, USA, Celeste y otros no se conectaron con cuentas comerciales. Las páginas públicas sirven de directorio; no permiten confirmar stock, tarifa de cliente o plazo de una referencia. Hay que obtener un archivo autorizado actualizado o una API y preparar una sincronización para cada proveedor.

El EPC OEM por VIN requiere una fuente autorizada con cobertura del vehículo y del mercado colombiano. Los esquemas demo no contienen números OEM inventados. La referencia Toyota pública enlazada corresponde al mercado norteamericano y no garantiza aplicación en Colombia.

Los documentos internos **no son facturas electrónicas DIAN**. No tienen CUFE, firma digital, resolución de numeración ni validación. Para emitir electrónicamente se debe configurar la empresa y una solución habilitada (servicio DIAN, software propio habilitado o proveedor tecnológico). Fuente oficial: https://www.dian.gov.co/impuestos/factura-electronica/como-hacerlo/Paginas/ser-facturador-electronico.aspx

No hay pagos, WhatsApp comercial configurado, mensajería saliente, OCR, inicio de sesión compartido, clientes reales, sincronización con CJD, ni contratación de licencias. Antes de uso real hace falta una autenticación de producción y un entorno distinto del demo, con cuentas individuales, recuperación de acceso, permisos, política de datos, respaldo y las integraciones comerciales correspondientes. Las claves demo no deben reutilizarse en producción.

## Código y publicación

Se continúa el mismo repositorio https://github.com/jpbc-max/myhost. `TOYO8.html` es la versión autocontenida de la tienda; `panel.html` y `espacio.html` son autocontenidos. El `index.html` anterior de MyHoster se conserva. No publicar ese `index.html` como la tienda.

`toyorenault-cloudflare.zip` contiene el sitio completo que se publica como raíz en el proyecto Cloudflare Pages existente `toyorenault-cjd`. Incluye `index.html` del almacén, `panel.html`, `espacio.html`, assets, `_headers`, `_routes.json` y `_worker.js`.

El servidor usa Pages advanced mode. Vincular exclusivamente la base `toyorenault-demo` como `DB` y Workers AI como `AI`. No vincular una base con clientes reales a este backend demo. Las tablas se inicializan al primer acceso. Las consultas usan parámetros y se restringen al espacio de la sesión; las escrituras comprueban origen, token CSRF, perfil y versión del registro. La cookie de sesión es HttpOnly, Secure y SameSite=Strict, y solo se guarda su hash en la base.

`TOYO8-server.test.mjs` y `TOYO8-d1-local.mjs` ejecutan los flujos del servidor sobre SQLite con Node 24: `node TOYO8-server.test.mjs`. La prueba local no reemplaza la verificación de publicación en Cloudflare.

El enlace de vuelta desde el sitio CJD queda preparado en `ENLACE-PARA-CJD.html`. Esta sesión no pudo restaurar/publicar el código del sitio CJD porque la revisión automática rechazó la operación que transporta la credencial de repositorio por la entrada del proceso. La web CJD conserva su versión existente.
