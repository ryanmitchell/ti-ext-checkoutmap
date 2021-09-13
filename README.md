# Checkout map

Allow customers to change the delivery location by dragging a marker on a map.

### Installation
Upload to extensions in the following folder format:

`extensions/thoughtco/checkoutmap/`

In the admin user interface enable the extension.

Add the component `checkoutMap` to your default layout, and then copy `igniter/cart/components/checkout/address_fields.blade.php` to `_partials/checkout/address_fields.blade.php` in your child theme. Then add `@component('checkoutMap')` to the bottom of the file.

You can optionally set the zoom of the map using the component property (available when adding/editing in the admin panel).