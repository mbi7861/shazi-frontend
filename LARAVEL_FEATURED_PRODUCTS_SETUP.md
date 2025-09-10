# Laravel Featured Products Setup

This document explains how to set up the featured products system in your Laravel backend to work with the Next.js frontend.

## Overview

The Next.js frontend now calls your Laravel backend API to fetch featured products. You need to add a featured products endpoint to your Laravel backend.

## Required Laravel Route

Add this route to your Laravel `routes/api.php` file:

```php
// Featured products route
Route::get('/products/featured', [ProductController::class, 'featuredProducts']);
```

## Required Laravel Controller Method

Add this method to your `ProductController`:

```php
public function featuredProducts()
{
    try {
        // Fetch 5 featured products from your database
        $featuredProducts = Product::where('featured', true)
            ->limit(5)
            ->orderBy('created_at', 'desc')
            ->get();
        
        // Transform the data to match frontend expectations
        $transformedProducts = $featuredProducts->map(function ($product) {
            return [
                'id' => $product->id,
                'title' => $product->name,
                'description' => $product->description,
                'offer' => $product->offer_price < $product->price 
                    ? round((($product->price - $product->offer_price) / $product->price) * 100) . '% Off'
                    : 'Special Offer',
                'buttonText1' => 'Buy now',
                'buttonText2' => 'View details',
                'prices' => [
                    [
                        'price' => $product->price,
                        'discounted_price' => $product->offer_price
                    ]
                ],
                'primary_image' => $product->image[0] ?? null,
                'images' => collect($product->image)->map(function ($img, $index) {
                    return [
                        'uuid' => $img,
                        'index' => $index
                    ];
                })->toArray()
            ];
        });
        
        return response()->json([
            'success' => true,
            'products' => $transformedProducts
        ]);
        
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to fetch featured products',
            'error' => $e->getMessage()
        ], 500);
    }
}
```

## Database Schema Update

You need to add a `featured` field to your products table. Create a migration:

```bash
php artisan make:migration add_featured_to_products_table
```

In the migration file:

```php
public function up()
{
    Schema::table('products', function (Blueprint $table) {
        $table->boolean('featured')->default(false)->after('category');
    });
}

public function down()
{
    Schema::table('products', function (Blueprint $table) {
        $table->dropColumn('featured');
    });
}
```

Run the migration:

```bash
php artisan migrate
```

## Setting Products as Featured

### Option 1: Database Seeder

Create a seeder to set some products as featured:

```bash
php artisan make:seeder FeaturedProductsSeeder
```

```php
public function run()
{
    // Set first 5 products as featured
    Product::take(5)->update(['featured' => true]);
    
    // Or set specific products by ID
    Product::whereIn('id', [1, 2, 3, 4, 5])->update(['featured' => true]);
}
```

Run the seeder:

```bash
php artisan db:seed --class=FeaturedProductsSeeder
```

### Option 2: Tinker

Use Laravel Tinker to set products as featured:

```bash
php artisan tinker
```

```php
// Set first 5 products as featured
Product::take(5)->update(['featured' => true]);

// Set specific product as featured
Product::find(1)->update(['featured' => true]);

// Check featured products
Product::where('featured', true)->get();
```

### Option 3: Admin Panel

Add a featured toggle in your admin panel:

```php
// In your admin product edit form
<div class="form-group">
    <label>
        <input type="checkbox" name="featured" value="1" 
               {{ $product->featured ? 'checked' : '' }}>
        Featured Product
    </label>
</div>

// In your controller
public function update(Request $request, Product $product)
{
    $product->update([
        'featured' => $request->has('featured'),
        // ... other fields
    ]);
}
```

## Expected Response Format

Your Laravel API should return data in this format:

```json
{
  "success": true,
  "products": [
    {
      "id": 1,
      "title": "Product Name",
      "description": "Product Description",
      "offer": "30% Off",
      "buttonText1": "Buy now",
      "buttonText2": "View details",
      "prices": [
        {
          "price": 299.99,
          "discounted_price": 209.99
        }
      ],
      "primary_image": "image_url",
      "images": [
        {
          "uuid": "image_uuid",
          "index": 0
        }
      ]
    }
  ]
}
```

## Testing

1. **Test the Laravel endpoint directly:**
   ```bash
   curl http://localhost/infinite-cart/public/api/products/featured
   ```

2. **Check the Next.js frontend:**
   - Visit your homepage
   - Check browser console for any errors
   - Verify featured products are displaying

## Troubleshooting

### No Featured Products Displaying

1. **Check Laravel endpoint:**
   - Verify `/api/products/featured` returns data
   - Check Laravel logs for errors

2. **Check database:**
   - Ensure products have `featured = true`
   - Verify products have valid image data

3. **Check frontend:**
   - Browser console for API errors
   - Network tab for failed requests

### API Errors

1. **CORS issues:**
   - Ensure Laravel allows requests from your Next.js domain
   - Check `config/cors.php` configuration

2. **Authentication:**
   - If the endpoint requires auth, ensure proper token handling
   - Check if the endpoint is public or protected

## Performance Considerations

1. **Database indexing:**
   ```php
   // Add index for featured products
   $table->index('featured');
   ```

2. **Caching:**
   ```php
   // Cache featured products
   $featuredProducts = Cache::remember('featured_products', 3600, function () {
       return Product::where('featured', true)
           ->limit(5)
           ->orderBy('created_at', 'desc')
           ->get();
   });
   ```

3. **Eager loading:**
   ```php
   // If you have relationships, eager load them
   $featuredProducts = Product::with(['images', 'prices'])
       ->where('featured', true)
       ->limit(5)
       ->orderBy('created_at', 'desc')
       ->get();
   ```

## Integration with Existing Code

The featured products system integrates seamlessly with your existing Laravel backend:

- Uses your existing Product model
- Follows your existing API response patterns
- Maintains consistency with other endpoints
- Easy to extend with additional features

This setup ensures your Next.js frontend can display dynamic featured products from your Laravel backend while maintaining good performance and user experience.

