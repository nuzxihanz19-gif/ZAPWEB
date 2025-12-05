from playwright.sync_api import sync_playwright, expect
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        # Load local file
        file_path = os.path.abspath("index.html")
        page.goto(f"file://{file_path}")

        # 1. Verify Title
        expect(page).to_have_title("Ziyad Template Studio - Katalog Template Website")
        print("Title verified")

        # 2. Screenshot Top (Hero)
        page.screenshot(path="verification/1_hero.png")
        print("Hero screenshot taken")

        # 3. Open Lightbox
        # Find the first card image wrapper and click it
        first_card = page.locator(".card-image-wrapper").first
        first_card.click()

        # Wait for modal to be visible
        modal = page.locator("#imageModal")
        expect(modal).to_be_visible()

        # 4. Screenshot Modal
        page.screenshot(path="verification/2_modal.png")
        print("Modal screenshot taken")

        # 5. Close Modal
        close_btn = page.locator(".close")
        close_btn.click()
        expect(modal).not_to_be_visible()
        print("Modal closed")

        # 6. Scroll to FAQ and Footer
        page.locator("#faq").scroll_into_view_if_needed()
        page.screenshot(path="verification/3_faq.png")

        browser.close()

if __name__ == "__main__":
    run()
