<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\CategoryModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Product::select('id','name','image','price','promotionPrice', 'description', 'quantity', 'id_type')->get();
    }

    public function indexCategory () {
        return CategoryModel::select('id', 'name') -> get();
    }

    // public function indexCategories()
    // {
    //     //return CategoryModel::select('id','name')->get();
        
    // }

    public function store (Request $request)
    {
        $request->validate([
            'name'=>'required',
            'image'=>'required|image',
            'price'=>'required|numeric',
            'promotionPrice'=>'required|numeric',
            'description'=>'required',
            'quantity'=>'required|numeric',
            'id_type'=>'required|numeric',
        ]);

        $product = new Product();
        if($request->hasFile('image')){
            $destination_path = public_path('images');
            $image = $request->file('image');
            $imageName = $image->getClientOriginalName();
            $request->file('image')->move($destination_path, $imageName);
            if (file_exists("/images/".$product->image)) unlink("/images/".$product->image);
            $product->image = $imageName;
        }

        $product->name = $request->name;
        $product->price = $request->price;
        $product->promotionPrice = $request->promotionPrice;
        $product->description = $request->description;
        $product->quantity = $request->quantity;
        $product->id_type = $request->id_type;
        $product->updated_at = date_create();
        $product->save();

        return response()->json('Successfully added');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Product::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name'=>'required',
            'image'=>'required|image',
            'price'=>'required|numeric',
            'promotionPrice'=>'required|numeric',
            'description'=>'required',
            'quantity'=>'required|numeric',
            'id_type'=>'required|numeric',
        ]);

        $product = Product::find($id);
        if($request->hasFile('image')){
            $destination_path = public_path('images');
            $image = $request->file('image');
            $imageName = $image->getClientOriginalName();
            $request->file('image')->move($destination_path, $imageName);
            if (file_exists("/images/".$product->image)) unlink("/images/".$product->image);
            $product->image = $imageName;
        }

        $product->name = $request->name;
        $product->price = $request->price;
        $product->promotionPrice = $request->promotionPrice;
        $product->description = $request->description;
        $product->quantity = $request->quantity;
        $product->id_type = $request->id_type;
        $product->updated_at = date_create();
        $product->save();

        return $product;

    }

    public function destroy(Product $product)
    {
        try {

            if($product->image){
                $exists = Storage::disk('public')->exists("product/image/{$product->image}");
                if($exists){
                    Storage::disk('public')->delete("product/image/{$product->image}");
                }
            }

            $product->delete();

            return response()->json([
                'message'=>'Product Deleted Successfully!!'
            ]);
            
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a product!!'
            ]);
        }
    }
}