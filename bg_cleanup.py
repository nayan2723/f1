import os
import glob
from rembg import remove
from PIL import Image
import io

LIMITS = {
    'logos': 100 * 1024,
    'Car models': 250 * 1024,
    'hero': 300 * 1024,
    'cars': 250 * 1024,
    'drivers': 150 * 1024,
    'rivalries': 150 * 1024
}

def compress_image(img, target_size, is_transparent=True):
    # Convert RGBA to RGB if transparency isn't needed or present to save space
    format_out = "PNG" if is_transparent else "WEBP"
    if not is_transparent and img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
        # We only really care about alpha for logos, car models, portraits, historic cars
        pass
        
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format="PNG", optimize=True)
    
    if len(img_byte_arr.getvalue()) <= target_size:
        return img_byte_arr.getvalue()
    
    factor = 0.95
    while factor > 0.2:
        new_size = (int(img.width * factor), int(img.height * factor))
        resized = img.resize(new_size, Image.Resampling.LANCZOS)
        img_byte_arr = io.BytesIO()
        resized.save(img_byte_arr, format="PNG", optimize=True)
        if len(img_byte_arr.getvalue()) <= target_size:
            return img_byte_arr.getvalue()
        factor -= 0.05
        
    return img_byte_arr.getvalue()

def process_file(filepath, target_size, remove_bg=False):
    original_size = os.path.getsize(filepath)
    ext = filepath.split('.')[-1].lower()
    
    try:
        input_image = Image.open(filepath).convert("RGBA")
        
        if remove_bg:
            output_image = remove(input_image)
        else:
            output_image = input_image
            
        # Write bytes payload directly to the file to maintain exact filename requests
        compressed_bytes = compress_image(output_image, target_size, is_transparent=True)
        
        with open(filepath, 'wb') as f:
            f.write(compressed_bytes)
            
        new_size = len(compressed_bytes)
        print(f"Processed: {os.path.basename(filepath)} | BG Removed: {remove_bg} | {original_size/1024:.1f}KB -> {new_size/1024:.1f}KB")
            
    except Exception as e:
        print(f"Failed to process {os.path.basename(filepath)}: {e}")

if __name__ == "__main__":
    base_dir = r"c:\Users\nayan\.gemini\antigravity\scratch\f1-insight-2026\site\public\assets\legacy"
    
    for category, limit in LIMITS.items():
        dir_path = os.path.join(base_dir, category)
        if not os.path.exists(dir_path): 
            continue
        
        print(f"\n--- {category.upper()} (Target: {limit//1024}KB) ---")
        should_remove_bg = category in ['logos', 'Car models']
        
        for f in glob.glob(os.path.join(dir_path, '*.*')):
            if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp', '.svg')):
                # skip SVG compression since it's vector
                if f.lower().endswith('.svg'):
                    continue
                process_file(f, limit, remove_bg=should_remove_bg)
