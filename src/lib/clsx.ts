/**
 * Une clases condicionalmente. Evita una dependencia extra para algo de 5 líneas.
 */
export function clsx(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(' ');
}
