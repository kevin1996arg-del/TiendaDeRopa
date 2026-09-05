document.addEventListener('DOMContentLoaded', () => {
    console.log('TiendaDeRopa cargada');
    document.querySelectorAll('.card button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const nombre = e.target.closest('.card').querySelector('h3').textContent;
            alert(Agregado al carrito: + nombre);
        });
    });
});
