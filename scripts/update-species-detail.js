// This script provides instructions on how to update the species detail page
// to use the ImageWithFallback component

/*
1. Open app/species/[id]/page.tsx
2. Import the ImageWithFallback component at the top:
   ```
   import ImageWithFallback from '@/components/ui/ImageWithFallback';
   ```

3. Replace the hero image (around line 64):
   ```
   <div className="absolute inset-0 overflow-hidden">
     <ImageWithFallback
       src={species.image_url || ''}
       alt={species.name}
       altText={species.name}
       fill
       priority
       unoptimized
       className="object-cover brightness-[0.4]"
     />
   </div>
   ```

4. Replace the main species image (around line 92):
   ```
   <div className="h-80 relative">
     <ImageWithFallback
       src={species.image_url || ''}
       alt={species.name}
       altText={species.name}
       fill
       sizes="(max-width: 768px) 100vw, 33vw"
       className="object-cover"
       unoptimized
     />
   </div>
   ```

5. Replace the related species images (around line 184):
   ```
   <div className="h-40 relative">
     <ImageWithFallback
       src={related.image_url || ''}
       alt={related.name}
       altText={related.name}
       fill
       sizes="(max-width: 768px) 100vw, 33vw"
       className="object-cover"
       unoptimized
     />
   </div>
   ```
*/
