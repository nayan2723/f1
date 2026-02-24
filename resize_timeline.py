import os
import glob
from PIL import Image, ImageOps

dir_path = r'c:\Users\nayan\.gemini\antigravity\scratch\f1-insight-2026\site\public\assets\legacy\timeline'
w, h = 273, 185

files = glob.glob(os.path.join(dir_path, '*.*'))

for f in files:
    if not f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
        continue
    
    # 1994 is the reference size
    if '1994_imola' in f:
        continue

    print(f"Processing {f}...")
    try:
        img = Image.open(f).convert('RGB')
        
        # Center crop exactly to 273x185
        img_cropped = ImageOps.fit(img, (w, h), method=Image.Resampling.LANCZOS)
        
        # Output is strictly .webp
        out_path = f
        if f.endswith('.webp.png'):
            out_path = f.replace('.webp.png', '.webp')
        elif not f.endswith('.webp'):
            out_path = os.path.splitext(f)[0] + '.webp'
            
        img_cropped.save(out_path, 'WEBP', quality=90)
        
        if f != out_path:
            os.remove(f)
            print(f"Removed old {os.path.basename(f)}")
            
        print(f"Saved {os.path.basename(out_path)} at {w}x{h}")
    except Exception as e:
        print(f"Failed to process {f}: {e}")
