# MANAGE USER APP
App Angular para la gestión de usuarios. El usuario podrá registrarse en el sistema y posteriormente autenticarse, luego podrá acceder al sistema y consultar los datos de los usuarios dados de alta, además de otras acciones como: filtrado, edición, eliminación, cambio de contraseña, entre otras funcionalidades.

## Despliegue
1- Instalar dependencias del proyecto mediante el comando:
    ```
    npm install
    ```
    
2- Correr el proyecto
    ```
    npm run serve
    ```
    
3- Compilar proyecto
    ```
    npm run build
    ```

## Restricciones del ejercicio
1- La app permite dar de alta a los usuarios mediante la opción de registro.    

![Screenshot](readme/registrarse.PNG)

2- Para acceder a las funcionalidades del sistema deberá autenticarse.
Esta es la típica ventana de email-contraseña en la que el usuario se puede autenticar. Validará las 
credenciales introducidas por el usuario, mostrando los mensajes oportunos de error (las credenciales no 
son correctas, no se ha indicado el campo de email o es incorrecto su formato y no se ha indicado el 
campo de contraseña). Si la validación es correcta, se mostrará la ventana de Listado de Usuarios dados de Alta.

![Screenshot](readme/inicio-session.PNG)

3- El listado de usuarios es una pantalla en la que se listan los usuarios dados de alta para comprobar que
 todo funciona correctamente, es decir que son dados de alta de forma satisfactoria.

![Screenshot](readme/listar.PNG)

Sobre los datos (tabla) podra realizar las siguientes acciones:

![Screenshot](readme/btns-list.PNG)

    1. Filtrar por cadena de texto.
    2. Filtro por campos específicos.
    3. Adicionar usuario.
    4. Editar usuario.
    5. Eliminar usuario.

4- Filtrar por cadenas de texto
  
   ![Screenshot](readme/busqueda-cadena-texto.PNG)
   
       1. Botón Aceptar: Botón que ejecuta la búsqueda.
       2. Botón que cancela la búsqueda.
       3. Campo donde se introduce el texto por el cual se va a buscar.

5- Filro por campos específicos
   
   ![Screenshot](readme/filtros-especificos.PNG)
   
       1. Botón cerrar ventana de búsqueda.
       2. Filtrar por nombre.
       3. Filtrar por correo.
       4. Filtrar por edad.
       5. Botón aceptar.
       6. Botón cancelar.

6- Adicionar usuario
Consiste en la creación de nuevos usuarios de la aplicación. Es una pantalla sencilla que sólo incluirá cuatro campos

![Screenshot](readme/adicionar.PNG)

7- Editar usuario

![Screenshot](readme/editar.PNG)

8- Eliminatr usuario

![Screenshot](readme/eliminar.PNG)

9- Cambiar contraseña

![Screenshot](readme/cambiar-contraseña.PNG)

