# Pokémon App

Aplicación móvil en React Native para visualizar una lista de Pokémon y sus detalles, en general el estilo es bastante básico, pero incluye bastantes componentes y animaciones interesantes detrás.

## Tecnologías usadas

- React Native
- TypeScript
- React Navigation
- AsyncStorage
- Context API (ThemeContext)
- EXPO
- React Navigation
- Pokeapi typescript

## Instalación

1. Clona el repositorio: https://github.com/FelixEscalera900/ecolanaApp
2. Descarga todas las dependencias con `npm i`
3. Instala expo Go en tu dispositivo móvil
4. Corre la app con el comando `npx expo start`
5. Escanea el QR que aparece en la consola desde la aplicación de Expo Go

## Hints and Tricks

1. Para iniciar sesión usa el usuario admin y la contraseña 123
2. Pon más de 5 caracteres en el campo de usuario en el login para ver un error de validación extra
3. Pon como nombre de usuario el ususario "error" para que la "api" falle


## Requisitos mínimos

Para explicar las decisiones técnicas de la aplicación recorreré los requerimientos listados en las instrucciones de la prueba técnica y explicaré el como y porqué realicé cada requerimiento como lo realicé.

### 1. Pantalla de Login

Para el login realice un layout simple con una superficie sobre un fondo que contiene los campos para las credenciales del usuario, el botón de login y un título, el botón tiene un activity indicator para indicar que esta haciendo la autenticación en la api, además agregué un popup de error que salta cuando la autenticación o la api fallan.

**Inputs de usuario y contraseña (mock)**

Para los inputs de usuario y contraseña creé un componente personalizado y reutilizable, el cual maneja en automático y de manera dinámica las validaciones que el desarrollador le indique, este componente incluye el campo de texto con estilos personalizados para la app y label debajo que funciona como un aárea para mostrar errores de validación.

El desarrollador puede indicar que validaciones tendrá el input pasandole un listado de objetos de tipo validator que es un objeto que contiene la lógica para hacer una validación, después de pasarle las validaciones al componente este se encargará de manejarlas automáticamente y en tiempo real, es decir, se validarán cada vez que el usuario coloca algo en el input.

Para ejemplificar el funcionamiento de las validaciones, hice que saliera un error de validación si el nombre de usuario supera los 5 carácteres, s epuede observar como en cuanto se supera el limite salta la validación sin necesidad de dar en login.

Se utulizó composisión para realizar el control personalizado, toda la lógica de validación no está en si dentro del input, si no en un hook personalizado que hice llamado UseFormField, y el control solo lo consume y expone según necesite, lo hice así para dividir la lógica de la capa de presntación, y al dividirlo puedo reemplazar el control por el que yo quiera, por ejemplo en este caso usé el hook con un campo de texto, pero si se desea se puede usar con un combobox, campo de fechas numero o constroles más específicos.

**Validación simple (campos requeridos)**

Como mencioné antes, las validaciones se realizan en tiempo real y se muestran mientras escribes, se muestran co un mesaje de texto debajo del campo y mostrando un estilo que indica que el campo es inválido, además se agregó un popup de color rojo que se desvanece para indicar que el login ha fallado enc aso que se de tap en el botón de login y las credenciales sea incorrecta.

**Login exitoso con valores mockeados**

Como s emenciona en el apartado de hints an tricks, para iniciar sesión hay que usar el usuario admin y contraseña 123, además si se desea ver un error en la api se debe de usar el usuario "error".

Para el login traté de usar inyeccion de dependecias, creando una interfaz que fuera el servicio de login, y que en este caso la implemetació serí aun ainstancia de la clase mock que hace consultas falsas, usé context api como inyector de dependencias, aunque la verdad me arrepiento un poco, parece que en react no es tan recomendado usar inyección de dependencia como en otros framework.

**Al loguearse correctamente, navegar a la pantalla principal.**

Para navegar utilicé react navigation.

### 2. Estado global y persistencia

**El estado de autenticación debe mantenerse si se reinicia la app**

Usé async storage para guardar el token de autenticación recibido por la api, este token se lee en la clase Navigation, que es la que controla la navegación cada vez que se inicia la app, no me compliqué mucho con la verificación de si el usuario esta autrnticado mandando una soicitud a al aapi o algo así, solo se checa que exista el token, si existe manda dirécto a home, de lo contrario muestra la pantalla de login

**Al estar logueado, la app debe ir directamente a la pantalla principal**.

Como se mencionó antes, se checa que existe un token de autenticación en la persistencia de la app, si lo hay manda dirécto a home

### 3. Pantalla principal (lista de Pokémon)

Para la pantalla de home hice un layout con una FlatList con scroll infinito y un botón de logout.

**Consumir la PokéAPI (https://pokeapi.co/) y mostrar una lista de al menos 20 Pokémon**

La app utiliza el endpoint de listado de pokemon para mostrar la lista inicial, traer la imagen de cada pokemon y finalmente sus detalles si se da tap en algún card de pokemon

**Mostrar nombre e imagen de cada Pokémon**

Hice un flatlist infinito refresheable con el nombre y el sprite default de cada pokemon, como la lista de consulta de pokemon no incluye la imagen, tuve que hacer que el card de pokemon consulte internamente todos los detalles del pokemon, que es otro endpoint en donde si viene el sprite default, el card tiene animaciones para aparecer con un desvanecido y un activity indicator para indicar que está cargando el pokemon, tuve que poner un delay de un segundo para que se alcance a apreciar mejor la animación.

**Usar FlatList o equivalente**

Se usó flatList para mostrar los pokemon

**Mostrar indicador de carga (ActivityIndicator)**

Hay inidicadores de carga para cada pokemon, en el botón de login y en la screen de detalle de un pokemon.

**Mostrar mensaje de error si falla la API**

Si falla la api al traer la imagen de pokemon se muestra un mensaje en el card que dice que hubo un error de network, si se pone e usuario error en el login se finge un error en la api y muestra un popup de error, para ser sincero olvidé manejar los errores en el cargado del listado y la pantalla de detalle del pokemon, pero creo que los dos casos que si maneje sirven para demostrar que sé cómo hacerlo.

### 4. Logout

**Debe haber una opción para cerrar sesión y volver a la pantalla de login**

Hay un botón de logout en la pantalla de home, si se le da tap, se borra el token de la persistencia y te manda al login.

### 5. Theming

**Adaptar los colores automáticamente al modo claro/oscuro del sistema**

Se usó context api para guardar el tema actual, que es una interfaz de tipo theme, cuya implementación es un objeto con colores de tema oscuro o claro dependiendo del tema del sistema operativo.

**Se espera uso de useColorScheme() y/o Appearance**

Se usó useColorScheme() para determinar cual es el tema del sistema y cambiar el de la app en automático.

### 6. Componentización


**La app debe estar dividida en componentes reutilizables (por ejemplo: Input, Button, CardPokemon, etc.)**

Hay componentes para cada screen, para los input, botones y card de pokemon.


## Tecnologías requeridas

- TypeScript: La app está escrita en este lenguaje
- Manejo de estado global: Se hace uso de Context API
- Persistencia de datos: Se hace uso de AsyncStorage
- Navegación: Se hace uso de React Navigation.

## Bonus

**Paginación o scroll infinito en la lista de Pokémon**

Se implementó correctamente, el tamaño del offset se dejó en 20 que es el que tiene por default la lista de pokemon

**Pantalla de detalle de un Pokémon (nombre, tipo, habilidades...)**

Se realizó una pantalla simple a la que se accede dando tap a un pokemon en la lista de pokemon.

**Manejo avanzado de errores**

En el login en el mock de error de la api hice una excepción personalizada para cuando hay un error que sea una respuesta directa de la api, y usé un error genérico para las excepciones no manejadas.

*Animaciones sutiles al mostrar elementos*

Hay animaciones al dar tap a los botones y cuando aparecen los cards y sus datos.

# Observaciones

- Descargué una libreria de pokeapi, pero no para hacer las request, sólo los modelos de datos, ya que por ejemplo el de detalles era muy grande y me iba a consumir algo de tiempo hacerlos

-Espero que te guste C:

