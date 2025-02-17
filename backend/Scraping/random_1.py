"""import requests

BASE_URL = "https://www.myscheme.gov.in/"
response = requests.get(BASE_URL)

with open("page_source.html", "w", encoding="utf-8") as f:
    f.write(response.text)

print("✅ Page source saved! Open 'page_source.html' to inspect.")
"""

import requests
from bs4 import BeautifulSoup

BASE_URL = "https://www.myscheme.gov.in/"
response = requests.get(BASE_URL)
soup = BeautifulSoup(response.text, "html.parser")

category_divs = soup.find_all("div", class_="group cursor-pointer")
print(f"🔍 Found {len(category_divs)} category divs")

for idx, div in enumerate(category_divs):
    print(f"\n🔹 Category {idx + 1}:")
    print(div.prettify())  # Print full structure
