document.addEventListener('DOMContentLoaded', function() {

    // --- Animación del Header al hacer scroll ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Menú Hamburguesa para Móvil ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Cierra el menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- Animación de Fade-in al hacer scroll ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- NUEVA FUNCIONALIDAD DE BÚSQUEDA AVANZADA MEJORADA ---
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // Mapeo de contenido y sus IDs/URLs para la búsqueda
    // HE EXPANDIDO LAS PALABRAS CLAVE AQUÍ. POR FAVOR, AJÚSTALAS AÚN MÁS SEGÚN NECESITES.
    const searchableContent = [
        { page: 'index.html', id: 'home', keywords: ['inicio', 'home', 'transformar ideas', 'experiencias digitales', 'inovaweb', 'desarrollo web', 'soluciones digitales', 'tuxtla gutiérrez', 'chiapas', 'web futuro', 'ver servicios', 'web', 'digital'] },
        { page: 'index.html', id: 'about', keywords: ['sobre inovaweb', 'quienes somos', 'empresa', 'independiente', 'chiapas', 'desarrollo web', 'sistemas web', 'soluciones personalizadas', 'presencia digital', 'quiénes somos'] },
        { page: 'index.html', id: 'mission', keywords: ['misión', 'vision', 'valores', 'innovacion', 'responsabilidad', 'transparencia', 'compromiso', 'trabajo en equipo', 'principios', 'metas', 'objetivos', 'filosofía'] },
        { page: 'index.html', id: 'services', keywords: ['servicios', 'desarrollo web', 'paginas web', 'sitios web', 'sistemas personalizados', 'e-commerce', 'tiendas online', 'comercio electrónico', 'optimizacion digital', 'soluciones', 'ofertas'] },
        { page: 'index.html', id: 'contact', keywords: ['contacto', 'contactar', 'hablemos proyecto', 'información contacto', 'tuxtla gutiérrez', 'correo', 'email', 'telefono', 'teléfono', 'redes sociales', 'cotización', 'presupuesto', 'formulario', 'mensaje'] },
        { page: 'historia.html', id: 'page-hero', keywords: ['historia', 'nacimiento', 'nacimiento sueño', 'consolidacion', 'expansión', 'innovacion', 'e-commerce', 'futuro', 'trayectoria', 'evolucion', 'origen', 'nuestros inicios', 'fundacion', 'quienes somos historia'] }, // Apuntando al hero de historia para iniciar
        { page: 'catalogo.html', id: 'gallery', keywords: ['catalogo', 'catálogo', 'proyectos', 'galeria', 'galería', 'trabajos', 'e-commerce', 'sistema crm', 'web corporativa', 'app web', 'landing page', 'rediseño web', 'ejemplos', 'nuestros proyectos'] }
    ];

    // Función principal de búsqueda
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) {
            alert('Por favor, introduce un término de búsqueda.');
            return;
        }

        let foundMatch = null;
        let bestMatchScore = -1;

        searchableContent.forEach(item => {
            const itemKeywordsString = item.keywords.join(' ').toLowerCase(); // Unir todas las palabras clave del ítem

            let currentScore = 0;

            // 1. Prioridad: Coincidencia de la frase completa (o casi completa)
            if (itemKeywordsString.includes(query)) {
                currentScore += 10; // Alto puntaje para coincidencia de frase exacta
            }

            // 2. Coincidencia de palabras individuales
            const queryWords = query.split(' ').filter(word => word.length > 2); // Dividir la consulta en palabras, ignorar muy cortas
            queryWords.forEach(word => {
                if (itemKeywordsString.includes(word)) {
                    currentScore += 1; // Añadir puntaje por cada palabra coincidente
                }
            });

            // Considerar la longitud de la query en la puntuación si hay múltiples palabras
            if (queryWords.length > 1 && currentScore > 0) {
                 // Si busca "desarrollo web" y ambas palabras coinciden, dar un bonus
                 currentScore += queryWords.length;
            }


            if (currentScore > bestMatchScore) {
                bestMatchScore = currentScore;
                foundMatch = item;
            }
        });

        if (foundMatch && bestMatchScore > 0) { // Asegúrate de que haya una coincidencia con score > 0
            const currentPathname = window.location.pathname.split('/').pop(); // Obtiene el nombre del archivo actual (ej. 'index.html')
            const currentPageName = currentPathname === '' ? 'index.html' : currentPathname; // Maneja el caso de la raíz como index.html

            // Verifica si la página de la coincidencia es la misma que la actual
            if (foundMatch.page === currentPageName) {
                const targetElement = document.getElementById(foundMatch.id);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    const headerOffset = 100; // Ajusta este valor si tu header es más alto
                    window.scrollBy(0, -headerOffset);
                } else {
                    // Fallback si el ID no existe en la página actual (debería existir)
                    alert(`Se encontró la palabra en la página actual, pero la sección "${foundMatch.id}" no se encontró.`);
                }
            } else {
                // Si la coincidencia está en otra página, redirige y luego desplázate
                window.location.href = foundMatch.page + '#' + foundMatch.id;
            }
        } else {
            alert(`No se encontraron resultados para "${query}".`);
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    // Manejar redirecciones a anclas desde otras páginas
    window.addEventListener('load', () => {
        if (window.location.hash) {
            const id = window.location.hash.substring(1); // Elimina el '#'
            const targetElement = document.getElementById(id);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                const headerOffset = 100;
                window.scrollBy(0, -headerOffset);
            }
        }
    });

});
