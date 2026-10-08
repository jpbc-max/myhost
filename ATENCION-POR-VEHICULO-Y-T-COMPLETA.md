# TOYORENAULT · Atención por vehículo y nombre completo

## Incorporado al proyecto existente

- Banner: nombre dibujado en SVG, con las once letras y la última T completa. Vector escalable en cabecera y pie: acabado metálico dorado/blanco, relieve, reflejo periódico y movimiento sutil por letra al pasar el cursor. Desactiva el movimiento al solicitar movimiento reducido. Sin recorte de letra cursiva. Verificado en escritorio y banner móvil de 390 px.
- Mi almacén → Atención por vehículo: recepción de un cliente nuevo o existente y registro del vehículo en una misma operación. Consentimiento para atención en TOYORENAULT. Recuperación por cliente, placa, VIN o bastidor.
- Identificación: VIN de 17 caracteres, bastidor para vehículos antiguos, marca, modelo, año, motor y color; duplicados bloqueados también en la base. Se pueden completar identificadores faltantes; no sustituir un VIN/bastidor ya asignado a un historial.
- Catálogo propio: búsqueda de referencias, stock propio, precio e impuestos; acceso al informe privado de proveedores únicamente para administración, gerencia y compras. No supone conexión en vivo con proveedores.
- Despiece: vínculo persistente de referencia del catálogo a sistema y componente, para ese vehículo específico. Fuente, notas, responsable, fecha, pendiente/comprobada por asesor. Cambios de código o nombre del producto vuelven a requerir revisión.
- Mapa: los componentes con referencias guardadas las muestran; su ficha lleva a la búsqueda de esa referencia. Zoom, selección y navegación del visor existente.
- Cotización: conserva cliente y vehículo; comprueba en el servidor que pertenecen al mismo historial. Pedidos conservan el vehículo; bodega recibe su documento reducido, sin VIN ni datos de contacto.
- Historial comercial por vehículo; referencias y vehículos incluidos en el respaldo privado existente.

## Permisos

Atención y vehículos: administración y ventas gestionan; gerencia consulta. El despiece y sus vínculos requieren además autorización individual EPC, con administración autorizada por defecto. No se concede a clientes; los permisos antiguos de clientes se ignoran. Bodega y contabilidad quedan excluidos del visor incluso con permisos antiguos. El perfil técnico de CJD no tiene sesión en TOYORENAULT. Compras, bodega y contabilidad no reciben la lista de vehículos del CRM. El garaje personal del cliente permanece separado. No se cruzan datos con CJD.

## Verificación

547 comprobaciones automáticas: 192 servidor/demo, 54 garaje, 117 almacén, 27 cuenta, 28 beneficios, 54 proveedores privados y 75 del nuevo mostrador. Flujo en navegador probado con registros ficticios locales: recepción → referencia vinculada → búsqueda desde el mapa → cotización en historial. Esos registros no se publican en producción.

## Activación pendiente

La aplicación está preparada, pero la primera cuenta administrativa aún requiere que el propietario configure STORE_SETUP_SECRET en Cloudflare y active su cuenta desde /activar-almacen con jpbcenter1@gmail.com. Las credenciales deben introducirse personalmente, sin enviarlas por chat.

Se debe cargar el catálogo real en Inventario y las ofertas autorizadas en Proveedores. El visor se abre desde la atención privada, sin acceso público en la web de clientes. Se retiran los mensajes públicos sobre búsqueda de proveedores, se reescribe la guía del bot y se corrige un botón que aún apuntaba a una sección de proveedores eliminada.

No hay un proveedor EPC/OEM autorizado conectado: el esquema base sigue siendo conceptual, no corresponde al despiece real de cada VIN. Registrar un VIN recupera los vínculos que el equipo haya documentado; no genera referencias OEM ni compatibilidades automáticas. Facturación DIAN, pasarela de pagos e inventarios de terceros continúan pendientes de sus conexiones reales.

## Vistas de prueba

- mostrador-vehiculo-prueba-local.png
- despiece-referencia-prueba-local.png

Son pruebas locales con vehículo, cliente y piezas ficticias.
