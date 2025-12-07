
from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get the absolute path to the file
        cwd = os.getcwd()
        file_path = f"file://{cwd}/bio/index.html"

        print(f"Navigating to {file_path}")
        page.goto(file_path)

        # Take a screenshot
        page.screenshot(path="verification/bio_page.png", full_page=True)
        print("Screenshot saved to verification/bio_page.png")

        browser.close()

if __name__ == "__main__":
    run()
