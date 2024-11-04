const gameArea = document.getElementById('gameArea');
        const basket = document.getElementById('basket');
        let basketPosition = gameArea.clientWidth / 2;
        const basketSpeed = 15;
        const objectSpeed = 2; // Velocidad de caída de los objetos
        const imagenes = [
            '../img/img_virginia/lata.png', // Ruta a la primera imagen
            '../img/img_virginia/Pixel-Art-Fish.png', // Ruta a la segunda imagen
            '../img/img_virginia/plastic.png'  // Ruta a la tercera imagen
        ];

        // Posicionar la cesta al inicio
        basket.style.left = basketPosition + 'px';

        // Función para mover la cesta
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                basketPosition = Math.max(0, basketPosition - basketSpeed);
            } else if (event.key === 'ArrowRight') {
                basketPosition = Math.min(gameArea.clientWidth - basket.offsetWidth, basketPosition + basketSpeed);
            }
            basket.style.left = basketPosition + 'px';
        });

        // Función para crear objetos en posiciones aleatorias
        function createFallingObject() {
            const object = document.createElement('div');
            const img = document.createElement('img');
            const randomImage = imagenes[Math.floor(Math.random() * imagenes.length)];
            img.src = randomImage;
            img.classList.add('calse_imagen')
            object.classList.add('fallingObject');
            object.style.left = Math.random() * (gameArea.clientWidth - 30) + 'px';
            object.style.top = '0px';
            object.appendChild(img);
            gameArea.appendChild(object);

            // Caída del objeto
            const fallInterval = setInterval(() => {
                const currentTop = parseFloat(object.style.top);
                object.style.top = currentTop + objectSpeed + 'px';

                // Chequear si el objeto ha llegado al fondo o fue recogido
                if (currentTop > gameArea.clientHeight - basket.offsetHeight - 30) {
                    const objectLeft = parseFloat(object.style.left);
                    const basketLeft = parseFloat(basket.style.left);

                    // Verificar si el objeto está dentro de los límites de la cesta
                    if (objectLeft > basketLeft && objectLeft < basketLeft + basket.offsetWidth) {
                        // Recogido
                        alert('¡Objeto recogido!');
                    }

                    object.remove(); // Eliminar el objeto después de tocar el fondo o la cesta
                    clearInterval(fallInterval); // Detener la caída del objeto
                }
            }, 20);
        }

        // Generar un objeto nuevo cada 1 segundo
        setInterval(createFallingObject, 3000);