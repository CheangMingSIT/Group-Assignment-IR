# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import hashlib
from scrapy.exceptions import DropItem
from scrapy.exporters import CsvItemExporter

class WorldbankcrawlerPipeline:
    def open_spider(self, spider):
        self.file = open('output/worldbank_data.csv', 'wb')  # Open in binary mode
        self.exporter = CsvItemExporter(self.file, include_headers_line=True)
        self.exporter.fields_to_export = ['title', 'description', 'source_url', 'destination_url', 'content']
        self.exporter.start_exporting()
        self.seen_hashes = set()

    def close_spider(self, spider):
        self.exporter.finish_exporting()
        self.file.close()

    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        
        # Filter out URLs that appear to be images
        if self.is_image_url(adapter['destination_url']):
            raise DropItem(f"Image URL found and dropped: {adapter['destination_url']}")

        # Compute the MD5 hash of the URL
        url_hash = hashlib.md5(adapter['destination_url'].encode('utf-8')).hexdigest()

        # Check if the hash is already seen
        if url_hash in self.seen_hashes:
            raise DropItem(f"Duplicate item found: {adapter['destination_url']}")
        else:
            self.seen_hashes.add(url_hash)

        # Export the item using CsvItemExporter
        self.exporter.export_item(item)
        return item

    def is_image_url(self, url):
        image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp']
        return any(url.lower().endswith(ext) for ext in image_extensions)

