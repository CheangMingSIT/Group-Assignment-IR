# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class WorldbankcrawlerItem(scrapy.Item):
    title = scrapy.Field()
    description = scrapy.Field()
    source_url = scrapy.Field()
    destination_url = scrapy.Field()
    content = scrapy.Field()
