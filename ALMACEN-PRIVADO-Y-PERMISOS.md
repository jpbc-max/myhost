# TOYORENAULT · Almacén privado y visor autorizado

Actualización del 8 de octubre de 2026. Continúa sobre jpbc-max/myhost y Cloudflare Pages toyorenault-cjd; CJD conserva sus propias cuentas y registros.

## Qué incorpora

- /almacen: CRM/B2B, catálogo, existencias con motivo de ajuste, cotizaciones, pedidos, documentos internos, compras, recepción, devoluciones y actividad persistentes.
- Cuentas personales de administración, gerencia, ventas, compras, bodega y contabilidad. Las claves públicas de la demo no dan acceso al almacén privado.
- Invitaciones personales de un uso y 72 horas; desactivación con revocación inmediata de sesiones. El administrador comparte el enlace; no se envían invitaciones por correo automáticamente.
- Publicación explícita de referencias y ofertas. El público recibe precio de venta, stock informado y fecha; nunca costes de compra, contactos de clientes o ubicación interna.
- Importaciones CSV de hasta 200 filas por archivo. Esta versión admite 500 referencias y 500 ofertas; no sincroniza inventarios en vivo. La carga de catálogo actualiza el conteo físico y necesita revisión previa. Las ofertas se actualizan por proveedor/referencia y conservan las demás.
- Lectura OCR local con Tesseract.js 7.0.0. No se suben imágenes. La primera lectura descarga modelos; se revisan placa y VIN antes de copiarlos.
- /cuenta: exportación privada, eliminación confirmada de cuenta/vehículos y recuperación/verificación preparada para correo.
- Respaldo JSON empresarial manual, sin claves, sesiones ni garajes personales.

## Mapa y despiece: autorización individual

Solo el administrador tiene acceso inicial. En Equipo y accesos → Permisos del visor EPC se autoriza o revoca una cuenta existente por correo exacto, de equipo o cliente. El registro de un cliente y la función interna no conceden automáticamente ese permiso.

El servidor verifica la autorización al entregar /api/epc/view y /api/epc/runtime. El HTML público no contiene el mapa ni el despiece. El permiso del visor no concede CRM, inventario ni otros datos privados.

El visor inicial contiene esquemas conceptuales de siete sistemas; NO es un catálogo OEM real por VIN. Admite despieces y mapas aportados con permiso de uso. La conexión real necesita catálogo autorizado, licencia y acceso del proveedor.

## Activación del propietario

Base separada creada: toyorenault-store (3f4c33ac-67ee-4eb2-acd0-16a468aa8c73), binding STORE_DB. La base DB de garajes/demostración sigue separada.

En Cloudflare → toyorenault-cjd → Settings → Variables and secrets:

1. Texto STORE_OWNER_EMAIL: correo autorizado del administrador, ya configurado para producción.
2. El propietario debe introducir un secreto STORE_SETUP_SECRET de al menos 32 caracteres. No enviarlo por el chat ni guardarlo en GitHub.
3. Tras un nuevo despliegue, abrir /activar-almacen y crear personalmente una frase de acceso de al menos 14 caracteres. La creación del primer administrador requiere correo autorizado y secreto; se permite una sola vez.
4. Entrar en /almacen y preparar invitaciones por función. Mantener demo123 únicamente para /panel, con datos ficticios.

La entrada de nuevas credenciales corresponde al propietario. No se ha configurado una clave de administrador compartida ni activado su cuenta con credenciales de prueba.

## Servicios pendientes

- EPC/OEM por VIN: fuente/licencia autorizada. La consulta básica NHTSA no confirma aplicación de piezas ni consulta RUNT.
- Proveedores en vivo: API o archivos autorizados de Omniparts, Dispartes, Importadora USA, Celeste y las demás fuentes contratadas.
- DIAN: datos fiscales, resolución/numeración y proveedor habilitado. Los documentos internos no son factura electrónica, no tienen CUFE ni validación DIAN.
- Pagos: proveedor, credenciales y pruebas. No se efectúan cobros desde la web.
- Correo: remitente y dominio verificados y secretos RESEND_API_KEY / EMAIL_FROM. Sin estos valores la recuperación indica que está pendiente, sin simular envíos. Referencia: https://resend.com/docs/api-reference/emails/send-email
- Recuperación de infraestructura: exportación privada manual y las opciones de Cloudflare D1. No hay tarea de respaldo automático programada por esta actualización.

## Validación

385 comprobaciones: 192 del panel demo, 54 del garaje, 112 del almacén y permisos EPC, 27 de cuenta/recuperación. Además: activación ficticia exclusivamente local, importación revisada de producto/oferta, comprobación de que el coste no se publica, escape de HTML en nombre de pieza, OCR de placa/VIN ficticios, visor autorizado y zoom 125%, sin errores de consola en esas pruebas.

OCR: https://github.com/naptha/tesseract.js ; licencia incluida en assets/TESSERACT-LICENSE.txt.

Para repetir las pruebas desde los archivos publicados: Node 24, node --test TOYO8-server.test.mjs TOYO8-garage.test.mjs TOYO8-store.test.mjs TOYO8-account.test.mjs. El adaptador D1 local usa node:sqlite. El paquete ZIP contiene la aplicación completa con sus recursos y worker.
