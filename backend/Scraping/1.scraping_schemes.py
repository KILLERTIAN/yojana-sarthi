import requests
from bs4 import BeautifulSoup
import json
import csv


# 1. Visiting each category in myscheme

# Base URL of the website
BASE_URL = "https://www.myscheme.gov.in/"

# Fetch the homepage
response = requests.get(BASE_URL)
soup = BeautifulSoup(response.text, "html.parser")

# Find all category divs
category_divs = soup.find_all("div", class_="group cursor-pointer")

categories = []

for div in category_divs:
    # Extract category name
    category_name_tag = div.find("p", class_="text-base md:text-lg leading-5")
    category_name = category_name_tag.get_text(strip=True) if category_name_tag else "Unknown"

    # Extract number of schemes
    scheme_count_tag = div.find("p", class_="text-sm md:text-base text-green-800")
    scheme_count = scheme_count_tag.get_text(strip=True) if scheme_count_tag else "Unknown"

    # Construct category URL
    category_url = f"https://www.myscheme.gov.in/search/category/{category_name.replace(' ', '%20')}"

    categories.append({
        "name": category_name,
        "schemes": scheme_count,
        "url": category_url
    })

# Save data to a JSON file
with open("categories.json", "w", encoding="utf-8") as f:
    json.dump(categories, f, indent=2, ensure_ascii=False)

# Save data to a CSV file
with open("categories.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["Category Name", "Number of Schemes", "Category URL"])  # Headers
    for cat in categories:
        writer.writerow([cat["name"], cat["schemes"], cat["url"]])

# Print extracted categories
print("✅ Categories scraped and saved successfully!")
for cat in categories:
    print(cat)


# 2. Scraping all scheme names and links

import requests
from bs4 import BeautifulSoup
import time
import json

BASE_URL = "https://www.myscheme.gov.in"
CATEGORY_URL = "https://www.myscheme.gov.in/search/category/Agriculture,Rural%20&%20Environment"


def get_schemes_from_page(page_url):
    response = requests.get(page_url)
    if response.status_code != 200:
        print(f"Failed to fetch {page_url}")
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    schemes = []

    # Find all scheme boxes
    for scheme_box in soup.select('div.p-4.lg\:p-8.w-full'):  # Adjusted selector
        scheme_link_tag = scheme_box.select_one('h2 a')
        if scheme_link_tag:
            scheme_name = scheme_link_tag.get_text(strip=True)
            scheme_url = BASE_URL + scheme_link_tag['href']
            schemes.append({"name": scheme_name, "url": scheme_url})

    return schemes


def get_total_pages(soup):
    """Extracts the total number of pages from the pagination section."""
    pagination = soup.select('ul li')
    page_numbers = [int(li.text) for li in pagination if li.text.isdigit()]
    return max(page_numbers) if page_numbers else 1


def scrape_all_schemes(category_url):
    response = requests.get(category_url)
    if response.status_code != 200:
        print("Failed to load category page.")
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    total_pages = get_total_pages(soup)

    print(f"Total pages found: {total_pages}")

    all_schemes = []
    for page in range(1, total_pages + 1):
        print(f"Scraping page {page}...")
        page_url = f"{category_url}?page={page}"
        schemes = get_schemes_from_page(page_url)
        all_schemes.extend(schemes)
        time.sleep(1)  # Prevent rate-limiting

    return all_schemes


if __name__ == "__main__":
    scheme_data = scrape_all_schemes(CATEGORY_URL)

    # Store the data in JSON
    with open("scheme_links.json", "w", encoding="utf-8") as f:
        json.dump(scheme_data, f, indent=4, ensure_ascii=False)

    print("✅ Scraping complete! Data saved in scheme_links.json")



# 3 . Scrape all details

from bs4 import BeautifulSoup


def extract_scheme_details(html):
    response = requests.get(url)
    if response.status_code != 200:
        print("Failed to fetch page")
        return []

    soup = BeautifulSoup(html, 'html.parser')

    # Extract Scheme Name
    scheme_name_tag = soup.find('h1', class_='font-bold text-xl sm:text-2xl')
    scheme_name = scheme_name_tag.text.strip() if scheme_name_tag else None

    # Extract Ministry Name
    ministry_tag = soup.find('h3', class_='text-raven dark:text-indigo-100 text-base mt-2')
    ministry_name = ministry_tag.text.strip() if ministry_tag else None

    # Extract Tags
    tags = [tag['title'] for tag in soup.find_all('div', class_='border-green-700')]

    # Extract Details
    details_tag = soup.find('div', {'id': 'details'})
    details = details_tag.get_text(strip=True) if details_tag else None

    # Extract Eligibility
    eligibility_tag = soup.find('div', {'id': 'eligibility'})
    eligibility = []
    if eligibility_tag:
        eligibility_list = eligibility_tag.find_all('li')
        eligibility = [item.get_text(strip=True) for item in eligibility_list]

        # Extract components eligible for subsidy
        components_tag = eligibility_tag.find('blockquote')
        if components_tag:
            eligibility.append(components_tag.get_text(strip=True))

        # Extract subsidy details
        subsidy_details = eligibility_tag.find_all('div', class_='mb-2')
        for detail in subsidy_details:
            eligibility.append(detail.get_text(strip=True))

    # Extract Exclusions
    exclusions_tag = soup.find('div', {'id': 'exclusions'})
    exclusions = []
    if exclusions_tag:
        exclusions_list = exclusions_tag.find_all('li')
        exclusions = [item.get_text(strip=True) for item in exclusions_list]

    # Extract Benefits
    benefits_tag = soup.find('div', {'id': 'benefits'})
    benefits = []
    if benefits_tag:
        benefits_list = benefits_tag.find_all('li')
        benefits = [item.get_text(strip=True) for item in benefits_list]

        # Extract disbursement details
        disbursement_tag = benefits_tag.find('blockquote')
        if disbursement_tag:
            benefits.append(disbursement_tag.get_text(strip=True))

        disbursement_details = benefits_tag.find_all('div', class_='mb-2')
        for detail in disbursement_details:
            benefits.append(detail.get_text(strip=True))

    # Extract Application Process
    application_process_tag = soup.find('div', {'id': 'application-process'})
    application_process = []
    if application_process_tag:
        application_process_list = application_process_tag.find_all('li')
        application_process = [item.get_text(strip=True) for item in application_process_list]

    # Extract Post Application Process
    post_application_process_tag = soup.find('div', {'id': 'post-application-process'})
    post_application_process = []
    if post_application_process_tag:
        post_application_process_list = post_application_process_tag.find_all('li')
        post_application_process = [item.get_text(strip=True) for item in post_application_process_list]

    # Extract Documents Required
    documents_required_tag = soup.find('div', {'id': 'documents-required'})
    documents_required = []
    if documents_required_tag:
        documents_required_list = documents_required_tag.find_all('li')
        documents_required = [item.get_text(strip=True) for item in documents_required_list]

    # Find FAQ section (modify selector as per actual page structure)
    faq_section = soup.find("div", class_="faq-section")  # Update class name if needed
    if not faq_section:
        print("No FAQ section found.")
        return None

    faqs = []

    # Extracting all questions and answers
    for faq_item in faq_section.find_all("div", class_="faq-item"):  # Update class names if needed
        question = faq_item.find("div", class_="faq-question").get_text(strip=True)
        answer = faq_item.find("div", class_="faq-answer").get_text(strip=True)
        faqs.append({"question": question, "answer": answer})

    # Find Sources and References section by ID
    sources_section = soup.find("div", id="sources")
    if not sources_section:
        print("No Sources and References section found.")
        return None

    sources = []

    # Extract all reference links
    for source_item in sources_section.find_all("a", href=True):
        title = source_item.get_text(strip=True)
        link = source_item["href"]
        sources.append({"title": title, "link": link})

    scheme_data = {
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
        "source and reference": sources
    }

    return scheme_data


# Example usage
html = """<paste your HTML snippet here>"""
scheme_info = extract_scheme_details(html)
print(scheme_info)

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