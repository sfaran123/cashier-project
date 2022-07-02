<?php


namespace App\Services\Excel;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Events\AfterSheet;

class ExcelWriter implements FromCollection, WithHeadings, WithEvents
{
    private $columns;
    private $headers;

    public function __construct($columns, $headers)
    {
        $this->headers = $headers;
        $this->columns = $columns;
    }

    private function headingRange()
    {
        $range = range('A', 'Z');
        return 'A1:' . $range[count($this->headers) - 1] . '1';
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $event->sheet->getDelegate()->setRightToLeft(true);
                $event->sheet->getDelegate()->getStyle($this->headingRange())
                    ->getFill()
                    ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
                    ->getStartColor()->setARGB('e82c5c');
                }
            ];
    }

    public function collection()
    {
        return $this->columns;
    }

    public function headings(): array
    {
        return $this->headers;
    }
}
