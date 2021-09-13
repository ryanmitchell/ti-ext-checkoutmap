
(function(){
    
    const el = document.querySelector('.checkout-map');

    if (el) {
        
        let addressSelector, debounceHandler;
        
        const addressEls = ['address[address_1]', 'address[address_2]', 'address[city]', 'address[state]', 'address[postcode]', 'address[country]'];
        
        const latField = document.querySelector('[name="delivery_lat"]');
        const lngField = document.querySelector('[name="delivery_lng"]');
        
        const geocoder = new google.maps.Geocoder();
        
        const map = new google.maps.Map(el, {
            zoom: parseInt(el.dataset.zoom),
            center: new google.maps.LatLng(el.dataset.lat ?? 0, el.dataset.lng ?? 0),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: true,
            fullscreenControl: true,
            mapTypeControl: false,
            rotateControl: true,
            streetViewControl: false,
            disableDefaultUI: true,
        });
        
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(0, 0),
            map: map,
            draggable: true,
        });
        
        marker.addListener('dragend', (event) => {
            latField.value = event.latLng.lat();
            lngField.value = event.latLng.lng();  
        });
                
        let addressHasChanged = (address) => {
                        
            if (!address)
                return;
                
            try { window.clearTimeout(debounceHandler) } catch (e) { };
                
            debounceHandler = window.setTimeout(() => {
                
                el.parentNode.classList.remove('d-none');
            
                geocoder.geocode({
                    address: address,
                }, (response) => {
                                        
                    if (!response)
                        return;
                                            
                    let lat = response[0].geometry.location.lat();
                    let lng = response[0].geometry.location.lng()
            
                    map.setCenter(new google.maps.LatLng(
                        lat,
                        lng
                    ));
                    
                    marker.setPosition(new google.maps.LatLng(
                        lat,
                        lng
                    ));
                    
                    latField.value = lat;
                    lngField.value = lng;                                         
                
                });
            
            }, 500);
        
        }
        
        if (addressSelector = document.querySelector('[name="address_id"]')) {
        
            addressSelector.addEventListener('change', (event) => {
               
                let val = event.target.value;
                if (val != 0)
                    addressHasChanged(event.target.options[event.target.selectedIndex].textContent.replace(/(?:\r\n|\r|\n)/g, ', '));
                
            });
            
        }
        
        addressEls.forEach((addressEl) => {
        
            let inputEl;
            if (inputEl = document.querySelector('[name="' + addressEl + '"]')) {
    
                inputEl.addEventListener('input', (event) => {
                
                    let address = [];
                    let countryFound = false;
                    let cityFound = false;
                    addressEls.forEach(addressEl => {
                        addressEl = document.querySelector('[name="' + addressEl + '"]');
                        if (addressEl && addressEl.value != '') {
                            if (addressEl.name.indexOf('country') > -1)
                                countryFound = true;
                                
                            if (addressEl.name.indexOf('city') > -1)
                                cityFound = true;
                                                                
                            address.push(addressEl.value);
                        }
                    });
                    
                    if (!cityFound && el.dataset.city)
                        address.push(el.dataset.city);
                    
                    if (!countryFound && el.dataset.country)
                        address.push(el.dataset.country);
                                        
                    if (address.length)
                        addressHasChanged(address.join(', '));
                    
                });
                
            }
            
        });
        
            
    };

})();