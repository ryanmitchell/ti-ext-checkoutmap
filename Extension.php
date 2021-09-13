<?php 

namespace Thoughtco\Checkoutmap;

use Admin\Models\Orders_model;
use System\Classes\BaseExtension;

class Extension extends BaseExtension
{
    public function boot()
    {
        $this->extendOrders();   
    }
    
    public function registerComponents()
    {
        return [
            'Thoughtco\Checkoutmap\Components\CheckoutMap' => [
                'code' => 'checkoutMap',
                'name' => 'lang:thoughtco.checkoutmap::default.text_map_component_title',
                'description' => 'lang:thoughtco.checkoutmap::default.text_map_component_desc',
            ],
        ];
    }
    
    private function extendOrders()
    {
		Orders_model::extend(function ($model) {
			$model->fillable(array_merge($model->getFillable(), ['delivery_lat', 'delivery_lng']));
		});
    }
}