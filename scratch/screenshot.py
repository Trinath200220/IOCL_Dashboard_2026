from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1280, 'height': 800})
    page.goto('http://localhost:5173/assets')
    page.wait_for_timeout(2000)
    page.screenshot(path='/home/bflsys34/Desktop/IOCL_Dashboard_2026/scratch/assets_screenshot.png', full_page=True)
    browser.close()
print("Screenshot saved to scratch/assets_screenshot.png")
