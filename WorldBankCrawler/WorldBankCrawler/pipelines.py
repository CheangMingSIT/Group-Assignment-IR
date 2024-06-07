# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import csv
import hashlib
from scrapy.exceptions import DropItem

class WorldbankcrawlerPipeline:
    def open_spider(self, spider):
        self.file = open('output/worldbank_data.csv', 'w', newline='', encoding='utf-8')
        self.exporter = csv.writer(self.file)
        self.exporter.writerow(['title', 'description', 'source_url', 'destination_url', 'content'])  # Add 'source_url' and 'hit_url' to the header
        self.seen_hashes = set()

    def close_spider(self, spider):
        self.file.close()

    def process_item(self, item, spider):
        # Filter out URLs that appear to be images
        if self.is_image_url(item['destination_url']):
            raise DropItem(f"Image URL found and dropped: {item['destination_url']}")

        # Compute the MD5 hash of the URL
        url_hash = hashlib.md5(item['destination_url'].encode('utf-8')).hexdigest()

        # Check if the hash is already seen
        if url_hash in self.seen_hashes:
            raise DropItem(f"Duplicate item found: {item['destination_url']}")
        else:
            self.seen_hashes.add(url_hash)

        # Write the item to the CSV file, including the URLs
        self.exporter.writerow([item['title'], item['description'], item['source_url'], item['destination_url'], item['content']])
        return item

    def is_image_url(self, url):
        image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp']
        return any(url.lower().endswith(ext) for ext in image_extensions)
