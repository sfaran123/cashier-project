<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        $items = $request->get('items');
        $sum = $request->get('sum');
        $paymentType = $request->get('paymentType');

        Order::saveInstance($items, $sum, $paymentType);

        return response(['message'  => 'Order saved.'], 200);
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
