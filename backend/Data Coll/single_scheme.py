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
        print(f"✅ Category URL: {category_url}")  # Debugging output

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
    """Extracts the total number of pages correctly from pagination."""
    time.sleep(3)  # Allow content to load
    try:
        pagination_buttons = driver.find_elements(By.CSS_SELECTOR, "ul.list-none li")  # Updated selector
        print(f"📌 Found {len(pagination_buttons)} pagination elements")  # Debugging output

        page_numbers = []
        for btn in pagination_buttons:
            text = btn.text.strip()
            if text.isdigit():  # Only consider numeric values
                page_numbers.append(int(text))

        total_pages = max(page_numbers) if page_numbers else 1
        print(f"✅ Total Pages Detected: {total_pages}")
        return total_pages
    except Exception as e:
        print(f"⚠ Error detecting pagination: {e}")
        return 1


def get_schemes_from_page():
    """Extracts scheme names and links from the current category page."""
    schemes = []
    scheme_boxes = driver.find_elements(By.CSS_SELECTOR, "div.p-4.lg\\:p-8.w-full")  # Fixed selector

    print(f"🔍 Found {len(scheme_boxes)} schemes on this page")

    for box in scheme_boxes:
        try:
            scheme_link = box.find_element(By.CSS_SELECTOR, "h2 a")
            scheme_name = scheme_link.text.strip()
            scheme_url = scheme_link.get_attribute("href")
            print(f"✅ Extracted: {scheme_name} → {scheme_url}")  # Debugging output
            schemes.append({"name": scheme_name, "url": scheme_url})
        except Exception as e:
            print(f"⚠ Error extracting scheme: {e}")

    return schemes


def scrape_single_scheme_details(scheme_link):
    """Visits a single scheme link and extracts detailed scheme data."""
    driver.get(scheme_link)
    time.sleep(3)  # Allow page to load

    try:
        # Extract Scheme Name
        scheme_name = driver.find_element(By.CSS_SELECTOR, "h1.font-bold.text-xl").text.strip()

        # Extract Ministry Name
        ministry_name = driver.find_element(By.CSS_SELECTOR, "h3.text-raven").text.strip()

        # Extract Tags
        tags = [tag.get_attribute("title") for tag in driver.find_elements(By.CSS_SELECTOR, "div.border-green-700")]

        # Extract Details
        details = driver.find_element(By.ID, "details").text.strip()

        # Extract Eligibility
        eligibility = [el.text.strip() for el in driver.find_elements(By.CSS_SELECTOR, "#eligibility li")]

        # Extract Exclusions
        exclusions = [el.text.strip() for el in driver.find_elements(By.CSS_SELECTOR, "#exclusions li")]

        # Extract Benefits
        benefits = [el.text.strip() for el in driver.find_elements(By.CSS_SELECTOR, "#benefits li")]

        # Extract Application Process
        application_process = [el.text.strip() for el in
                               driver.find_elements(By.CSS_SELECTOR, "#application-process li")]

        # Extract Post Application Process
        post_application_process = [el.text.strip() for el in
                                    driver.find_elements(By.CSS_SELECTOR, "#post-application-process li")]

        # Extract Documents Required
        documents_required = [el.text.strip() for el in driver.find_elements(By.CSS_SELECTOR, "#documents-required li")]

        # Extract FAQs
        faqs = []
        for faq in driver.find_elements(By.CSS_SELECTOR, "div.faq-item"):
            question = faq.find_element(By.CSS_SELECTOR, "div.faq-question").text.strip()
            answer = faq.find_element(By.CSS_SELECTOR, "div.faq-answer").text.strip()
            faqs.append({"question": question, "answer": answer})

        # Extract Sources and References
        sources = []
        for source in driver.find_elements(By.CSS_SELECTOR, "div#sources a"):
            sources.append({"title": source.text.strip(), "link": source.get_attribute("href")})

        return {
            'scheme_name': scheme_name,
            'ministry_name': ministry_name,
            'tags': tags,
            'details': details,
            'eligibility': eligibility,
            'exclusions': exclusions,
            'benefits': benefits,
            'application_process': application_process,
            'post_application_process': post_application_process,
            'documents_required': documents_required,
            "faqs": faqs,
            "sources": sources
        }

    except Exception as e:
        print(f"⚠ Error extracting details for {scheme_link}: {e}")
        return None


# Get category URL (Example: First category URL)
category_url = categories[0]["url"]
print(f"Testing with category URL: {category_url}")

driver.get(category_url)
time.sleep(5)  # Wait for the page to load

# Get schemes from the first category page
schemes = get_schemes_from_page()

# Now, let's scrape the details of the first scheme
if schemes:
    scheme_url = schemes[0]["url"]
    print(f"Extracting details for the scheme: {scheme_url}")
    scheme_details = scrape_single_scheme_details(scheme_url)

    # Print the details (or save to a file)
    if scheme_details:
        print(json.dumps(scheme_details, indent=4, ensure_ascii=False))

# Close the driver
driver.quit()