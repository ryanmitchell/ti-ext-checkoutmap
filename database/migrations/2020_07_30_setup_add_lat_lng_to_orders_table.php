<?php

namespace Thoughtco\Checkoutmap\Database\Migrations;

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLatLngToOrdersTable extends Migration
{
    public function up()
    {
        if (!Schema::hasColumn('orders', 'delivery_lat'))
        {
            Schema::table('orders', function (Blueprint $table) {
                $table->text('delivery_lat')->nullable();
                $table->text('delivery_lng')->nullable();
            });
        }
    }
}
