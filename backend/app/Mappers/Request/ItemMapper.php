<?php

namespace App\Mappers\Request;

use Illuminate\Http\Request;

class ItemMapper
{
	public static function map(Request $request)
	{
		return [
			'description'				=> $request->input('description'),
			'code'				        => $request->input('code'),
			'customer_price'			=> $request->input('customerPrice'),
            'main_category_id'			=> $request->input('categoryId'),
            'sub_category_id'			=> $request->input('subCategoryId'),
			'cost_price'				=> $request->input('costPrice'),
			'min_chain_amount'			=> $request->input('minChainAmount'),
			'max_chain_amount'			=> $request->input('maxChainAmount'),
			'min_store_amount'			=> $request->input('minStoreAmount'),
			'max_store_amount'			=> $request->input('maxStoreAmount'),
			'is_weighable'				=> boolval($request->input('isWeighable')),
			'includes_vat'				=> boolval($request->input('includesVat')),
			'is_taxed'				    => boolval($request->input('isTaxed')),
			'is_rename_enabled'			=> boolval($request->input('isRenameEnabled')),
			'is_additional_percentage'	=> boolval($request->input('isAdditionalPercentage')),
			'is_inventory_manager'		=> boolval($request->input('isInventoryManager')),
			'allow_price_zero'			=> boolval($request->input('allowPriceZero')),
			'is_extra'				    => boolval($request->input('isExtra')),
			'not_discountable'			=> boolval($request->input('notDiscountable')),
			'is_locked_for_sale'		=> boolval($request->input('isLockedForSale')),
			'requires_manager'			=> boolval($request->input('requiresManager')),
			'supplier_id'				=> $request->input('supplierId'),
			'supplier_item_code'		=> $request->input('supplierItemCode'),
			'cost_price_discount'		=> $request->input('costPriceDiscount'),
			'cost_in_store'				=> $request->input('costInStore'),
			'bon_additional_text'		=> $request->input('bonAdditionalText'),
			'available_from'			=> $request->input('availableFrom'),
			'available_to'				=> $request->input('availableTo'),

            // TODO move to another resource?
			'subItems'				    => $request->input('subItems'),
			'unitsInStock'				=> $request->input('unitsInStock'),
            'customerPrices'			=> $request->input('customerPrices'),
            'extraItems'			    => $request->input('extraItems'),
            'instructions'			    => $request->input('instructions')
        ];
	}
}
