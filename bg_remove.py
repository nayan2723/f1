import os
import glob
from rembg import remove
from PIL import Image

def process_images(base_dir):
    print(f"Scanning directory: {base_dir}")
    
    # 1. Rivalry Portraits
    rivalries_path = os.path.join(base_dir, 'rivalries')
    print(f"Checking for rivalry portraits in {rivalries_path}")
    if os.path.exists(rivalries_path):
        for img_path in glob.glob(os.path.join(rivalries_path, 'portrait_*.png')):
             process_image(img_path)
             
    # 2. Legends Hall Portraits
    drivers_path = os.path.join(base_dir, 'drivers')
    print(f"Checking for driver portraits in {drivers_path}")
    if os.path.exists(drivers_path):
         for img_path in glob.glob(os.path.join(drivers_path, 'portrait_*.png')):
              process_image(img_path)

    # 3. Historic Cars
    cars_path = os.path.join(base_dir, 'cars')
    print(f"Checking for historic cars in {cars_path}")
    if os.path.exists(cars_path):
         for img_path in glob.glob(os.path.join(cars_path, 'car_*.webp')):
              process_image(img_path)

def process_image(img_path):
    print(f"Processing image: {img_path}")
    try:
        input_image = Image.open(img_path)
        output_image = remove(input_image)
        # Always output as png for best alpha support
        out_path = img_path.rsplit('.', 1)[0] + '.png'
        # save the image
        output_image.save(out_path)
        # replace the original file if it was a webp
        if not img_path.endswith('.png'):
             os.remove(img_path)
             print(f"Saved {out_path} and removed original {img_path}")
        else:
             print(f"Saved {out_path} (overwrite)")
    except Exception as e:
        print(f"Failed to process {img_path}: {e}")

if __name__ == "__main__":
    base_asset_dir = r"c:\Users\nayan\.gemini\antigravity\scratch\f1-insight-2026\site\public\assets\legacy"
    process_images(base_asset_dir)
