import time
import json
import csv
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

# Set up Selenium WebDriver
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run in headless mode
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

# 1. Visiting MyScheme Homepage
BASE_URL = "https://www.myscheme.gov.in/"
driver.get(BASE_URL)

# Wait for JavaScript to load
time.sleep(5)

# Find all category elements
category_divs = driver.find_elements(By.CLASS_NAME, "group.cursor-pointer")

categories = []

for div in category_divs:
    try:
        # Extract category name
        category_name = div.find_element(By.CSS_SELECTOR, "p.text-base").text.strip()

        # Extract number of schemes
        scheme_count = div.find_element(By.CSS_SELECTOR, "p.text-sm").text.strip()

        # Construct category URL
        category_url = f"https://www.myscheme.gov.in/search/category/{category_name.replace(' ', '%20')}"

        categories.append({
            "name": category_name,
            "schemes": scheme_count,
            "url": category_url
        })
    except Exception as e:
        print(f"Error extracting data: {e}")

# Save data to JSON
with open("categories.json", "w", encoding="utf-8") as f:
    json.dump(categories, f, indent=2, ensure_ascii=False)

# Save data to CSV
with open("categories.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["Category Name", "Number of Schemes", "Category URL"])  # Headers
    for cat in categories:
        writer.writerow([cat["name"], cat["schemes"], cat["url"]])

# Print results
print("✅ Categories scraped and saved successfully!")
for cat in categories:
    print(cat)




# Part 2

def get_total_pages():
    """Extracts the total number of pages in the category pagination."""
    try:
        pagination_buttons = driver.find_elements(By.CSS_SELECTOR, "ul.pagination li")
        page_numbers = [int(btn.text) for btn in pagination_buttons if btn.text.isdigit()]
        return max(page_numbers) if page_numbers else 1
    except Exception:
        return 1  # Default to 1 if pagination is missing

def get_schemes_from_page():
    """Extracts scheme names and links from the current category page."""
    schemes = []
    scheme_boxes = driver.find_elements(By.CSS_SELECTOR, "div.p-4.lg\\:p-8.w-full")  # Adjusted selector

    for box in scheme_boxes:
        try:
            scheme_link = box.find_element(By.CSS_SELECTOR, "h2 a")
            scheme_name = scheme_link.text.strip()
            scheme_url = scheme_link.get_attribute("href")
            schemes.append({"name": scheme_name, "url": scheme_url})
        except Exception as e:
            print(f"⚠ Error extracting scheme: {e}")

    return schemes

def scrape_all_schemes(category_url):
    """Scrapes all scheme links from a category page."""
    driver.get(category_url)
    time.sleep(3)  # Wait for page to load

    total_pages = get_total_pages()
    print(f"📄 Total pages found: {total_pages}")

    all_schemes = []
    for page in range(1, total_pages + 1):
        print(f"🔄 Scraping page {page}...")

        # Load each page
        driver.get(f"{category_url}?page={page}")
        time.sleep(2)

        schemes = get_schemes_from_page()
        all_schemes.extend(schemes)

    return all_schemes

all_scheme_data = []

# Loop through each category URL
for category in categories:  # Assuming `categories` is already populated
    print(f"🔍 Scraping schemes from category: {category['name']}")

    # Get all schemes in the category
    schemes = scrape_all_schemes(category["url"])
    all_scheme_data.extend(schemes)

    # Optional: Save periodically
    with open("scheme_links.json", "w", encoding="utf-8") as f:
        json.dump(all_scheme_data, f, indent=4, ensure_ascii=False)

print("✅ All categories scraped! Data saved in scheme_links.json")