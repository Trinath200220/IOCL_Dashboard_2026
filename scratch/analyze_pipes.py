import cv2
import numpy as np

img_path = '/home/bflsys34/Desktop/IOCL_Dashboard_2026/src/assets/process flow.png'
img = cv2.imread(img_path)
h, w = img.shape[:2]

hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

colors = {
    'flowBlue': ((100, 150, 150), (130, 255, 255)), # Main blue lines
    'flowCyan': ((80, 100, 150), (100, 255, 255)),  # Might be mixed with blue
    'flowGreen': ((40, 100, 100), (80, 255, 255)),
    'flowPink': ((140, 100, 150), (170, 255, 255)),
    'flowYellow': ((20, 100, 150), (35, 255, 255)),
    'flowBrown': ((0, 50, 50), (20, 200, 200))
}

react_code = []

for colorClass, (lower, upper) in colors.items():
    mask = cv2.inRange(hsv, np.array(lower), np.array(upper))
    
    # Exclude the legend at the bottom (bottom 15% of the image)
    mask[int(h*0.85):, :] = 0
    
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    react_code.append(f"{{/* {colorClass} */}}")
    for c in contours:
        x, y, cw, ch = cv2.boundingRect(c)
        
        # Only lines (aspect ratio > 3 or < 0.3)
        aspect_ratio = cw / float(ch)
        
        px = (x / w) * 100
        py = (y / h) * 100
        pw = (cw / w) * 100
        ph = (ch / h) * 100
        
        if aspect_ratio > 3 and pw > 2: # Horizontal line
            react_code.append(f'<LineH left={{{px:.1f}}} top={{{py+(ph/2):.1f}}} width={{{pw:.1f}}} colorClass="{colorClass}" />')
        elif aspect_ratio < 0.33 and ph > 2: # Vertical line
            react_code.append(f'<LineV left={{{px+(pw/2):.1f}}} top={{{py:.1f}}} height={{{ph:.1f}}} colorClass="{colorClass}" />')

with open('/home/bflsys34/Desktop/IOCL_Dashboard_2026/scratch/lines.txt', 'w') as f:
    f.write("\n".join(react_code))
print("Done writing to lines.txt")
