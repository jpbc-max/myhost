# TOYORENAULT · revisión y proveedores privados

La T final del nombre cursivo cuenta ahora con espacio para su extremo y un tratamiento dorado separado del eslogan. Los emblemas existentes de nueve marcas conservan sus formas vectoriales, con reflejos y relieve; aparecen en el vehículo seleccionado y en cada tarjeta guardada. Los SVG conservan nitidez al ampliarse en pantallas 4K; el emblema circular no se presenta como una imagen 4K nativa.

El formulario de vehículos utiliza dos columnas en escritorio y una en móvil. Los accesos al garaje y lista permanecen visibles en móvil. Se corrigieron mensajes duplicados del catálogo, un icono inexistente, el escape de entrada OBD y la lectura de una tarjeta anterior al cambiar de imagen. Se revisaron enlaces e imágenes, guardado del garaje, salida de la cuenta y recuperación del vehículo.

## Proveedores para uso administrativo

Directorio, ofertas, cantidades, costes y plazos de proveedores quedan dentro del almacén privado. Administración, gerencia y compras pueden consultarlos. Clientes, ventas, bodega y contabilidad no reciben las ofertas ni el directorio. Bodega recibe las cantidades de las compras para recepción sin identidad del proveedor ni su coste. El servidor no entrega ofertas por la API pública, aunque un archivo antiguo indique mostrar_cliente=true.

En Proveedores hay filtros separados de marca y referencia, comparación de todas las ofertas importadas coincidentes, aviso de fechas antiguas y descarga CSV privada. El directorio es inicial, no todos los proveedores de Colombia. No hay inventarios en vivo ni referencias OEM verificadas. Las coincidencias parciales no demuestran equivalencia.

## Solicitudes del cliente

El cliente registrado utiliza Sobre pedido para enviar pieza, referencia, marca, cantidad y detalles. Puede vincular un vehículo de su propio garaje. Autoriza expresamente enviar su solicitud y datos al equipo del almacén. La solicitud queda registrada en el CRM. Administración revisa el informe de proveedores y el equipo comercial responde desde el CRM.

El cliente ve únicamente su solicitud, estado, respuesta y plazo estimado de llegada al local, por ejemplo 3 días desde confirmar el pedido. Para guardar un plazo numérico el empleado debe confirmar disponibilidad y plazo. No se prometen automáticamente tres días; no se reserva mercancía, cobra un pago ni envía un mensaje externo. Se mantienen independientes los datos de CJD.

467 comprobaciones del servidor superadas, incluidas 54 nuevas de autorización de proveedores, aislamiento de solicitudes y vehículos, consentimiento, CSRF, origen, plazo confirmado, conflicto de versiones, exportación y eliminación de cuenta. Además se probó en navegador el recorrido solicitud → informe interno → respuesta privada del cliente, con datos ficticios exclusivamente locales.

Siguen pendientes la activación personal del administrador y la carga de los archivos reales autorizados de proveedores. La importación actual conserva el límite de 200 filas por archivo y 500 ofertas; requiere reconfirmar existencias y fechas.
