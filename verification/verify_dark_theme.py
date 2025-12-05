from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1280, 'height': 800})

        # Load the file
        filepath = os.path.abspath("index.html")
        page.goto(f"file://{filepath}")

        # 1. Full Page Screenshot
        page.screenshot(path="verification/full_page.png", full_page=True)
        print("Full page screenshot taken.")

        # 2. Hero Section Screenshot (Check stats and title)
        hero = page.locator("#home")
        hero.screenshot(path="verification/hero_section.png")
        print("Hero section screenshot taken.")

        # 3. Catalog Section Screenshot (Check cards and dark theme)
        catalog = page.locator("#katalog")
        catalog.screenshot(path="verification/catalog_section.png")
        print("Catalog section screenshot taken.")

        # 4. FAQ Interaction
        # Scroll to FAQ
        faq_section = page.locator("#faq")
        faq_section.scroll_into_view_if_needed()

        # Screenshot collapsed
        faq_section.screenshot(path="verification/faq_collapsed.png")
        print("FAQ collapsed screenshot taken.")

        # Click second question to expand (First might be open by default if active class is there, let's check)
        # In my code: <div class="faq-item active"> for the first one.
        # So first is open. Let's click the second one.
        second_question = page.locator(".faq-question").nth(1)
        second_question.click()

        # Wait for animation (css transition is 0.4s)
        page.wait_for_timeout(600)

        # Screenshot expanded
        faq_section.screenshot(path="verification/faq_expanded.png")
        print("FAQ expanded screenshot taken.")

        browser.close()

if __name__ == "__main__":
    run()
