import requests
from bs4 import BeautifulSoup
import json
import csv
import time

BASE_URL = "https://www.myscheme.gov.in"


def fetch_page(url):
    response = requests.get(url)
    return BeautifulSoup(response.text, "html.parser") if response.status_code == 200 else None


def extract_categories():
    soup = fetch_page(BASE_URL)
    if not soup:
        print("Failed to load the base page.")
        return []

    categories = []
    for div in soup.find_all("div", class_="group cursor-pointer"):
        category_name_tag = div.find("p", class_="text-base md:text-lg leading-5")
        if category_name_tag:
            category_name = category_name_tag.get_text(strip=True)
            category_url = f"{BASE_URL}/search/category/{category_name.replace(' ', '%20')}"
            categories.append({"name": category_name, "url": category_url})

    return categories


def extract_schemes(category_url):
    soup = fetch_page(category_url)
    if not soup:
        print(f"Failed to load category page: {category_url}")
        return []

    schemes = []
    pagination = soup.select('ul li')
    total_pages = max([int(li.text) for li in pagination if li.text.isdigit()], default=1)

    for page in range(1, total_pages + 1):
        print(f"Scraping page {page} of category: {category_url}")
        page_soup = fetch_page(f"{category_url}?page={page}")
        if not page_soup:
            continue

        for scheme_box in page_soup.select(r'div.p-4.lg\:p-8.w-full'):  # Fixed with raw string
            scheme_link_tag = scheme_box.select_one('h2 a')
            if scheme_link_tag:
                scheme_name = scheme_link_tag.get_text(strip=True)
                scheme_url = BASE_URL + scheme_link_tag['href']
                schemes.append({"name": scheme_name, "url": scheme_url})

        time.sleep(1)  # Prevent rate-limiting

    return schemes


def extract_scheme_details(url):
    soup = fetch_page(url)
    if not soup:
        print(f"Failed to fetch scheme page: {url}")
        return None

    def get_text(selector, single=True):
        tag = soup.select_one(selector) if single else soup.select(selector)
        return tag.get_text(strip=True) if tag else None if single else [t.get_text(strip=True) for t in tag]

    scheme_data = {
        'scheme_name': get_text(r'h1.font-bold.text-xl.sm\:text-2xl'),  # Fixed with raw string
        'ministry_name': get_text(r'h3.text-raven.dark\:text-indigo-100.text-base.mt-2'),  # Fixed with raw string
        'tags': [tag.get_text(strip=True) for tag in soup.find_all('div', class_='border-green-700')],
        'details': get_text('#details'),
        'eligibility': get_text('#eligibility li', single=False),
        'exclusions': get_text('#exclusions li', single=False),
        'benefits': get_text('#benefits li', single=False),
        'application_process': get_text('#application-process li', single=False),
        'post_application_process': get_text('#post-application-process li', single=False),
        'documents_required': get_text('#documents-required li', single=False),
        "faqs": [{"question": q.get_text(strip=True), "answer": a.get_text(strip=True)} for q, a in
                 zip(soup.select('.faq-question'), soup.select('.faq-answer'))],
        "sources": [{"title": link.get_text(strip=True), "link": link['href']} for link in
                    soup.select('#sources a[href]')]
    }
    return scheme_data


def save_data(filename, data, file_format='json'):
    if file_format == 'json':
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    elif file_format == 'csv':
        with open(filename, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(data[0].keys())
            for row in data:
                writer.writerow(row.values())


if __name__ == "__main__":
    print("Scraping categories...")
    categories = extract_categories()
    save_data("categories.json", categories)
    print("✅ Categories scraped and saved!")

    all_schemes = []
    for category in categories:
        print(f"Scraping schemes for {category['name']}...")
        schemes = extract_schemes(category['url'])
        all_schemes.extend(schemes)
    save_data("scheme_links.json", all_schemes)
    print("✅ All schemes scraped and saved!")

    detailed_schemes = []
    for scheme in all_schemes:
        print(f"Fetching details for {scheme['name']}...")
        details = extract_scheme_details(scheme['url'])
        if details:
            detailed_schemes.append(details)

    categories = extract_categories()
    print("Extracted Categories:", categories)  # Debugging print
    save_data("categories.json", categories)
    save_data("categories.csv", categories, "csv")

    save_data("scheme_details.json", detailed_schemes)
    print("✅ Scheme details scraped and saved!")
