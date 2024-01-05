# Proyecto Coder House
Backend de una aplicación de e-commerce para poder vender productos de un rubro a
elección.Contiene la logica para agregar, editar y elimar productos y usuarios, ademas de su respectivo carrito de compra.

El servidor se basará en un diseño de capas, orientado a MVC.

## Base URL
https://ecommerce-coder-production.up.railway.app

## Documentación con swagger
https://ecommerce-coder-production.up.railway.app/api-docs/

## Instalación 

- Instalar dependencias: 
```js
$ npm install
```

- Correr el proyecto: 
```js
$ npm run dev
```

Para visualizarlo los endpoints utilizar http://localhost:8080

## Capturas de pantalla

### Correo de eliminación de producto cuyo owner es premium
![](./img/email-delete-product.png)

### Correo de eliminación de cuenta inactivas
![](./img/email-delete-user.png)

### Lista de usuarios
![](./img/list-users.png)

### Testing
![](./img/testing.png)

### Restablecimiento de contraseña

Login con link para restablecer contraseña
![](./img/login.png)


Ingresar correo para restablecer contraseña
![](./img/password-recovery.png)


Email con link para restablecer contraseña
![](./img/email-reset-password.png)


Restablecimiento de contraseña exitoso
![](./img/password-reset.png)


Error al ingresar la misma contraseña
![](./img/password-invalid.png)


Link expirado
![](./img/link-expired.png)

### Crear producto con owner premium
![](./img/create-product-owner-premium.png)

### Cambio de rol premium a usuario y viceversa
![](./img/change-rol-to-premium.png)
![](./img/change-rol-to-usuario.png)

### Error al ingresar un producto al carrito cuando se es el owner del producto
![](./img/error-you-ar-not-authorized-to-add-product.png)

### Loggers de producción en la terminal
![](./img/loggertest-prod.png)

### Loggers de desarrollo en la terminal
![](./img/loggertest-dev.png)


### Router mockingproducts
![](./img/router-mockingproducts.png)


### Manejo de errores
![](./img/error-trying-create-product.png)

### Correo de confirmación
![](./img/email-ticket.png)

### SMS de confirmación
![](./img/SMS-ticket.jpg)


### Router purchase 
![](./img/router-purchase-1.png)
![](./img/router-purchase-2.png)

### Router current 
![](./img/router-current.png)

### Postman
api/products
![](./img/postman-5.png)
![](./img/postman-4.png)
![](./img/postman-2.png)
![](./img/postman-3.png)

api/users
![](./img/postman-7.png)
![](./img/postman-6.png)
![](./img/postman-1.png)