<?php

namespace Thoughtco\Checkoutmap\Components;

use Igniter\Local\Facades\Location;
use System\Classes\BaseComponent;

class CheckoutMap extends BaseComponent
{
    public function defineProperties()
    {
        return [
            'zoom' => [
                'label' => 'lang:thoughtco.checkoutmap::default.text_component_zoom',
                'type' => 'number',
                'default' => 19,
                'validationRule' => 'required|integer',
            ],
        ];
    }

    public function initialize()
    {
        $locationModel = Location::current()->getModel();
        $this->page['zoom'] = $this->property('zoom');
        $this->page['initialLat'] = $locationModel->location_lat;
        $this->page['initialLng'] = $locationModel->location_lng;
        $this->page['city'] = $locationModel->location_city;
        $this->page['country'] = optional($locationModel->country)->country_name;
    }

    public function onRun()
    {
        if (strlen($key = setting('maps_api_key'))) {
            $url = 'https://maps.googleapis.com/maps/api/js?key=%s&libraries=geometry';
            $this->addJs(sprintf($url, $key),
                ['name' => 'google-maps-js', 'async' => null, 'defer' => null]
            );
        }
        
        $this->addCss('css/checkoutmap.css', 'checkoutmap-css');
        $this->addJs('js/checkoutmap.js', 'checkoutmap-js');
    }
}
