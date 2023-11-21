# Proyecto Coder House

### A continuación se listan los endpoint que formarán parte de esta API:

#### Products
GET /api/products

GET /api/products?limit=numero&page=number&sort=asc&query={"category":"tecnologia"}

GET /api/products/:pid

POST /api/products

DELETE /api/products/:pid

PUT /api/products/:pid

#### Cart
GET /api/carts/:cid

POST /api/carts

PUT /api/carts/:cid

DELETE /api/carts/:cid

POST /api/carts/:cid/product/:pid

PUT /api/carts/:cid/product/:pid

DELETE /api/carts/:cid/product/:pid

#### User
POST /api/users/register

GET /api/users/failregister

POST /api/users/login

GET /api/users/faillogin

GET /api/users/logout

GET /api/users/current

PATCH /api/users/premium/:uid

POST /api/users/passwordrecovery

PATCH /api/users/restore/:token

PATCH /api/users/premium/:uid 

#### Views 
-Login

/

-Registro del usuario

/register

-Perfil del usuario

/profile

-Lista de productos con paginación.

/products

-Detalles del producto seleccionado.

/products/:pid

-Lista los productos agregados al carrito.

/carts/:cid?


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