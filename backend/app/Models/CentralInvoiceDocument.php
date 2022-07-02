<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CentralInvoiceDocument extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function document()
    {
        return $this->belongsTo(Document::class);
    }

    public static function saveInstances($documents, $invoiceId)
    {
        $documentsToInsert = [];

        $documentsIds = collect($documents)->pluck('id');
        $docsToUpdate = Document::whereIn('id', $documentsIds)->orderBy('id', 'ASC')->get();

        collect($documents)->sortBy('id');
        foreach ($documents as $index => $document) {
            // todo use mass update

            $docsToUpdate[$index]['balance_due'] = $docsToUpdate[$index]['balance_due'] - $document['sumToPay'];
            $docsToUpdate[$index]->save();

            $document = collect($document);
            $data = [
                'central_invoice_id'    => $invoiceId,
                'document_id'           => $document->get('id'),
                'sum_paid'              => $document->get('sumToPay')
            ];

            $documentsToInsert[] = $data;
        }

        self::insert($documentsToInsert);
    }
}
