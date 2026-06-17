document.addEventListener('DOMContentLoaded', () => {
	// Buscamos los elementos que controlan el menú móvil.
	const menuButton = document.querySelector('.btnMenu');
	const menuIcon = document.querySelector('.iconMenu');
	const navMenu = document.querySelector('.nav-menu');

	if (!menuButton || !menuIcon || !navMenu) {
		return;
	}

	let backdrop = document.querySelector('.menuBackdrop');

	// Si el fondo oscuro no existe en el HTML, lo creamos desde JavaScript.
	if (!backdrop) {
		backdrop = document.createElement('div');
		backdrop.className = 'menuBackdrop';
		document.body.appendChild(backdrop);
	}

	// Esta función abre o cierra el panel lateral y actualiza icono, accesibilidad y estado visual.
	const setMenuState = (isOpen) => {
		document.body.classList.toggle('menu-open', isOpen);
		menuButton.setAttribute('aria-expanded', String(isOpen));
		menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
		menuIcon.src = isOpen
			? './assets/images/icon-menu-close.svg'
			: './assets/images/icon-menu.svg';
		menuIcon.alt = isOpen ? 'Cerrar menú' : 'Abrir menú';
	};

	// Estado inicial: menú cerrado y con atributos accesibles correctos.
	menuButton.setAttribute('aria-expanded', 'false');
	menuButton.setAttribute('aria-label', 'Abrir menú');
	navMenu.setAttribute('aria-hidden', 'true');

	// Alterna el menú cada vez que se pulsa el botón hamburguesa.
	menuButton.addEventListener('click', () => {
		setMenuState(!document.body.classList.contains('menu-open'));
	});

	// Tocar el fondo oscuro también cierra el menú.
	backdrop.addEventListener('click', () => {
		setMenuState(false);
	});

	// Al elegir una opción del menú, lo cerramos para volver al contenido.
	navMenu.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => {
			setMenuState(false);
		});
	});

	// Escape funciona como atajo para cerrar el panel.
	window.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			setMenuState(false);
		}
	});
});
