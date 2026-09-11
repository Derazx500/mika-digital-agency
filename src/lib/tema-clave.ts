/**
 * La clave con la que se recuerda el tema elegido.
 *
 * Vive en su propio archivo, SIN `'use client'`, y eso es lo único importante
 * de este módulo.
 *
 * El layout es un componente de servidor y necesita esta cadena para escribir
 * el script que aplica el tema antes del primer píxel. Si la constante viviera
 * en `tema.ts` —que sí es de cliente—, React no le pasaría al servidor el
 * texto sino un proxy de referencia, y al meterlo en la plantilla se
 * convertiría en el mensaje de error de ese proxy. Resultado: el script leería
 * una clave inexistente, nadie recordaría su tema y quien lo tuviera en oscuro
 * vería un fogonazo blanco en cada carga.
 *
 * Pasó exactamente eso. De ahí este archivo.
 */
export const CLAVE_TEMA = 'mika-tema';
