
        <div class="form-group d-none">
            <label for="">@lang('thoughtco.checkoutmap::default.label_map')</label>
            <figure 
                class="checkout-map"
                data-zoom="{{ $zoom }}"
                data-lat="{{ $initialLat }}"
                data-lng="{{ $initialLng }}"
                data-city="{{ $city }}"
                data-country="{{ $country }}"
            ></figure>
            <input type="hidden" name="delivery_lat" />
            <input type="hidden" name="delivery_lng" />
        </div>