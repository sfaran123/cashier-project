<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BankSeeder extends Seeder
{

    public function run()
    {
        DB::table('banks')->insert([
            ['id' => '1', 'name' => 'בנק יהב לעובדי המדינה בע\"מ', 'number' => '4',],
            ['id' => '3', 'name' => 'בנק לאומי לישראל בע\"מ', 'number' => '10',],
            ['id' => '4', 'name' => 'בנק דיסקונט לישראל בע\"מ', 'number' => '11',],
            ['id' => '5', 'name' => 'בנק הפועלים בע\"מ', 'number' => '12',],
            ['id' => '6', 'name' => 'בנק אגוד לישראל בע\"מ', 'number' => '13',],
            ['id' => '7', 'name' => 'בנק אוצר החייל בע\"מ', 'number' => '14',],
            ['id' => '8', 'name' => 'בנק מרכנתיל דיסקונט בע\"מ', 'number' => '17',],
            ['id' => '9', 'name' => 'בנק מזרחי טפחות בע\"מ', 'number' => '20',],
            ['id' => '10', 'name' => 'Citibank N.A', 'number' => '22',],
            ['id' => '11', 'name' => 'HSBC  Bank plc', 'number' => '23',],
            ['id' => '13', 'name' => 'יובנק בע\"מ', 'number' => '26',],
            ['id' => '14', 'name' => 'הבנק הבינלאומי הראשון לישראל בע\"מ', 'number' => '31',],
            ['id' => '15', 'name' => 'בנק ערבי ישראלי בע\"מ', 'number' => '34',],
            ['id' => '16', 'name' => 'SBI State Bank of India', 'number' => '39',],
            ['id' => '17', 'name' => 'בנק מסד בע\"מ', 'number' => '46',],
            ['id' => '18', 'name' => 'מרכז סליקה בנקאי בע\"מ', 'number' => '50',],
            ['id' => '19', 'name' => 'בנק פועלי אגודת ישראל בע\"מ', 'number' => '52',],
            ['id' => '20', 'name' => 'בנק ירושלים בע\"מ', 'number' => '54',],
            ['id' => '21', 'name' => 'שירותי בנק אוטומטיים בע\"מ', 'number' => '59',],
            ['id' => '22', 'name' => 'חסך קופת חסכון לחינוך בע\"מ, חיפה', 'number' => '65',],
            ['id' => '23', 'name' => 'בנק דקסיה ישראל בע\"מ', 'number' => '68',],
            ['id' => '24', 'name' => 'בנק לאומי למשכנתאות בע\"מ', 'number' => '77',],
            ['id' => '25', 'name' => 'בנק דיסקונט למשכנתאות בע\"מ', 'number' => '90',],
            ['id' => '26', 'name' => 'בנק ישראל', 'number' => '99',],
            ['id' => '27', 'name' => 'בנק הדואר', 'number' => '9',],
        ]);

    }
}
