import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from WorldBankCrawler.items import WorldbankcrawlerItem
from scrapy.spiders import SitemapSpider

class WorldbankSpider(CrawlSpider):
    name = "WorldBank"
    allowed_domains = ["data.worldbank.org"]
    start_urls = ["https://data.worldbank.org"]

    rules = (
        Rule(LinkExtractor(allow=()), callback='parse_item', follow=True),
    )

    def parse_item(self, response):
        item = WorldbankcrawlerItem()
        item['title'] = response.css('title::text').extract_first()
        item['description'] = response.xpath("/html/head/meta[@name='description']/@content").extract_first()
        item['url'] = response.url
        yield item
