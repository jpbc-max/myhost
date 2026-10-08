# Garaje TOYORENAULT · 08/10/2026

## Uso

1. Empieza con placa, VIN o bastidor.
2. Completa marca, modelo y los campos disponibles de tu tarjeta de propiedad.
3. Guarda en tu garaje y crea tu cuenta con una frase de al menos 12 caracteres.
4. Al volver a entrar, selecciona tu vehículo o recupéralo por su identificador.

Las cuentas y vehículos persisten en Cloudflare D1. Cada cliente solo accede a sus propios vehículos; el panel demo y CJD no reciben estos registros. La identificación proviene del cliente y no verifica titularidad ni compatibilidad de piezas. La imagen de tarjeta se muestra solo en el dispositivo, sin subirla ni guardarla.

## Acceso y límites

Contraseñas derivadas con PBKDF2-SHA256 (100.000 iteraciones y sal aleatoria), sesiones HttpOnly/Secure/SameSite=Strict durante 24 horas, token CSRF en escrituras, consultas parametrizadas, control de origen y edición con versión. Se guardan hashes de tokens, no el token original. Límite de 20 vehículos por cuenta y 2.000 cuentas en esta versión. Límites por IP para registro, acceso y consultas VIN.

No hay verificación de correo, recuperación automática ni eliminación de cuenta desde la web. No usar el garaje como prueba de propiedad o autorización sobre un vehículo. No reutilizar las claves públicas del panel demo para cuentas privadas.

## VIN

La consulta opcional envía únicamente el VIN y el año, si se indicó, a la API pública NHTSA vPIC después de marcar autorización. Solo rellena campos vacíos; se revisan contra la tarjeta. Cobertura parcial orientada al mercado de EE. UU.; si falta información o falla el servicio se completa manualmente. No consulta RUNT, no devuelve despieces, referencias OEM ni prueba compatibilidad.

Fuentes oficiales: https://vpic.nhtsa.dot.gov/api/Home/Index y https://vpic.nhtsa.dot.gov/About

## Identidad y contactos

Los emblemas de Toyota, Renault, Chevrolet, Nissan, Mazda, Kia, Hyundai, Ford y Volkswagen usan los mismos SVG servidos por la web de CJD. Tienen movimiento suave, pausa y respeto a la preferencia de movimiento reducido. Dependencia externa: si CJD retira esos archivos, deben alojarse copias autorizadas.

WhatsApp/teléfono +57 316 692 6322; Calle 2 # 4-67, Centro, Neiva, Huila. Lunes a viernes 8:00–18:00; sábados 8:00–14:00; domingos cerrado; confirmar festivos. TikTok @toyorenault.gr.ne. Correo toyorenaultgr2009@hotmail.com. Instagram y Facebook pendientes de confirmar para evitar enlazar empresas homónimas.

Fuentes públicas consultadas: ficha Google https://www.google.com/maps?cid=11100482828992338578, TikTok https://www.tiktok.com/@toyorenault.gr.ne y directorio ASOPARTES 2025 https://directoriomotriz.com/wp-content/uploads/2025/02/DIRECTORIO-MOTRIZ-ASOPARTES-2025-FEBRERO-19-DE-2025-de-baja.pdf

WhatsApp prepara una consulta con las piezas y marca/modelo/año seleccionado; no incluye placa, VIN ni contacto del cliente. El cliente elige enviarla. La cotización descargada conserva los identificadores localmente.

## Validación

192 comprobaciones del panel existente y 54 del garaje/VIN: registro, claves derivadas, consentimiento, persistencia, cierre y vencimiento de sesiones, separación entre cuentas, bloqueo de accesos del demo, CSRF/origen, duplicados, versiones, bastidor antiguo, cobertura parcial y fallos de la fuente externa. Comprobación manual del registro, recuperación por placa, salida/entrada y diseño móvil de 390 px.

El EPC autorizado por VIN, stock de proveedores en vivo y facturación DIAN siguen por conectar.
