/*
 * Botón "Estadísticas" dentro del panel de contenido.
 *
 * Decap CMS 3.8 no permite añadir páginas propias a su menú lateral: la API
 * `registerAdditionalLink` que documentan otras versiones no existe en este
 * paquete (solo hay registros de widgets, previsualizaciones y componentes
 * de editor).
 *
 * Así que en lugar de pelearse con su interfaz, se añade un botón flotante
 * directamente al body. No depende de ninguna clase ni estructura interna
 * de Decap, así que una actualización suya no puede romperlo.
 */
(function () {
  var ENLACES = [
    { texto: '📊  Estadísticas', href: '/admin/estadisticas.html' },
    { texto: '🗂️  Páginas', href: '/admin/paginas.html' },
  ];

  function crearBotones() {
    if (document.getElementById('accesos-panel')) return;

    var caja = document.createElement('div');
    caja.id = 'accesos-panel';
    caja.style.cssText = [
      'position:fixed',
      'right:20px',
      'bottom:20px',
      'z-index:9999',
      'display:flex',
      'flex-direction:column',
      'gap:8px',
      'align-items:flex-end',
    ].join(';');

    ENLACES.forEach(function (enlace) {
      var boton = document.createElement('a');
      boton.href = enlace.href;
      boton.textContent = enlace.texto;
      boton.style.cssText = [
        'display:inline-flex',
        'align-items:center',
        'gap:8px',
        'padding:11px 18px',
        'border-radius:999px',
        'background:#0167f3',
        'color:#fff',
        "font:600 14px/1 'DM Sans',system-ui,-apple-system,Segoe UI,sans-serif",
        'text-decoration:none',
        'box-shadow:0 6px 20px rgba(1,103,243,.35)',
        'transition:transform .2s ease',
        'white-space:nowrap',
      ].join(';');

      boton.addEventListener('mouseenter', function () {
        boton.style.transform = 'translateY(-2px)';
      });
      boton.addEventListener('mouseleave', function () {
        boton.style.transform = 'none';
      });

      caja.appendChild(boton);
    });

    document.body.appendChild(caja);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', crearBotones);
  } else {
    crearBotones();
  }
})();
