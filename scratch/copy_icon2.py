import shutil
import os

src = '/home/bflsys34/.gemini/antigravity/brain/e1898d5b-f227-4eca-9bcf-69e9e873f3a9/.tempmediaStorage/media_e1898d5b-f227-4eca-9bcf-69e9e873f3a9_1790834202036.png'
dst = './src/assets/pump-icon.png'

print("cwd:", os.getcwd())
shutil.copy(src, dst)
print("Copied icon to", dst)
