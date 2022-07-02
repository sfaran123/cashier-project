<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'                        => $this->id,
            'code'                      => $this->code,
            'description'               => $this->description,
            'unitsInStock'              => $this->mainItemInventory ? $this->mainItemInventory->units_in_stock : 0,
            'costPrice'                 => $this->cost_price,
            'categoryId'                => $this->main_category_id,
            'subCategoryId'             => $this->sub_category_id,
            'supplierId'                => $this->supplier_id,
            'supplierItemCode'          => $this->supplier_item_code,
            'customerPrice'             => $this->customer_price,
            'minChainAmount'            => $this->min_chain_amount,
            'maxChainAmount'            => $this->max_chain_amount,
            'minStoreAmount'            => $this->min_store_amount,
            'maxStoreAmount'            => $this->max_store_amount,
            'costInStore'               => $this->cost_in_store,
            'costPriceDiscount'         => $this->cost_price_discount,
            'notDiscountable'           => $this->not_discountable,
            'bonAdditionalText'         => $this->bon_additional_text,
            'availableFrom'             => $this->available_from,
            'availableTo'               => $this->available_to,
            'isWeighable'               => $this->is_weighable,
            'includesVat'               => $this->includes_vat,
            'isTaxed'                   => $this->is_taxed,
            'isRenameEnabled'           => $this->is_rename_enabled,
            'isAdditionalPercentage'    => $this->is_additional_percentage,
            'isInventoryManager'        => $this->is_inventory_manager,
            'allowPriceZero'            => $this->allow_price_zero,
            'isExtra'                   => $this->is_extra,
            'isLockedForSale'           => $this->is_locked_for_sale,
            'requiresManager'           => $this->requires_manager,
            'subItems'                  => InventoryResource::collection($this->inventories),
            'customerPrices'            => ItemCustomerPriceResource::collection($this->customerPrices),
            'instructions'              => InstructionsResource::collection($this->instructions),
            'extraItems'                => ExtraItemResource::collection($this->extraItems)
        ];
    }
}
